import Image from "next/image";
import Link from "next/link";

const OrderItemCard = ({
    productId,
    name,
    quantity,
    price,
    size,
    color,
    image,
}: {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
    image: string;
}) => {
    return (
        <div className="flex gap-2 border rounded-lg flex-col w-full overflow-hidden hover:shadow-lg transition-shadow">
            {image && (
                <Link href={`/products/${productId}`}>
                    <div className="relative aspect-10/11 w-full">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>
            )}
            <div className="p-4 space-y-2 font-semibold">
                <Link href={`/products/${productId}`}>
                    <p className="font-medium text-lg hover:underline">
                        {name}
                    </p>
                </Link>
                <p>Size: {size.toUpperCase()}</p>
                <p className="flex items-center gap-2">
                    <span>Color:</span>
                    <span
                        className="inline-block size-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                    />
                </p>
                <p>Quantity: {quantity}</p>
                <p>Unit Price: {(price / 100 / quantity).toFixed(2)} $</p>
                <p>Total: {(price / 100).toFixed(2)} $</p>
            </div>
        </div>
    );
};

export default OrderItemCard;
