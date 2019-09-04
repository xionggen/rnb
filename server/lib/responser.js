/**
 * @description 响应体格式规范
 * @param {Object} ctx 上下文环境
 * @param {Number} code 状态码
 * @param {String} msg 响应消息
 * @param {Object | Array} data 响应集合
 */

exports.responser = function responser(ctx, code, msg, data) {
    ctx.body = {
        code,
        msg,
        data,
    }
}