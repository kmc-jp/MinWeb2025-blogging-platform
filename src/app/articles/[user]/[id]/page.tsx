import Link from 'next/link';
import { getArticle } from '@/lib/api';
import { safeStringify } from '@/lib/utils';

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
                    <h1 className="text-4xl font-extrabold text-black mb-2">{safeStringify(article.title)}</h1>
                    <div className="flex items-center text-gray-500">
                        <p className="mr-4">By <Link href={`/articles/${user}`} className="hover:underline">{safeStringify(article.author)}</Link></p>
                        <p>{new Date(safeStringify(article.created_at)).toLocaleDateString('ja-JP')}</p>
                    </div>
                </div>
                <p className="text-black">{safeStringify(article.content)}</p>
            </article>
        </div>
    );
}
