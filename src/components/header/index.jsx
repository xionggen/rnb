import React, {useState} from 'react';
import styles from './index.module.scss';
import routes, {jumpRoute} from '../../routes';

export default function Header(props) {
    const [activeRoute, setActiveRoute] = useState();
    const {onCreate} = props;

    function goRoute(name) {
        setActiveRoute(name);
        jumpRoute(name);
    }

    return (
        <header className={styles.app_header}>
            <div className={styles.app_header_wrapper}>
                <div className={styles.app_header_left}>
                    <div className={styles.app_logo}></div>
                    <ul className={styles.app_menu}>
                        {routes.map(({label, name}, i) => <li key={i} className={activeRoute === name ? `${styles.app_menu_item} ${styles.app_menu_item_active}` : `${styles.app_menu_item}`} onClick={() => goRoute(name)}>{label}</li>)}
                    </ul>
                </div>
                <div className={styles.app_header_right}>
                    {/* <div className={styles.app_search_bar}>
                        <input type="text" placeholder="搜索文章"/>
                    </div> */}
                    <label className={styles.create_article_btn} onClick={onCreate}>写文章</label>
                </div>
            </div>
        </header>
    )
}