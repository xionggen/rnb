import React from 'react';
import styles from './index.module.scss';

export default function ArticleCard() {
    return (
        <section className={styles.article_card}>
            <h3 className={styles.article_title}>文章标题</h3>
            <h4 className={styles.article_desc}>文章摘要</h4>
            <h5 className={styles.article_author}>作者</h5>
            <h6 className={styles.article_update_time}>更新时间</h6>
        </section>
    )
}