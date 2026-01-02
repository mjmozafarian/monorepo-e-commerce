import type { Kafka, Producer } from "kafkajs";
import { connect } from "node:http2";
export const createProducer = (kafka: Kafka) => {
    const producer: Producer = kafka.producer();

    const connect = async () => {
        await producer.connect();
    };

    const send = async (topic: string, message: object) => {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
            acks: 1,
        });
    };

    const disconnect = async () => {
        await producer.disconnect();
    };

    return {
        connect,
        send,
        disconnect,
    };
};
