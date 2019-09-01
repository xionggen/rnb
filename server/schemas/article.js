const Joi = require('joi');

const create = Joi.object().keys({
    title: Joi.string()
        .required()
        .error(new Error('文章标题不能为空')),
    content: Joi.string()
        .required()
        .error(new Error('文章内容不能为空'))
})

module.exports = {
    create,
}