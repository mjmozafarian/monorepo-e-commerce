const OrderItemCard = ({
    name,
    quantity,
    price,
}: {
    name: string;
    quantity: number;
    price: number;
}) => {
    return (
        <div>
            <p>{name}</p>
            <p className="text-sm text-gray-500">Quantity: {quantity}</p>
            <p className="text-sm text-gray-500">
                Unit Price: {(price / 100 / quantity).toFixed(2)} $
            </p>
            <p className="text-sm text-gray-500">
                Total Price: {(price / 100).toFixed(2)} $
            </p>
        </div>
    );
};

export default OrderItemCard;
