const Router = require('koa-router');
const router = new Router();
const CategoryController = require('../controllers/category');


router.get('/getList', CategoryController.getCategories);
router.get('/getArticles', CategoryController.getArticlesByCate);

module.exports = router;
