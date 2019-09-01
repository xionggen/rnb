const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes');
const models = require('./models');

// 生成Koa实例
const app = new Koa();

// 加载中间件
app
    .use(logger())
    .use(bodyParser())

// 挂载路由
app.use(router.routes(), router.allowedMethods());

app.listen(6060, () => {
    models.sequelize
        .sync({force: false, logging: false})
        .then(() => {
            console.log('数据库连接成功');
            console.log('server is running at http://localhost:6060');
        })
        .catch((err) => {
            console.log(err);
        })
})