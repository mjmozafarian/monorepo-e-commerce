import { z } from "zod";

import type { Product } from "@repo/product-db";
export type CartItemType = Product & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const ShippingFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(2, "Invalid email address"), //FIXME: verify what I used in TakBooks
    phone: z
        .string()
        .min(7, "Phone number must be at least 7 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^\+?[0-9]*$/, "Phone number must contain only digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
});

export type ShippingFormInputs = z.infer<typeof ShippingFormSchema>;

export type CartStoreStateType = {
    cart: CartItemsType;
    hasHydrated: boolean;
};

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    removeFromCart: (product: CartItemType) => void;
    clearCart: () => void;
};

export type CartStoreType = CartStoreStateType & CartStoreActionsType;
