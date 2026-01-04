import { StripeProductType } from "@repo/types";
import stripe from "./stripe";

export const createStripeProduct = async (item: StripeProductType) => {
    try {
        // Convert price from dollars to cents (Stripe expects integer in cents)
        const priceInCents = Math.round(item.price * 100);

        const res = await stripe.products.create({
            id: item.id,
            name: item.name,
            default_price_data: {
                currency: "usd",
                unit_amount: priceInCents,
            },
        });
        console.log("Stripe product created:", res);
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
        // First, remove the default price from the product
        await stripe.products.update(String(productId), {
            default_price: "",
        });

        // Get all prices for this product
        const prices = await stripe.prices.list({
            product: String(productId),
        });

        // Archive all prices
        for (const price of prices.data) {
            await stripe.prices.update(price.id, { active: false });
        }

        // Finally, archive the product
        const res = await stripe.products.update(String(productId), {
            active: false,
        });
        return res;
    } catch (error) {
        console.error("Error deleting Stripe product:", error);
        return error;
    }
};
