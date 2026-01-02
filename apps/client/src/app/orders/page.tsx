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
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li key={order._id} className="flex items-center mb-4">
                        <div className="w-1/4">
                            <span className="font-medium text-sm text-gray-500">
                                Order ID
                            </span>
                            <p className="mb-1 font-mono">{order._id}</p>
                        </div>
                        <div className="w-1/12">
                            <span className="font-medium text-sm text-gray-500">
                                Total
                            </span>
                            <p className="mb-1 font-mono">
                                {Number(order.amount) / 100}
                            </p>
                        </div>
                        <div className="w-1/12">
                            <span className="font-medium text-sm text-gray-500">
                                Status
                            </span>
                            <p className="mb-1 font-mono">{order.status}</p>
                        </div>
                        <div className="w-1/8">
                            <span className="font-medium text-sm text-gray-500">
                                Date
                            </span>
                            <p className="mb-1 font-mono">
                                {order.createdAt
                                    ? new Date(
                                          order.createdAt
                                      ).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-sm text-gray-500">
                                Products
                            </span>
                            <p className="mb-1 font-mono">
                                {order.products
                                    ?.map((product) => product.name)
                                    .join(", ")}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
