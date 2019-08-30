/**
 * @description 【用户】模块路由配置
 */

const Router = require('koa-router');
const router = new Router();

router.delete('/delete', async ctx => ctx.body = '删除用户');
router.put('/:id', async ctx => ctx.body = '更新用户信息');
router.get('/list', async ctx => ctx.body = '查询用户');
router.get('/detail/:id', async ctx => ctx.body = '查询用户详情');

module.exports = router;