const Router = require('koa-router');
const router = new Router();
const TagController = require('../controllers/tag');


router.get('/getList', TagController.getTags);
router.get('/getArticles', TagController.getArticlesByTag);

module.exports = router;
