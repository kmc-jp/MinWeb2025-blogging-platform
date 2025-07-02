import Link from 'next/link';

async function getArticles(): Promise<any> {
    const url = `https://minweb2025-blogging-platform-backend-975320007014.asia-northeast2.run.app/api/articles`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return res.json();
}

function safeStringify(value: any): string {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object') {
        const res = value.inner ? value.inner : value.$oid
        return res;
    }
    return String(value);
}

export default async function Home() {
    const articles = await getArticles();

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
                    <Link href={`/articles/${safeStringify(article.author.inner)}/${safeStringify(article._id)}`}>
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