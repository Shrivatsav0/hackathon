"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
    const pathname = usePathname();
    const links = [
        { to: "/", label: "Home" },
        { to: "/events", label: "Events" },
       
    ] as const;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 font-bold text-xl"
                >
                    <span>EventSync</span>
                </Link>
                
                <nav className="hidden md:flex gap-6">
                    {links.map(({ to, label }) => {
                        const isActive = pathname === to;
                        return (
                            <Link
                                key={to}
                                href={to as any} 
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
                
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}