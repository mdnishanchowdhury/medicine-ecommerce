"use client";

import { authClient } from "@/lib/auth-client";
import { User, ChevronDown, Settings, LogOut, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileHeader() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) return <div className="h-9 w-32 animate-pulse bg-slate-100 rounded-full" />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 px-2 py-1 cursor-pointer group transition-all outline-none">
                    <Avatar className="h-9 w-9 rounded-full border border-slate-200 shadow-sm overflow-hidden">
                        <AvatarImage
                            src={session?.user?.image || ""}
                            alt={session?.user?.name || "User"}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded-full">
                            <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-500">
                                <User size={18} />
                            </div>
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden sm:flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[14px] font-semibold text-slate-800 truncate max-w-[120px]">
                                {session?.user?.name || "Emma Kwan"}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 truncate max-w-[120px] mt-0.5">
                                {session?.user?.email}
                            </span>
                        </div>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors ml-1" />
                    </div>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-slate-100 z-[99]">
                <DropdownMenuLabel className="font-normal text-slate-500 text-xs px-3 py-2">
                    Manage Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5">
                    <UserCircle size={16} />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5">
                    <Settings size={16} />
                    <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                    <LogOut size={16} />
                    <span className="font-bold">Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}