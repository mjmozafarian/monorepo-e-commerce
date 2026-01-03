import { consumer } from "./kafka";
import { createStripeProduct, deleteStripeProduct } from "./stripeProducts";

export const runKafkaSubscriptions = async () => {
    consumer.subscribe([
        {
            topicName: "product.created",
            topicHandler: async (message) => {
                const product = message.value;
                console.log("Received product.created event:", product);
                await createStripeProduct({
                    ...product,
                    price: product.price * 100,
                });
            },
        },
        {
            topicName: "product.deleted",
            topicHandler: async (message) => {
                const id = message.value;
                await deleteStripeProduct(id);
            },
        },
    ]);
};
