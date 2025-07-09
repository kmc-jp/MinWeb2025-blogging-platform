'use client'

import { getArticlesByUser } from '@/lib/api';
import { useState, useEffect } from 'react';
import ArticleCard from '@/app/components/ArticleCard';

export default function Home({ params }: { params: Promise<{ author: string }> }) {
    const [userName, setUserName] = useState<string>('');
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        params.then(({ author }) => {
            setUserName(author);
        });
    }, [params]);

    useEffect(() => {
        if (userName) {
            getArticlesByUser(userName).then((articles) => {
                setArticles(articles);
            });
        }
    }, [userName]);

    if (!userName) {
        return <div>読み込み中...</div>;
    }

    if (!Array.isArray(articles)) {
        return <div>記事が見つかりませんでした。</div>;
    }

    if (articles.length === 0) {
        return <div></div>
        // return <div>記事がありません。</div>;
    }

    return (
        <>
            {articles.map((article: any) => (
                <div className="mx-8 my-4">
                    <ArticleCard key={article._id} article={article} showAuthor={false} />
                </div>
            ))}
        </>
    );
}
