"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteractions = ({
    product,
    selectedSize,
    selectedColor,
}: {
    product: ProductType;
    selectedSize: string;
    selectedColor: string;
}) => {
    const { addToCart } = useCartStore();
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const handleOnClick = (type: "size" | "color", value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.push(`${pathName}?${params.toString()}`, { scroll: false });
    };
    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize,
            selectedColor,
            quantity,
        });
        toast.success("Product added to cart");
    };
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* SIZE */}
            <div className="flex flex-col gap-2 text-xs ">
                <span className=" text-gray-500">Size</span>
                <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                        <div
                            key={size}
                            className={`border-1 cursor-pointer p-[2px] ${
                                size === selectedSize
                                    ? "border-gray-600 "
                                    : "border-gray-300"
                            }`}
                            onClick={() => handleOnClick("size", size)}
                        >
                            <div
                                className={`size-6 ${
                                    size === selectedSize
                                        ? "bg-black text-white"
                                        : "bg-white text-black"
                                } uppercase flex items-center justify-center text-center`}
                            >
                                {size}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* COLOR */}
            <div className="flex flex-col gap-2 text-xs">
                <span className=" text-gray-500">Color</span>
                <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                        <div
                            key={color}
                            className={`border-1 cursor-pointer p-[2px] rounded-full ${
                                color === selectedColor
                                    ? "border-gray-600 "
                                    : "border-gray-300"
                            }`}
                            onClick={() => handleOnClick("color", color)}
                        >
                            <div
                                className={`size-6 rounded-full`}
                                style={{ backgroundColor: color }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            {/* QUANTITY */}
            <div className="flex flex-col gap-2 text-xs">
                <span className=" text-gray-500">Quantity</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                        className="cursor-pointer border-1 border-gray-300 p-1"
                    >
                        <Minus className="size-4" />
                    </button>
                    <span className="text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="cursor-pointer border-1 border-gray-300 p-1"
                    >
                        <Plus className="size-4 rotate-180" />
                    </button>
                </div>
            </div>

            {/* BUTTONS */}
            <button
                onClick={handleAddToCart}
                className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 text-sm font-medium"
            >
                <Plus className="size-4" />
                Add to Cart
            </button>
            <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 text-sm font-medium">
                <ShoppingCart className="size-4" />
                Buy Now
            </button>
        </div>
    );
};

export default ProductInteractions;
