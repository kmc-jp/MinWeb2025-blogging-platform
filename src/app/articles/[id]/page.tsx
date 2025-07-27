'use client'

import Link from 'next/link';
import { getArticle } from '@/lib/api';
import { useState, useEffect } from 'react';
import { ApiError, ApiErrorType } from '@/lib/types';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const [article, setArticle] = useState<any>(null);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        params.then(({ id }) => {
            setId(id);
        });
    }, [params]);

    useEffect(() => {
        if (id) {
            getArticle(id).then((article) => {
                if (article instanceof ApiError) {
                    switch (article.errorType) {
                        case ApiErrorType.FAILED_VALIDATION:
                            return <div>failed response validation</div>;
                        case ApiErrorType.NOT_FOUND:
                            return <div>記事がありません</div>;
                        default:
                            return <div>API error</div>;
                    }
                }
                setArticle(article);
            });
        }
    }, [id]);

    if (article == null) {
        return <div></div>;
    }

    return (
        
        <div className="bg-white mx-4 mt-4 px-7 pt-10 pb-20 rounded-sm">
            <article className="max-w-none">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-600 mb-4">{article.title}</h1>
                    <div className="flex items-center">
                        <p className="mr-4 text-sky-600">By <Link href={`/author/${article.author}`} className="hover:underline">{article.author}</Link></p>
                        <p className="text-gray-500">{article.created_at.toLocaleDateString('ja-JP')}</p>
                    </div>
                </div>
                <p className="text-gray-700">{article.content}</p>
            </article>
        </div>
    );
}
