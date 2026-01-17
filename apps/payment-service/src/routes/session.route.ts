import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProducts";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
    const { cart }: { cart: CartItemsType } = await c.req.json();
    const userId = c.get("userId");
    const lineItems = await Promise.all(
        cart.map(async (item) => {
            const unitAmount = await getStripeProductPrice(
                item.stripeProductId || item.id || ""
            );
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: unitAmount as number,
                },
                quantity: item.quantity,
            };
        })
    );
    // Prepare cart metadata for order creation (minimal data to stay under 500 chars)
    const cartMetadata = cart.map((item) => ({
        p: item.id, // productId (shortened key)
        s: item.selectedSize,
        c: item.selectedColor,
    }));
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            client_reference_id: userId,
            mode: "payment",
            ui_mode: "custom",
            return_url:
                "http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}",
            metadata: {
                cart: JSON.stringify(cartMetadata),
            },
        });
        return c.json({ checkoutSessionClientSecret: session.client_secret });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return c.json({ error: "Failed to create checkout session" }, 500);
    }
});

sessionRoute.get("/:session_id", async (c) => {
    const { session_id } = c.req.param();
    const session = await stripe.checkout.sessions.retrieve(
        session_id as string,
        {
            expand: ["line_items"],
        }
    );

    return c.json({
        status: session.status,
        paymentStatus: session.payment_status,
    });
});

export default sessionRoute;
