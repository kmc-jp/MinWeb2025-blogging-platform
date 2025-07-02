import Link from 'next/link';

async function getArticle(user: string, id: string): Promise<any> {
    const url = `https://minweb2025-blogging-platform-backend-975320007014.asia-northeast2.run.app/api/articles/${user}/${id}`
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
    return String(value)
}

export default async function ArticlePage(
  context: { params: Promise<{ user: string; id: string }> }
) {
    const { user, id } = await context.params;
    const article = await getArticle(user, id);

    if (!article) {
        return <div>記事が見つかりませんでした。</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="max-w-none">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-black dark:text-white mb-2">{safeStringify(article.title)}</h1>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <p className="mr-4">By <Link href={`/articles/${user}`} className="hover:underline">{safeStringify(article.author)}</Link></p>
                        <p>{new Date(safeStringify(article.created_at)).toLocaleDateString('ja-JP')}</p>
                    </div>
                </div>
                <p className="text-black dark:text-white">{safeStringify(article.content)}</p>
            </article>
        </div>
    );
}
