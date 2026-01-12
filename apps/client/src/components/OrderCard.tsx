import { OrderType } from "@repo/types";
import Link from "next/link";

const OrderCard = ({ order }: { order: OrderType }) => {
    const statusColor = order.status === "success" ? "#34D399" : "#F87171"; // Tailwind's emerald-400 color for success, red-400 for others
    const createdAt =order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";
    return (
        <li className="bg-background rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md border-gray-900/10">
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <p
                        className="text-primary-600 font-mono text-sm font-semibold uppercase"
                        title={`Order ID: ${order._id}`}
                    >
                        {order._id}
                    </p>
                    <p
                        className="text-muted-foreground mt-1 text-xs"
                        title={`Order placed on ${createdAt}`}
                    >
                        {createdAt}
                    </p>
                </div>
                <span
                    className="inline-block rounded px-2 py-1 text-xs font-semibold"
                    style={{ backgroundColor: statusColor }}
                    title={`Order status: ${order.status}`}
                >
                    {order.status}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <p
                    className="text-lg font-semibold"
                    title={`Total amount: ${order.amount} €`}
                >
                    {(Number(order.amount) / 100).toFixed(2)} €
                </p>
                <Link
                    href={`/orders/${order._id}`}
                    className="text-primary-600 rounded text-sm transition-colors hover:underline"
                    aria-label={`View details for order ${order._id}`}
                >
                    View Details
                </Link>
            </div>
        </li>
    );
};

export default OrderCard;
