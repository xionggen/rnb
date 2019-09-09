import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Header from '../components/header';
import styles from '../assets/styles/layout.module.scss';
import routes, {history} from '../routes';
import UserInfo from '../components/user';

export default function AppLayout() {
    return (
        <div className={styles.app_layout}>
            <Header/>
            <main className={styles.app_container}>
                <section className={styles.app_content}>
                    <Router history={history}>
                        <Switch>
                            {routes.map(({path, component}, i) => <Route key={i} path={path} component={component} exact/>)}
                        </Switch>
                    </Router>
                </section>
                <aside className={styles.app_aside}>
                    <UserInfo/>
                </aside>
            </main>
        </div>
    )
}