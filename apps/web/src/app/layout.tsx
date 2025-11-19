import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "project",
    description: "project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${outfit.variable} antialiased`}>
                <Providers>
                    <div className="grid grid-rows-[auto_1fr] h-svh">
                        <Header />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
