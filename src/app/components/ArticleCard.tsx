import Link from 'next/link';
import { safeStringify } from '@/lib/utils';

type Article = {
    _id: any;
    title: any;
    author: any;
    created_at: any;
    content: any;
};

type Props = {
    article: Article;
    showAuthor: boolean;
};

export default function ArticleCard({ article, showAuthor }: Props) {
    return (
        <Link href={`/articles/${safeStringify(article._id)}`} className="group bg-white shadow-md px-8 pt-6 pb-5 rounded-sm block">
            <div className="flex text-sm text-gray-500 mb-2">{new Date(safeStringify(article.created_at)).toLocaleDateString('ja-JP')}</div>
            
            <h2 className="text-2xl font-medium mb-4 text-sky-600 group-hover:text-red-400">{safeStringify(article.title)}</h2>

            <p className="text-gray-500 line-clamp-2 mb-4">{safeStringify(article.content)}</p>

            <div className="flex items-center text-sm text-gray-400">
                <div className="font-medium">
                    {showAuthor ? (
                        <div className="flex items-center">
                            <p className="mr-1">By</p>
                            <p>{safeStringify(article.author)}</p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>                
            </div>

        </Link>
    );
}
