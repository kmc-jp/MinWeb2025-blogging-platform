'use client'

import Link from 'next/link';
import { getArticle } from '@/lib/api';
import { safeStringify } from '@/lib/utils';
import { useState, useEffect } from 'react';

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
                    <h1 className="text-4xl font-extrabold text-gray-600 mb-4">{safeStringify(article.title)}</h1>
                    <div className="flex items-center">
                        <p className="mr-4 text-sky-600">By <Link href={`/author/${article.author.inner}`} className="hover:underline">{safeStringify(article.author)}</Link></p>
                        <p className="text-gray-500">{new Date(safeStringify(article.created_at)).toLocaleDateString('ja-JP')}</p>
                    </div>
                </div>
                <p className="text-gray-700">{safeStringify(article.content)}</p>
            </article>
        </div>
    );
}
