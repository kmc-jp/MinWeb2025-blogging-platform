"use client";

import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar, { useSidebar } from "./sidebar";

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

    return (
        <>
            <Header onMenuClick={toggleSidebar} />
            <Sidebar isOpen={isOpen} onClose={closeSidebar} />
            <main className="min-h-screen mb-40">
                {children}
            </main>
            <Footer />
        </>
    );
} 