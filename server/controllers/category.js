const { sequelize } = require('../models');
const { article: ArticleModel, category: CategoryModel } = require('../models');
const {responser} = require('../lib/responser');

module.exports = {
    async getCategories(ctx) {
        const data = await CategoryModel.findAll({
            attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
            group: 'name'
        })
        responser(ctx, 200, '查询分类成功', data);
    },

    async getArticlesByCate(ctx) {
        let { page = 1, pageSize = 15, name } = ctx.query,
            offset = (page - 1) * pageSize,
            pageSize = parseInt(pageSize);

        const data = await ArticleModel.findAndCountAll({
            attributes: ['id', 'title', 'createdAt'],
            include: [{ model: CategoryModel, attributes: ['name'], where: { name } }],
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            distinct: true
        })
        responser(ctx, 200, ...data);
    }
}
