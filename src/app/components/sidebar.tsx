"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export default function Sidebar({ isOpen, onClose, className = "" }: SidebarProps) {
    // Escキーでサイドバーを閉じる
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuItems = [
        { href: "/", label: "ホーム", icon: "🏠" },
        { href: "/search", label: "検索", icon: "🔍" },
        { href: "/category", label: "カテゴリー", icon: "📂" },
        { href: "/tags", label: "タグ", icon: "🏷️" },
        { href: "/about", label: "About", icon: "ℹ️" },
        { href: "/contact", label: "お問い合わせ", icon: "📧" },
    ];

    return (
        <>
            {/* オーバーレイ */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* サイドバー */}
            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } ${className}`}
            >
                {/* サイドバーヘッダー */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">メニュー</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="サイドバーを閉じる"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* ナビゲーションメニュー */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* サイドバーフッター */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                    <div className="space-y-3">
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="block w-full text-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            ログイン
                        </Link>
                        <Link
                            href="/signup"
                            onClick={onClose}
                            className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                        >
                            新規登録
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}

// サイドバーの状態を管理するカスタムフック
export function useSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return {
        isOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
    };
} 