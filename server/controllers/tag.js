const { sequelize } = require('../models');
const { tag: TagModel, article: ArticleModel, category: CategoryModel } = require('../models');
const {responser} = require('../lib/responser');

module.exports = {
    async getTags(ctx) {
        const data = await TagModel.findAll({
            attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
            group: 'name'
        })
        responser(ctx, 200, '查询标签成功', data);
    },

    async getArticlesByTag(ctx) {
        let { page = 1, pageSize = 15, name } = ctx.query,
            offset = (page - 1) * pageSize

        pageSize = parseInt(pageSize)

        const data = await ArticleModel.findAndCountAll({
            attributes: ['id', 'title', 'createdAt'],
            include: [{ model: TagModel, where: { name } }, { model: CategoryModel }],
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            distinct: true
        })
        responser(ctx, 200, '查询文章成功', ...data);
    }
}
