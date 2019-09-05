const router = require('koa-router')();
const ArticleRouter = require('./article');
const UserRouter = require('./user');
const CategoryRouter = require('./category');
const TagRouter = require('./tags');
const CommentRouter = require('./comment');


router.use('/article', ArticleRouter.routes());
router.use('/user', UserRouter.routes());
router.use('/category', CategoryRouter.routes());
router.user('/tags', TagRouter.routes());
router.user('/comment', CommentRouter.routes());

router.get('/', async ctx => {
  ctx.body = 'hello koa2';
})

module.exports = router;
