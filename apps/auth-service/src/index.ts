import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/authMiddleware";
import userRoute from "./routes/user.route";
import { producer } from "./utils/kafka";

const app = express();
const port = 8003;

app.use(
    cors({
        origin: ["http://localhost:3002", "http://localhost:3003"],
        credentials: true,
    })
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.use("/users", shouldBeAdmin, userRoute);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    return res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
});

const start = async () => {
    try {
        await producer.connect();
        app.listen(port, () => {
            console.log(`Auth service is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to start the server:", err);
        process.exit(1);
    }
};

start();
