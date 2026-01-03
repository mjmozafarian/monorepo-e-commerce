import type { Product, Category } from "@repo/product-db";
import { record, z } from "zod";

export type ProductType = Product;
export type ProductsType = Product[];

export type StripeProductType = {
    id: string;
    name: string;
    price: number;
};

export const sizes = [
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
] as const;
export const colors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "yellow",
    "purple",
    "brown",
    "gray",
    "pink",
    "orange",
] as const;

export const ProductFormSchema = z
    .object({
        name: z
            .string({ message: "Product name is required" })
            .min(2, "Product name must be at least 2 characters long")
            .max(50),
        shortDescription: z
            .string({ message: "Short description is required" })
            .min(10, "Short description must be at least 10 characters long")
            .max(150, "Short description must be at most 150 characters long"),
        description: z
            .string({ message: "Description is required" })
            .min(2, "Description must be at least 2 characters long")
            .max(100, "Description must be at most 100 characters long"),
        price: z
            .number({ message: "Price must be a number" })
            .min(1, "Price must be at least 1")
            .max(1000000, "Price is too high"),
        categorySlug: z
            .string({ message: "Category is required" })
            .min(1, "Category is required"),
        sizes: z
            .array(z.enum(sizes))
            .min(1, "At least one size must be selected"),
        colors: z
            .array(z.enum(colors))
            .min(1, "At least one color must be selected"),
        images: record(z.string(), z.string(), {
            message: "Image for each color is required",
        }),
    })
    .refine(
        (data) => {
            const missingImages = data.colors.filter(
                (color: string) => !data.images[color]
            );
            return missingImages.length === 0;
        },
        {
            message: "Images must be provided for all selected colors",
            path: ["images"],
        }
    );

export type CategoryType = Category;

export const categoryFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
});
