import { Frown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SuggestingCategories = [
    {
        id: 1,
        name: "T-Shirts",
        img: "/categories/tshirts.webp",
    },
    {
        id: 2,
        name: "Shoes",
        img: "/categories/shoes.webp",
    },
    {
        id: 3,
        name: "Dresses",
        img: "/categories/dresses.webp",
    },
    {
        id: 4,
        name: "Bags",
        img: "/categories/bags.webp",
    },
];
const NotFound = ({ type }: { type: string }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="flex justify-center items-center flex-col mt-4 text-gray-600 bg-pink-100 p-8 rounded-lg w-full">
                <Frown className="mx-auto mb-4 size-16 " />
                <h1 className="font-bold text-xl text-center">
                    sorry, we can&apos;t find the {type} you&apos;re looking
                    for.
                </h1>
            </div>
            <div className="flex justify-center items-center flex-col mt-4 text-gray-600 text-lg font-semibold w-full">
                <h2>let&apos;s get you back on track</h2>
                <div className="grid gap-4 w-full xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-4">
                    {SuggestingCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.name.toLowerCase()}`}
                        >
                            <div className="relative aspect-2/3">
                                <Image
                                    src={category.img}
                                    alt={category.name}
                                    fill
                                    className="object-cover hover:scale-102 transition-all duration-300 rounded-sm"
                                />
                            </div>
                            <span className="text-center font-medium w-full block mt-2">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
