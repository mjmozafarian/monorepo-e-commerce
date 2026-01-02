"use client";

import useCartStore from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
    const { cart, hasHydrated } = useCartStore();
    if (!hasHydrated) return null;
    return (
        <Link href="/cart" className="relative">
            <ShoppingCart className="size-4 text-gray-600" />
            <span className="absolute -top-3 -right-3 text-xs bg-amber-400 text-gray-400 rounded-full w-4 h-4 flex items-center justify-center fotn-medium">
                {cart.length}
            </span>
        </Link>
    );
};

export default ShoppingCartIcon;
