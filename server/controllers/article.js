// const Joi = require('joi');

/**
 * @description 新建文章
 * @param {Object} ctx
 * @param {String} title 标题
 * @param {String} content 内容
 */
exports.create = async function create(ctx) {
    const {title, content} = ctx.request.body;
    if(!title) {
        // 文章标题不能为空
        ctx.body = {code: 504, msg: '文章标题不能为空', data: null};
        return;
    }
    if(!content) {
        // 文章内容不能为空
        ctx.body = {code: 504, msg: '文章内容不能为空', data: null};
        return;
    }
    ctx.body = {code: 200, msg: '创建文章成功', data: ctx.request.body};
}