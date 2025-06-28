import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white fixed bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-xl">みんウェブ Blog Platform</span>
                        </div>
                    </div>

                    {/* <div>
                        <h3 className="font-semibold mb-4">サポート</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    ヘルプセンター
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </div>


                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; 2025 xxxx. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}