import React from 'react';
import styles from './index.module.scss';
import ArticleCard from '../articleCard';

export default function Container() {
    let articleList = [];
    for(let i = 0; i < 10; i++) {
        articleList.push(i);
    }
    return (
        <main className={styles.app_container}>
            <section className={styles.article_list}>
                {articleList.map((v, i) => <ArticleCard key={i}/>)}
            </section>
            <aside className={styles.asider}>
                
            </aside>
        </main>
    )
}