'use client'

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { postArticle } from '@/lib/api';
import { ApiError, ApiErrorType } from '@/lib/types';

export default function PostPage() {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const authorId = useId();
    const titleId = useId();
    const contentId = useId();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!author.trim() || !title.trim() || !content.trim()) {
            setError('すべての項目を入力してください');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await postArticle(author.trim(), title.trim(), content.trim());

            if (result instanceof ApiError) {
                switch (result.errorType) {
                    case ApiErrorType.BAD_REQUEST:
                        setError('存在しないユーザー名、もしくは不正な入力です。もう一度ご確認ください。');
                        setIsSubmitting(false);
                        return;
                    default:
                        setError('記事の投稿に失敗しました。もう一度お試しください。');
                        setIsSubmitting(false);
                        return;
                }
            }

            router.push(`/articles/${result.id}`);
        } catch {
            setError('予期しないエラーが発生しました');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white mx-4 mt-4 px-7 pt-10 pb-20 rounded-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">新規記事投稿</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor={authorId} className="block text-sm font-medium text-gray-700 mb-2">
                        ユーザー名
                    </label>
                    <input
                        type="text"
                        id={authorId}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="あなたの名前を入力"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor={titleId} className="block text-sm font-medium text-gray-700 mb-2">
                        タイトル
                    </label>
                    <input
                        type="text"
                        id={titleId}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="記事のタイトルを入力"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor={contentId} className="block text-sm font-medium text-gray-700 mb-2">
                        内容
                    </label>
                    <textarea
                        id={contentId}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="記事の内容を入力"
                        disabled={isSubmitting}
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">
                    {/* <button
                        type="button"
                        onClick={() => router.back()}
                        className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        disabled={isSubmitting}
                    >
                        キャンセル
                    </button> */}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '投稿中...' : '投稿する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
