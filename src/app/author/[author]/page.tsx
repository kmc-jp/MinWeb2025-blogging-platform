'use client'

import { getArticlesByUser } from '@/lib/api';
import { useState, useEffect } from 'react';
import { safeStringify } from '@/lib/utils';
import ArticleCard from '@/app/components/ArticleCard';
import { ArticleResponse, ApiError, ApiErrorType } from "@/lib/types";

export default function Home({ params }: { params: Promise<{ author: string }> }) {
    const [userName, setUserName] = useState<string>('');
    const [articles, setArticles] = useState<ArticleResponse[]>([]);

    useEffect(() => {
        params.then(({ author }) => {
            setUserName(author);
        });
    }, [params]);

    useEffect(() => {
        if (userName) {
            getArticlesByUser(userName).then((articles) => {
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
                setArticles(articles as ArticleResponse[]);
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
                {articles.map((article: any, index: number) => (
                    <div key={index.toString()} className="my-4">
                        <ArticleCard article={article} showAuthor={false} />
                    </div>
                ))}
            </div>
        </>
    );
}
