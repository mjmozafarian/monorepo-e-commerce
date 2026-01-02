import sendEmail from "./utils/mailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";
const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");
const start = async () => {
    try {
        await consumer.subscribe([
            {
                topicName: "user.created",
                topicHandler: async (message) => {
                    const { userName, emailAddress } = message.value;
                    if (emailAddress) {
                        const subject = "Welcome to Mjm E-Commerce!";
                        const text = `Hello ${userName},\n\nThank you for registering at Mjm E-Commerce. We're excited to have you on board!\n\nBest regards,\nMjm E-Commerce Team`;
                        await sendEmail({ to: emailAddress, subject, text });
                    }
                },
            },
            {
                topicName: "order.created",
                topicHandler: async (message) => {
                    const { email, amount, status } = message.value;
                    if (email) {
                        const subject = "Your Order Confirmation";
                        const text = `Hello,\n\nThank you for your order of amount ${amount / 100} at Mjm E-Commerce. Your order status is ${status}.\n\nBest regards,\nMjm E-Commerce Team`;
                        await sendEmail({ to: email, subject, text });
                    }
                },
            },
        ]);
    } catch (err) {
        console.error("WARNING ⛔️: Failed to start the server:", err);
    }
};

start();
