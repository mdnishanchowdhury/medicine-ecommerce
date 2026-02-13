"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Pill, Loader2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                if (query === "") setIsMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [query]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const res = await fetch(`/api/medicines/search?q=${query}`);
                const data = await res.json();
                setResults(data.data || []);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleClear = () => {
        setQuery("");
        setResults([]);
    };

    return (
        <div className="relative flex items-center" ref={searchRef}>
            {!isMobileOpen && (
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="lg:hidden p-2 rounded-full hover:bg-slate-100"
                >
                    <Search className="size-5 text-slate-600" />
                </button>
            )}

            <div className={cn(
                "transition-all duration-300 flex items-center bg-slate-100 dark:bg-slate-800 rounded-full h-10 border",
                isMobileOpen
                    ? "fixed inset-x-2 top-2 z-[100] bg-white dark:bg-slate-900 px-3 shadow-lg lg:relative lg:inset-auto lg:w-full lg:shadow-none"
                    : "hidden lg:flex lg:w-full lg:max-w-[300px] px-3 lg:bg-white"
            )}>
                {isMobileOpen && (
                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden mr-2">
                        <ArrowLeft className="size-5 text-slate-500" />
                    </button>
                )}

                <Search className="size-4 text-slate-400 shrink-0 hidden lg:block" />

                <input
                    type="text"
                    placeholder="Search medicines..."
                    className="bg-transparent outline-none text-sm w-full ml-2 py-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus={isMobileOpen}
                />

                <div className="flex items-center gap-2">
                    {isLoading && <Loader2 className="size-4 animate-spin text-blue-500" />}
                    {query && (
                        <button onClick={handleClear} className="p-1 hover:bg-slate-200 rounded-full">
                            <X className="size-4 text-slate-400" />
                        </button>
                    )}
                </div>
            </div>

            {
                (query.length >= 2) && (
                    <div className={cn(
                        "absolute top-[calc(100%+8px)] right-0 bg-white dark:bg-slate-900 border rounded-xl shadow-2xl z-999 overflow-hidden transition-all",
                        isMobileOpen ? "fixed inset-x-2 top-14 w-auto" : "w-full min-w-75"
                    )}>
                        <div className="p-2 max-h-87.5 overflow-y-auto">
                            {results.length > 0 ? (
                                results.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/medicine/${item.id}`}
                                        onClick={() => { setQuery(""); setIsMobileOpen(false); }}
                                        className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group border-b border-slate-50 last:border-0"
                                    >
                                        <div className="size-9 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                                            <Pill className="size-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                                {item.productName || item.name}
                                            </p>
                                            <p className="text-[11px] text-blue-600 font-semibold italic">৳ {item.price}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : !isLoading && (
                                <div className="p-6 text-center">
                                    <p className="text-xs text-muted-foreground italic">No medicine found for "{query}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
}