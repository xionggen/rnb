import history from '../routes/history';
import routes from '../routes';

/**
 * @description 全局路由跳转方法
 * @param {String} name 路由配置name
 * @param {String} type 路由跳转类型，push || replace || go
 */
function jumpRoute(name, type = 'push') {
    let target = {};
    for(let i = 0; i < routes.length; i++) {
        let route = routes[i];
        if(name === route.name) {
            target = route;
            break;
        }
    }
    if(target.path) {
        history[type](target.path);
    }
}

export default jumpRoute;