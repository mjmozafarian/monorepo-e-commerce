import { Kafka } from "kafkajs";

export const createKafkaClient = (service: string) => {
    return new Kafka({
        clientId: service,
        brokers: ["kafka:9094", "kafka:9095", "kafka:9096"],
    });
};
