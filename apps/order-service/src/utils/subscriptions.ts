import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
    consumer.subscribe([
        {
            topicName: "payment.successful",
            topicHandler: async (message) => {
                await createOrder(message);
            },
        },
    ]);
};
