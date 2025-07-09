import Link from "next/link";

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="mx-7">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 whitespace-nowrap">Blog Platform</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                        >
                            ログイン
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}