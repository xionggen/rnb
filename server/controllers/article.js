const Joi = require('joi');
const ArticleSchema = require('../schemas/article');
const {article: ArticleModel} = require('../models');
const {Op} = require('sequelize');
const uuid = require('node-uuid');

/**
 * @description 新建文章
 * @param {String} title 标题
 * @param {String} content 内容
 */
exports.create = async function create(ctx) {
    const {title, content} = ctx.request.body;
    const validator = Joi.validate(ctx.request.body, ArticleSchema.create)
    if(validator.error) {
        ctx.body = {code: 400, msg: validator.error.message};
    } else {
        await ArticleModel.create(
            {title, content, code: uuid.v1()}
        );
        ctx.body = {code: 200, msg: '创建文章成功', data: null};
    }
}

/**
 * @description 查询文章列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} title 文章标题，（模糊查询->todo）
 */

exports.getList = async function getList(ctx) {
    let {page = 1, pageSize = 10, title = ''} = ctx.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let where = {};
    let order = [['createdAt', 'DESC']];
    if(title) {
        where.title = {[Op.like]: `%${title}%`};
    }
    const data = await ArticleModel.findAndCountAll({
        order,
        where,
        row: true,
        limit: pageSize,
    })
    const {count, rows} = data;
    ctx.body = {code: 200, msg: '查询文章列表成功', data: {total: count, list: rows}};
}

/**
 * @description 修改文章
 * @param {String} code 文章code
 * @param {String} title 文章标题
 * @param {String} content 文章内容
 */

exports.update = async function update(ctx) {
    const {code, title, content} = ctx.request.body;
    const validator = Joi.validate(ctx.request.body, ArticleSchema.update);
    if(validator.error) {
        ctx.body = {code: 400, msg: validator.error.message, data: null};
    } else {
        await ArticleModel.update(
            {
                title,
                content,
            },
            {where: {code}}
        );
        ctx.body = {code: 200, msg: '更新文章成功', data: null};
    }
}

/**
 * @description 删除文章
 * @param {String} code 文章code
 */

exports.remove = async function remove(ctx) {
    const {code} = ctx.query;
    if(code) {
        await ArticleModel.destroy({where: {code}})
        ctx.body = {code: 200, msg: '删除文章成功', data: null};
    } else {
        ctx.body = {code: 400, msg: '文章id不能为空', data: null};
    }
}

/**
 * @description 获取文章详情
 * @param {String} code 文章code
 */

exports.getDetail = async function getDetail(ctx) {
    const {code} = ctx.params;
    const data = await ArticleModel.findOne({
        where: {code},
        order: [['createdAt', 'DESC']],
        row: true,
    });
    ctx.body = {code: 200, msg: '获取详情成功', data};
}