import OrderItemCard from "@/components/OrderItemCard";
import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrder = async (id: string) => {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch order");
    }
    const data: OrderType = await res.json();
    return data;
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const order = await fetchOrder(id);
    console.log(order);
    return (
        <div>
            <h3 className="text-lg my-4 font-medium">
                Order number: {order._id}
            </h3>
            <div className="space-y-2">
                <p className="">
                    Status:{" "}
                    <span
                        className="font-semibold capitalize"
                        style={{
                            color:
                                order.status === "success"
                                    ? "#06ac6f"
                                    : "#F87171",
                        }}
                    >
                        {order.status}
                    </span>
                </p>
                <p>
                    Total:{" "}
                    <span className="font-semibold">
                        {(Number(order.amount) / 100).toFixed(2)} $
                    </span>
                </p>
                <p>
                    Created at:{" "}
                    <span className="font-semibold">
                        {order.createdAt
                            ? new Date(order.createdAt).toDateString()
                            : "N/A"}
                    </span>
                </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {order.products.map((item) => (
                    <OrderItemCard
                        productId={item.productId}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        size={item.size}
                        color={item.color}
                        image={item.image}
                        key={String(item._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
