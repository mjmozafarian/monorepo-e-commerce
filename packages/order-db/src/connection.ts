import mongoose from "mongoose";
let isConnected = false;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
}

export const connectOrderDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB successfully");
        isConnected = true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
