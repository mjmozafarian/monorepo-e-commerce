import Image from "next/image";

const OrderItemCard = ({
    name,
    quantity,
    price,
    size,
    color,
    image,
}: {
    name: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
    image: string;
}) => {
    return (
        <div className="flex gap-2 border rounded-lg flex-col w-full overflow-hidden">
            {image && (
                <div className="relative aspect-2/3 w-full">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-4 space-y-2 font-semibold">
                <p className="font-medium text-lg">{name}</p>
                <p>Size: {size.toUpperCase()}</p>
                <p className="flex items-center gap-1">
                    <span>Color:</span>
                    <span
                        className="inline-block w-3 h-3 rounded-full"
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
