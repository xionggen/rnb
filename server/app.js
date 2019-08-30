const Koa = require('koa');
const router = require('./routes');

// 生成Koa实例
const app = new Koa();

// 挂载路由
app.use(router.routes(), router.allowedMethods());

app.listen(6060, () => {
    console.log('server is running at http://localhost:6060');
})