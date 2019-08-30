const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes');

const Sequelize = require('sequelize');
const db = require('./config/db');
const sequelize = new Sequelize(
    db.database,
    db.user,
    db.password,
    db.options,
);


// 生成Koa实例
const app = new Koa();

// 加载中间件
app
    .use(logger())
    .use(bodyParser())

// 挂载路由
app.use(router.routes(), router.allowedMethods());

app.listen(6060, () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('数据库连接成功');
        })
        .catch((err) => {
            console.log(err);
        })
    console.log('server is running at http://localhost:6060');
})