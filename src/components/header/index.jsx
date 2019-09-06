import React from 'react';
import styles from './index.module.scss';

export default function Header() {
    return (
        <header className={styles.app_header}>
            <div className={styles.app_header_wrapper}>
                <div className={styles.app_header_left}>
                    <div className={styles.app_logo}></div>
                    <ul className={styles.app_menu}>
                        <li className={styles.app_menu_item}><a href="/">首页</a></li>
                        <li className={styles.app_menu_item}><a href="/">分类</a></li>
                        <li className={styles.app_menu_item}><a href="/">关于</a></li>
                    </ul>
                </div>
                <div className={styles.app_header_right}>
                    {/* <div className={styles.app_search_bar}>
                        <input type="text" placeholder="搜索文章"/>
                    </div> */}
                    <a href="/" className={styles.create_article_btn}>写文章</a>
                </div>
            </div>
        </header>
    )
}