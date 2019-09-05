const Router = require('koa-router');
const router = new Router();
const CommentController = require('../controllers/comment');

// 删除评论
router.delete('/del', CommentController.del);
router.delete('/reply/del', CommentController.del);
router.get('/getAboutComments', CommentController.getAboutComments);

module.exports = router;
