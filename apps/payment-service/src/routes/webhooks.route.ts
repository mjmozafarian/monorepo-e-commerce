import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webHooksRoute = new Hono();
console.log("Stripe Webhook Secret:", webHookSecret);
webHooksRoute.post("/stripe", async (c) => {
    const body = await c.req.text();
    const sig = c.req.header("stripe-signature") || "";

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
    } catch (err) {
        console.error("Error verifying Stripe webhook signature:", err);
        return c.json({ error: "Webhook signature verification failed" }, 400);
    }
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const lineItems = await stripe.checkout.sessions.listLineItems(
                session.id
            );
            //TODO: Create order in DB
            const metadata = JSON.parse(session.metadata?.cart || "[]");
            console.log("📦 Cart metadata:", metadata);

            // Fetch product images for each item
            const productImages = await Promise.all(
                metadata.map(async (item: { p: number; c: string }) => {
                    try {
                        const url = `${process.env.PUBLIC_PRODUCT_SERVICE_URL}/products/${item.p}`;
                        console.log("🔍 Fetching product from:", url);
                        const res = await fetch(url);
                        console.log("📥 Response status:", res.status);
                        if (res.ok) {
                            const product = await res.json();
                            console.log("🖼️ Product images:", product.images);
                            console.log("🎨 Selected color:", item.c);
                            const image = product.images?.[item.c] || "";
                            console.log("✅ Image found:", image);
                            return image;
                        }
                        console.log("❌ Fetch failed with status:", res.status);
                        return "";
                    } catch (error) {
                        console.log("❌ Fetch error:", error);
                        return "";
                    }
                })
            );
            console.log("🖼️ All product images:", productImages);

            await producer.send("payment.successful", {
                userId: session.client_reference_id,
                email: session.customer_details?.email,
                amount: session.amount_total,
                status:
                    session.payment_status === "paid" ? "success" : "failed",
                products: lineItems.data.map((item, index) => ({
                    productId: metadata[index]?.p || 0,
                    name: item.description,
                    price: item.price?.unit_amount,
                    quantity: item.quantity,
                    size: metadata[index]?.s || "",
                    color: metadata[index]?.c || "",
                    image: productImages[index] || "",
                })),
            });
            console.log("✅ Sent payment.successful event to Kafka");
            break;
        // case "payment_intent.succeeded":
        //     const paymentIntent = event.data.object as Stripe.PaymentIntent;
        //     console.log("Payment Intent Succeeded:", paymentIntent);
        //     // Handle successful payment intent here
        //     break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return c.json({ received: true });
});

export default webHooksRoute;
