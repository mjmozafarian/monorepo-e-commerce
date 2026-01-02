import { StripeProductType } from "@repo/types";
import stripe from "./stripe";

export const createStripeProduct = async (item: StripeProductType) => {
    try {
        const res = await stripe.products.create({
            id: item.id,
            name: item.name,
            default_price_data: {
                currency: "usd",
                unit_amount: item.price,
            },
        });
        return res;
    } catch (error) {
        console.error("Error creating Stripe product:", error);
        return error;
    }
};

export const getStripeProductPrice = async (productId: number | string) => {
    try {
        const res = await stripe.prices.list({
            product: String(productId),
        });
        return res.data[0]?.unit_amount;
    } catch (error) {
        console.error("Error ⛔️ getting Stripe product price:", error);
        return error;
    }
};

export const deleteStripeProduct = async (productId: number | string) => {
    try {
        const res = await stripe.products.del(String(productId));
        return res;
    } catch (error) {
        console.error("Error deleting Stripe product:", error);
        return error;
    }
};
