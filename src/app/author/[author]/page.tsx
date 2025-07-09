'use client'

import { getArticlesByUser } from '@/lib/api';
import { useState, useEffect } from 'react';
import { safeStringify } from '@/lib/utils';
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
                    if (!Array.isArray(articles)) {
                        return <div>記事が見つかりませんでした。</div>;
                    }
                    if (articles.length === 0) {
                        return <div>記事がありません。</div>;
                    }
            });
        }
        
    }, [userName]);

    // if (!userName) {
    //     return <div></div>;
    // }

    return (
        <>
            <div className="mx-8 mt-8">
                {userName && <h1 className="text-2xl font-medium p-2 text-gray-600">{ safeStringify(userName) }の記事一覧</h1> }
                {articles.map((article: any) => (
                    <div key={safeStringify(article._id)} className="my-4">
                        <ArticleCard article={article} showAuthor={false} />
                    </div>
                ))}
            </div>
        </>
    );
}
