"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@repo/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [productTypes, setProductTypes] = useState({
        size: product.sizes[0]!,
        color: product.colors[0]!,
    });
    const handleProductTypeChange = ({
        type,
        value,
    }: {
        type: "size" | "color";
        value: string;
    }) => {
        setProductTypes((prev) => ({ ...prev, [type]: value }));
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: productTypes.size,
            selectedColor: productTypes.color,
        });
        toast.success("Product added to cart!");
    };
    return (
        <div className="shadow-lg rounded-lg overflow-hidden">
            {/*Image*/}
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-2/3">
                    <Image
                        src={
                            (product.images as Record<string, string>)?.[
                                productTypes.color
                            ]
                        }
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-all duration-300"
                    />
                </div>
            </Link>
            {/*Product details*/}
            <div className="flex flex-col gap-4 p-4">
                <h1 className="font-medium">{product.name}</h1>
                <p className="text-sm text-gray-500">
                    ${product.shortDescription}
                </p>
                {/* PRODUCT TYPES */}
                <div className="flex items-center gap-4 text-xs">
                    {/* SIZE */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Size</span>
                        <select
                            name="size"
                            id="size"
                            className="ring ring-gray-300 rounded-md px-2 py-1"
                            onChange={(e) =>
                                handleProductTypeChange({
                                    type: "size",
                                    value: e.target.value,
                                })
                            }
                        >
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* COLOR OPTIONS */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Color</span>
                        <div className="flex items-center gap-2">
                            {product.colors.map((color) => (
                                <div
                                    key={color}
                                    className={`cursor-pointer border ${
                                        productTypes.color === color
                                            ? "ring ring-gray-400"
                                            : "ring ring-gray-200"
                                    } rounded-full p-[1.2px] flex items-center justify-center`}
                                    onClick={() =>
                                        handleProductTypeChange({
                                            type: "color",
                                            value: color,
                                        })
                                    }
                                >
                                    <div
                                        className="size-3.5 rounded-full "
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* PRICE AND ADD TO CART */}
                <div className="flex items-center justify-between">
                    <p className="font-medium">${product.price.toFixed(2)}</p>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 ring ring-gray-200 rounded-md shadow-lg px-2 py-1 text-sm cursor-pointer bg-gray-100 hover:text-white hover:bg-black transition-all duration-300"
                    >
                        <ShoppingCart className="size-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
