/**
 * @description 路由配置
 */

const Router = require('koa-router');
const ArticleRouter = require('./article');
const UserRouter = require('./user');
const router = new Router();

router.use('/article', ArticleRouter.routes());
router.use('/user', UserRouter.routes());

router.post('/register', async ctx => ctx.body = '用户注册');
router.post('/login', async ctx => ctx.body = '用户登录');
router.get('/', async ctx => ctx.body = 'hello koa');

module.exports = router;