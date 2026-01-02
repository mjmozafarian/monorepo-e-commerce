import { ProductsType } from "@repo/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<ProductsType> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
const ProductPage = async () => {
    const data = await getData();
    return (
        <div>
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">Payments</h1>
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default ProductPage;
