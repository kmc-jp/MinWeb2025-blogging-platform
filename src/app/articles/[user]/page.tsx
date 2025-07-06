import Link from 'next/link';
import { getArticlesByUser } from '@/lib/api';
import { safeStringify } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default async function Home({ params }: { params: Promise<{ user: string }> }) {
    const [articles, setArticles] = useState<any[]>([]);
    const { user } = await params
    useEffect(() => {
        getArticlesByUser(user).then((articles) => {
            setArticles(articles);
        });
    }, [])

    if (!Array.isArray(articles)) {
        return <div>記事が見つかりませんでした。</div>;
    }

    if (articles.length === 0) {
        return <div>記事がありません。</div>;
    }

    return (
        <>
            {articles.map((article: any, index: number) => (
                <div key={safeStringify(article._id) || `article-${index}`}
                    className="border-b border-gray-200 p-10">
                    <div className="text-sm font-bold text-gray-500">{safeStringify(article._id)}</div>
                    <Link href={`/articles/${user}/${safeStringify(article._id)}`}>
                        <div className="text-xl font-bold cursor-pointer hover:underline">{safeStringify(article.title)}</div>
                    </Link>
                    <div className="text-lg font-bold">{safeStringify(article.author)}</div>
                    <div className="text-base font-bold">{safeStringify(article.created_at)}</div>
                    <div className="border border-gray-200 p-5 m-2">
                        <div className="text-sm">{safeStringify(article.content)}</div>
                    </div>
                </div>
            ))}
        </>
    );
}
