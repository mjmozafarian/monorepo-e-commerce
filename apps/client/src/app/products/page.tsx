import ProductList from "@/components/ProductList";

const ProductsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string;
        sort?: "asc" | "desc" | "newest";
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
