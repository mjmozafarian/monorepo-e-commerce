"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    return (
        <div className="flex items-center gap-2 justify-end text-sm text-gray-500 mb-6">
            <span>Sort by:</span>
            <select
                name="sort"
                id="sort"
                className="ring ring-gray-200 shadow-md rounded-sm py-1"
                onChange={(e) => handleFilter(e.target.value)}
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
    );
};

export default Filter;
