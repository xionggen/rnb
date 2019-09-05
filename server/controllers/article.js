const Joi = require('joi');
const { Op } = require('sequelize');
const ArticleSchema = require('../schemas/article');
const {responser} = require('../lib/responser');

const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    reply: ReplyModel,
    user: UserModel,
    sequelize
} = require('../models')

const { checkAuth } = require('../lib/token')

module.exports = {
    // 创建文章
    async create(ctx) {
        const isAuth = checkAuth(ctx);
        if (isAuth) {
            const { title, content, categories, tags } = ctx.request.body;
            const validator = Joi.validate(ctx.request.body, ArticleSchema.create);
            if (validator.error) {
                responser(ctx, 400, validator.error.message, null);
            } else {
                const tagList = tags.map(t => ({ name: t }));
                const categoryList = categories.map(c => ({ name: c }));
                const data = await ArticleModel.create(
                    { title, content, tags: tagList, categories: categoryList },
                    { include: [TagModel, CategoryModel] }
                )
                responser(ctx, 200, '成功创建文章', data);
            }
        }
    },

    // 修改文章
    async update(ctx) {
        const isAuth = checkAuth(ctx);
        if (isAuth) {
            const { articleId, title, content, categories, tags, showOrder } = ctx.request.body;

            if (showOrder !== undefined) {
                // 文章设置置顶
                await ArticleModel.update({ showOrder }, { where: { id: articleId } });
                responser(ctx, 200, '文章置顶设置成功', null);
            } else {
                const validator = Joi.validate(ctx.request.body, ArticleSchema.update);
                if (validator.error) {
                    responser(ctx, 400, validator.error.message, null);
                } else {
                    const tagList = tags.map(tag => ({ name: tag, articleId }));
                    const categoryList = categories.map(cate => ({ name: cate, articleId }));
                    await ArticleModel.update({ title, content }, { where: { id: articleId } });
                    await TagModel.destroy({ where: { articleId } });
                    await TagModel.bulkCreate(tagList);
                    await CategoryModel.destroy({ where: { articleId } });
                    await CategoryModel.bulkCreate(categoryList);
                    responser(ctx, 200, '文章修改成功', null);
                }
            }
        }
    },

    // 获取文章详情
    async getArticleById(ctx) {
        const id = ctx.params.id;
        const data = await ArticleModel.findOne({
            where: { id },
            include: [
                { model: TagModel, attributes: ['name'] },
                { model: CategoryModel, attributes: ['name'] },
                {
                    model: CommentModel,
                    attributes: ['id', 'userId', 'content', 'createdAt'],
                    include: [
                        {
                            model: ReplyModel,
                            attributes: ['id', 'userId', 'content', 'createdAt'],
                            include: [{ model: UserModel, as: 'user', attributes: ['username'] }]
                        },
                        { model: UserModel, as: 'user', attributes: ['username'] }
                    ]
                }
            ],
            order: [[CommentModel, 'createdAt', 'DESC']],
            row: true
        })

        responser(ctx, 200, '查询文章详情成功', data);
    },

    /**
     * 查询文章列表
     *
     * @param {Number} offset - 当前页码 默认1
     * @param {Number} limit - 限制查询数量 默认 10
     * ...
     */
    async getArticleList(ctx) {
        let { page = 1, pageSize = 10, title, tag, category, rangTime, fetchTop } = ctx.query,
            offset = (page - 1) * pageSize,
            queryParams = {},
            order = [['createdAt', 'DESC']];

        if (title) queryParams.title = { [Op.like]: `%${title}%` };
        if (fetchTop === 'true') {
            queryParams.showOrder = 1;
            order = [['updatedAt', 'DESC']];
        }

        const tagFilter = tag ? { name: tag } : {};
        const categoryFilter = category ? { name: category } : {};

        pageSize = parseInt(pageSize); // 处理 pageSize

        const data = await ArticleModel.findAndCountAll({
            where: queryParams,
            include: [
                { model: TagModel, attributes: ['name'], where: tagFilter },
                { model: CategoryModel, attributes: ['name'], where: categoryFilter },
                {
                    model: CommentModel,
                    attributes: ['id'],
                    include: [{ model: ReplyModel, attributes: ['id'] }]
                }
            ],
            offset,
            limit: pageSize,
            order,
            row: true,
            distinct: true
        })

        responser(ctx, 200, '查询文章列表成功', ...data);
    },

    // 删除文章
    async delete(ctx) {
        const isAuth = checkAuth(ctx);
        if (isAuth) {
            const { articleId } = ctx.query;
            if (articleId) {
                if (articleId !== -1) {
                    await TagModel.destroy({ where: { articleId } });
                    await ArticleModel.destroy({ where: { id: articleId } });
                    await sequelize.query(`delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.articleId=${articleId}`);
                    responser(ctx, 200, '成功删除文章', null);
                } else {
                    responser(ctx, 403, '禁止删除！ 此文章用于关于页面的留言', null);
                }
            } else {
                responser(ctx, 403, '文章id不能为空', null);
            }
        }
    }
}
