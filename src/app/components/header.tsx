import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 top-0 z-50">
            <div className="mx-7">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 whitespace-nowrap">Blog Platform</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/search">
                            <Image src="/search.svg" alt="Search" width={24} height={24} className="cursor-pointer" />
                        </Link>
                        <div className="flex items-center px-4 py-2 rounded-2xl border border-gray-300 hover:bg-gray-200 transition-colors duration-200">
                            <Link
                                href="/auth"
                                className="text-s font-bold text-gray-500">
                                ログイン
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
