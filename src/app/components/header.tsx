import Link from "next/link";

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        {/* ハンバーガーメニューボタン */}
                        <button
                            onClick={onMenuClick}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            aria-label="メニューを開く"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-xl text-gray-900">みんウェブ Blog Platform</span>
                        </Link>
                    </div>

                    {/* デスクトップナビゲーション */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link
                            href="/search"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            検索
                        </Link>
                        <Link
                            href="/category"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            カテゴリー
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            About
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            ログイン
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                        >
                            新規登録
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}