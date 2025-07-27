import Link from 'next/link';
import { ArticleResponse } from '@/lib/types';

type Props = {
    article: ArticleResponse;
    showAuthor: boolean;
};

export default function ArticleCard({ article, showAuthor }: Props) {
    return (
        <div className="group bg-white shadow-md px-8 pt-6 pb-5 rounded-sm block">
            <Link href={`/articles/${article.id}`}>
                <div className="flex text-sm text-gray-500 mb-2">{article.created_at.toLocaleDateString()}</div>
                <h2 className="text-2xl font-medium mb-4 text-sky-600 group-hover:text-red-400">{article.title}</h2>
                <p className="text-gray-500 line-clamp-2 mb-4">{article.content}</p>
            </Link>
            <div className="flex items-center text-sm text-gray-400">
                    <div className="font-medium">
                        {showAuthor ? (
                            <div className="flex items-center">
                                <p className="mr-1">By</p>
                                <Link href={`/author/${article.author}`} className="hover:underline">{article.author}</Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>                
                </div>
        </div>
    );
}
