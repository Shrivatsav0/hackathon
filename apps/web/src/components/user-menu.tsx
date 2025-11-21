import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserMenu() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <Skeleton className="h-9 w-24" />;
    }

    if (!session) {
        return (
            <Link href="/login">
                <Button variant="outline">Sign In</Button>
            </Link>
        );
    }

    return (
       <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
            </Link>
    );
}
