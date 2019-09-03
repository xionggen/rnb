/**
 * @description 【文章】模块路由配置
 */

const Router = require('koa-router');
const router = new Router();
const {create, getList, update, remove, getDetail} = require('../controllers/article');

router.post('/create', create);
router.delete('/delete', remove);
router.put('/update', update);
router.get('/list', getList);
router.get('/detail/:code', getDetail);

module.exports = router;