import Fastify from "fastify";
import cors from "@fastify/cors";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";
const fastify = Fastify();

fastify.register(cors, {
    origin: ["http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
});

fastify.register(clerkPlugin);
fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
    return reply.send({
        message: `Hello User ${request.userId}`,
        userId: request.userId,
    });
});

fastify.register(orderRoute);
const start = async () => {
    try {
        console.log("🔵 Connecting to Order DB and Kafka...");
        await Promise.all([
            connectOrderDB(),
            producer.connect(),
            consumer.connect(),
        ]);
        console.log("✅ Connected to Order DB and Kafka");
        await runKafkaSubscriptions();
        await fastify.listen({ port: 8001 });
        console.log("✅ Order service is running on port 8001");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
