/**
 * @description 【分类】路由配置
 */

const Router = require('koa-router');
const router = new Router();
const {getCategories} = require('../controllers/category');

router.get('/list', getCategories);
// router.get('/articleList', async ctx => ctx.body = '查询分类的文章列表');

module.exports = router;