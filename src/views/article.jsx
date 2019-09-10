import React from 'react';
import ArticleCard from '../components/articleCard';

export default function Article() {
    let list = [];
    for(let i = 0; i < 20; i++) {
        list.push(i);
    }
    return (
        <div>
            {list.map((i, k) => <ArticleCard key={k}/>)}
            <ArticleCard/>
        </div>
    );
}