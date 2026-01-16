import { auth } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { OrderType } from "@repo/types";

const getData = async (): Promise<OrderType[]> => {
    try {
        const { getToken } = await auth();
        const token = await getToken();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
};
const OrdersPage = async () => {
    const data = await getData();
    return (
        <div>
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">Orders</h1>
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default OrdersPage;
