import React from 'react';
import styles from './index.module.scss';
import defaultImg from '../../assets/images/default.jpg';

export default function ArticleCard() {
    return (
        <section className={styles.article_card}>
            <div>
                <p className={styles.article_record}>作者·更新时间·分类</p>
                <p className={styles.article_title}>文章标题</p>
                <p className={styles.article_comment}>
                    <i className="iconfont comment"/>
                    <span className={styles.article_comment_count}>0</span>
                </p>
            </div>
            <img src={defaultImg} alt="" className={styles.article_picture}/>
        </section>
    )
}