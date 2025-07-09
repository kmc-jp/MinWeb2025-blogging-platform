"use client";

import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {

    return (
        <>
            <Header />
            <main className="min-h-screen mb-40">
                {children}
            </main>
            <Footer />
        </>
    );
}