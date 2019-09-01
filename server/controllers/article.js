const Joi = require('joi');
const ArticleSchema = require('../schemas/article');
const {article: ArticleModel} = require('../models');

/**
 * @description 新建文章
 * @param {Object} ctx
 * @param {String} title 标题
 * @param {String} content 内容
 */
exports.create = async function create(ctx) {
    const {title, content} = ctx.request.body;
    const validator = Joi.validate(ctx.request.body, ArticleSchema.create)
    if(validator.error) {
        ctx.body = {code: 400, msg: validator.error.message};
    } else {
        const data = await ArticleModel.create(
            {title, content}
        );
        ctx.body = {code: 200, msg: '创建文章成功', data};
    }
}