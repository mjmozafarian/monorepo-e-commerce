import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
const app = express();
const port = 8000;

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

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
    const auth = getAuth(req);
    const userId = auth.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ message: "This is a test endpoint.", userId: req.userId });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    return res
        .status(err.status || 500)
        .json({ error: err.message || "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Product service is running at http://localhost:${port}`);
});
