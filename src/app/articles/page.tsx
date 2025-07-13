'use client'

import { getArticles } from '@/lib/api';
import { useState, useEffect } from 'react';
import { safeStringify } from '@/lib/utils';
import ArticleCard from '@/app/components/ArticleCard';

export default function Home() {
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        try {
            getArticles().then((articles) => {
                setArticles(articles);
                if (!Array.isArray(articles)) {
                    return <div>記事が見つかりませんでした。</div>;
                }

                if (articles.length === 0) {
                    return <div>記事がありません。</div>;
                }
            });
        } catch (err: any) {
            return <div> {err.message} </div>;
        }
    }, [])



    return (
        <>
            <div className="mx-8 mt-8">
                {articles.map((article: any) => (
                    <div key={safeStringify(article._id)} className="my-4">
                        <ArticleCard article={article} showAuthor={true} />
                    </div>
                ))}
            </div>
        </>
    );
}
