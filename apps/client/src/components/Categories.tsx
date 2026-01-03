"use client";
import {
    Footprints,
    Briefcase,
    Shirt,
    ShoppingBasket,
    Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PiHoodieBold, PiShirtFolded } from "react-icons/pi";

const categories = [
    {
        name: "All",
        icon: <ShoppingBasket className="w-4 h-4" />,
        slug: "all",
    },
    {
        name: "T-shirts",
        icon: <Shirt className="w-4 h-4" />,
        slug: "t-shirts",
    },
    {
        name: "Shirts",
        icon: <PiShirtFolded className="w-4 h-4" />,
        slug: "shirts",
    },
    {
        name: "Sweashirts",
        icon: <PiHoodieBold className="w-4 h-4" />,
        slug: "sweashirts",
    },
    {
        name: "Shoes",
        icon: <Footprints className="w-4 h-4" />,
        slug: "shoes",
    },
    {
        name: "Bags",
        icon: <Briefcase className="w-4 h-4" />,
        slug: "bags",
    },
    {
        name: "Dresses",
        icon: <Venus className="w-4 h-4" />,
        slug: "dresses",
    },
    {
        name: "Jackets",
        icon: <Shirt className="w-4 h-4" />,
        slug: "jackets",
    },
];
const Categories = () => {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const pathname = usePathname();
    const router = useRouter();

    const handleCategoryClick = (value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("category", value || "all");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
            {categories.map((category) => (
                <div
                    key={category.name}
                    className={`flex items-center gap-2 p-2 cursor-pointer px-2 py-1 justify-center rounded-md ${
                        selectedCategory === category.slug
                            ? "bg-white"
                            : "text-gray-500"
                    }`}
                    onClick={() => handleCategoryClick(category.slug)}
                >
                    {category.icon}
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default Categories;
