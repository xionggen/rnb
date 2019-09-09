import {createBrowserHistory} from 'history';

import Article from '../views/article';
import Category from '../views/category';

const routes = [
    {name: 'article', label: '文章', path: '/article', component: Article},
    {name: 'category', label: '分类', path: '/category', component: Category},
];

export const history = createBrowserHistory();

export function jumpRoute(name, action = 'push') {
    let target = null;
    for(let i = 0; i < routes.length; i++) {
        if(routes[i].name === name) {
            target = routes[i];
            break;
        }
    }
    target && history[action](target.path);
}

export default routes;
