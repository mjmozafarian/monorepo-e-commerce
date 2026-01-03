import { ProductsType } from "@repo/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

//TEMPORARY
// const products: ProductsType = [
//     {
//         id: 1,
//         stripeProductId: "prod_TeQJ6OAmBsrCsh",
//         name: "Adidas CoreFit T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 39.9,
//         sizes: ["s", "m", "l", "xl", "xxl"],
//         colors: ["gray", "purple", "green"],
//         images: {
//             gray: "/products/1g.png",
//             purple: "/products/1p.png",
//             green: "/products/1gr.png",
//         },
//         categorySlug: "t-shirts",
//         createdAt: new Date("2024-06-01T10:00:00Z"),
//         updatedAt: new Date("2024-06-10T12:00:00Z"),
//     },
//     {
//         id: 2,
//         stripeProductId: "prod_12345",
//         name: "Puma Ultra Warm Zip",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l", "xl"],
//         colors: ["gray", "green"],
//         images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//         categorySlug: "jackets",
//         createdAt: new Date("2024-06-02T10:00:00Z"),
//         updatedAt: new Date("2024-06-11T12:00:00Z"),
//     },
//     {
//         id: 3,
//         stripeProductId: "prod_12345",
//         name: "Nike Air Essentials Pullover",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["s", "m", "l"],
//         colors: ["green", "blue", "black"],
//         images: {
//             green: "/products/3gr.png",
//             blue: "/products/3b.png",
//             black: "/products/3bl.png",
//         },
//         categorySlug: "sweatshirts",
//         createdAt: new Date("2024-06-03T10:00:00Z"),
//         updatedAt: new Date("2024-06-12T12:00:00Z"),
//     },
//     {
//         id: 4,
//         stripeProductId: "prod_12345",
//         name: "Nike Dri Flex T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 29.9,
//         sizes: ["s", "m", "l"],
//         colors: ["white", "pink"],
//         images: { white: "/products/4w.png", pink: "/products/4p.png" },
//         categorySlug: "t-shirts",
//         createdAt: new Date("2024-06-04T10:00:00Z"),
//         updatedAt: new Date("2024-06-13T12:00:00Z"),
//     },
//     {
//         id: 5,
//         stripeProductId: "prod_12345",
//         name: "Under Armour StormFleece",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 49.9,
//         sizes: ["s", "m", "l"],
//         colors: ["red", "orange", "black"],
//         images: {
//             red: "/products/5r.png",
//             orange: "/products/5o.png",
//             black: "/products/5bl.png",
//         },
//         categorySlug: "jackets",
//         createdAt: new Date("2024-06-05T10:00:00Z"),
//         updatedAt: new Date("2024-06-14T12:00:00Z"),
//     },
//     {
//         id: 6,
//         stripeProductId: "prod_12345",
//         name: "Nike Air Max 270",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["40", "42", "43", "44"],
//         colors: ["gray", "white"],
//         images: { gray: "/products/6g.png", white: "/products/6w.png" },
//         categorySlug: "shoes",
//         createdAt: new Date("2024-06-06T10:00:00Z"),
//         updatedAt: new Date("2024-06-15T12:00:00Z"),
//     },
//     {
//         id: 7,
//         stripeProductId: "prod_12345",
//         name: "Nike Ultraboost Pulse ",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["40", "42", "43"],
//         colors: ["gray", "pink"],
//         images: { gray: "/products/7g.png", pink: "/products/7p.png" },
//         categorySlug: "shoes",
//         createdAt: new Date("2024-06-07T10:00:00Z"),
//         updatedAt: new Date("2024-06-16T12:00:00Z"),
//     },
//     {
//         id: 8,
//         stripeProductId: "prod_12345",
//         name: "Levi’s Classic Denim",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l"],
//         colors: ["blue", "green"],
//         images: { blue: "/products/8b.png", green: "/products/8gr.png" },
//         categorySlug: "jeans",
//         createdAt: new Date("2024-06-08T10:00:00Z"),
//         updatedAt: new Date("2024-06-17T12:00:00Z"),
//     },
// ];

const fetchProducts = async ({
    category,
    sort,
    search,
    params,
}: {
    category?: string;
    sort?: "asc" | "desc" | "newest";
    search?: string;
    params: "homepage" | "products";
}) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category && category !== "all" ? `category=${category}` : ""}&sort=${sort || `newest`}${search ? `&search=${search}` : ""}${
            params === "homepage" ? "&limit=8" : ""
        }`
    );

    const data: ProductsType = await res.json();
    return data;
};

const ProductList = async ({
    category,
    sort,
    search,
    params,
}: {
    category: string;
    sort?: "asc" | "desc" | "newest";
    search?: string;
    params: "homepage" | "products";
}) => {
    const products = await fetchProducts({ category, sort, search, params });
    return (
        <div className="w-full">
            <Categories />
            {params === "products" && <Filter />}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Link
                href={
                    category ? `/products/?category=${category}` : "/products"
                }
                className="mt-4 flex justify-end underline cursor-pointer text-sm text-gray-500"
            >
                View All Products
            </Link>
        </div>
    );
};

export default ProductList;
