import OrderCard from "@/components/OrderCard";
import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }
    const data: OrderType[] = await res.json();
    return data;
};
const OrdersPage = async () => {
    const orders = await fetchOrders();

    if (orders.length === 0) {
        return <div>No orders found.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl my-4 font-medium">Your Orders</h1>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {orders.map((order) => (
                    <OrderCard order={order} key={order._id} />
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
