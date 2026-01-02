import ProductList from "@/components/ProductList";

const ProductsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string;
        sort?: "price_asc" | "price_desc" | "newest";
        search?: string;
    }>;
}) => {
    const { category = "", sort, search } = await searchParams;
    return (
        <div>
            <ProductList
                category={category}
                sort={sort}
                search={search}
                params="products"
            />
        </div>
    );
};

export default ProductsPage;
