/**
 * @description 【文章】模块路由配置
 */

const Router = require('koa-router');
const router = new Router();


router.post('/create', async ctx => ctx.body = '新建文章');
router.delete('/delete', async ctx => ctx.body = '删除文章');
router.put('/update', async ctx => ctx.body = '修改文章');
router.get('/list', async ctx => ctx.body = '查询文章');
router.get('/detail/:id', async ctx => ctx.body = '查询文章详情');

module.exports = router;