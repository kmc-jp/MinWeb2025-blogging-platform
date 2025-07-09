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
        <div className="container mx-auto px-4 py-8">
            <article className="max-w-none">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-black mb-2">{safeStringify(article.title)}</h1>
                    <div className="flex items-center text-gray-500">
                        <p className="mr-4">By <Link href={`/author/${article.author.inner}`} className="hover:underline">{safeStringify(article.author)}</Link></p>
                        <p>{new Date(safeStringify(article.created_at)).toLocaleDateString('ja-JP')}</p>
                    </div>
                </div>
                <p className="text-black">{safeStringify(article.content)}</p>
            </article>
        </div>
    );
}
