import React, {useState} from 'react';
import styles from './index.module.scss';
import routes, {jumpRoute} from '../../routes';

export default function Header(props) {
    const [activeRoute, setActiveRoute] = useState();
    const [flag, setFlag] = useState(false);
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
                        {routes.map(({label, name}, i) => <li key={i} className={activeRoute === name || window.location.pathname.substring(1) === name ? `${styles.app_menu_item} ${styles.app_menu_item_active}` : `${styles.app_menu_item}`} onClick={() => goRoute(name)}>{label}</li>)}
                    </ul>
                </div>
                <div className={styles.app_header_right}>
                    <div className={styles.app_search_bar}>
                        <i className="iconfont search"/>
                        <input className={styles.app_search_input} type="text" placeholder="搜索文章" onFocus={() => setFlag(true)} onBlur={() => setFlag(false)}/>
                        <div className={flag ? `${styles.app_search_bar_line} ${styles.app_search_bar_line_active}` : `${styles.app_search_bar_line}`}></div>
                    </div>
                    <div className={styles.create_article_btn} onClick={onCreate}>
                        <i className="iconfont article" style={{marginRight: '3px'}}/>
                        <label>写文章</label>
                    </div>
                </div>
            </div>
        </header>
    )
}