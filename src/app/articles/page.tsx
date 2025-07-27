'use client'

import { getArticles } from '@/lib/api';
import { useState, useEffect } from 'react';
import ArticleCard from '@/app/components/ArticleCard';
import { ApiError, ApiErrorType, ArticleResponse } from '@/lib/types';

export default function Home() {
    const [articles, setArticles] = useState<ArticleResponse[]>([]);

    useEffect(() => {
        getArticles().then((articles) => {
            if (articles instanceof ApiError) {
                switch (articles.errorType) {
                    case ApiErrorType.FAILED_VALIDATION:
                        return <div>failed response validation</div>;
                    case ApiErrorType.NOT_FOUND:
                        return <div>記事がありません</div>;
                    default:
                        return <div>API error</div>;
                }
            }
            console.log(articles);
            setArticles(articles as ArticleResponse[]);
        });
    }, [])

    return (
        <>
            <div className="mx-8 mt-8">
                {articles.map((article: any) => (
                    <div key={article.id} className="my-4">
                        <ArticleCard article={article} showAuthor={true} />
                    </div>
                ))}
            </div>
        </>
    );
}
