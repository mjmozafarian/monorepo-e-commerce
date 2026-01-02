import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import stripe from "./utils/stripe.js";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webHooksRoute from "./routes/webhooks.route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";
const app = new Hono();
app.use("*", clerkMiddleware());
app.use(
    "*",
    cors({
        origin: ["http://localhost:3001", "http://localhost:3002"],
    })
);
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.route("/sessions", sessionRoute);
app.route("/webhooks", webHooksRoute);

app.get("/stripe-product-price", async (c) => {
    const res = await stripe.prices.list({
        product: "prod_12345",
    });
    return c.json(res);
});

const start = async () => {
    try {
        Promise.all([await producer.connect(), await consumer.connect()]);
        console.log(
            "Kafka producer and consumer connected successfully for Payment Service."
        );
        await runKafkaSubscriptions();
        serve(
            {
                fetch: app.fetch,
                port: 8002,
            },
            (info) => {
                console.log(`Payment Service is running on port 8002`);
            }
        );
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

start();
