"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", query);
        router.push(`/products?${params.toString()}`, { scroll: false });
    };
    return (
        <div className="hidden sm:flex items-center gap-2 rounded-md px-2 py-1 ring-1 ring-gray-200 shadow-md">
            <Search className="size-4 text-gray-500" />
            <input
                type="text"
                placeholder="Search..."
                id="search"
                className="text-sm outline-0"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(value);
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;
