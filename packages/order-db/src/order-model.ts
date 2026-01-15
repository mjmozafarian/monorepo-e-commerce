import mongoose, { InferSchemaType } from "mongoose";
const { Schema, model, models } = mongoose;

export const OrderStatus = ["success", "failed"] as const;
const orderSchema = new Schema(
    {
        userId: { type: String, required: true },
        email: { type: String, required: true },
        amount: { type: String, required: true },
        status: { type: String, required: true, enum: OrderStatus },
        products: {
            type: [
                {
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    price: { type: Number, required: true },
                    size: { type: String, required: true },
                    color: { type: String, required: true },
                    image: { type: String, required: true },
                },
            ],
            required: true,
        },
    },
    { timestamps: true }
);

export type OrderSchemaType = InferSchemaType<typeof orderSchema>;
export const Order = model<OrderSchemaType>("Order", orderSchema);
