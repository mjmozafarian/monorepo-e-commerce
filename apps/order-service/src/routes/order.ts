import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";
import { startOfMonth, subMonths } from "date-fns";
import { OrderChartType } from "@repo/types";
import { now } from "mongoose";
export const orderRoute = async (fastify: FastifyInstance) => {
    fastify.get(
        "/user-orders",
        { preHandler: shouldBeUser },
        async (request, reply) => {
            const orders = await Order.find({ userId: request.userId });
            return reply.send(orders);
        }
    );

    fastify.get(
        "/orders",
        { preHandler: shouldBeAdmin },
        async (request, reply) => {
            const { limit } = request.query as { limit?: number };
            const orders = await Order.find()
                .limit(limit ? limit : 0)
                .sort({ createdAt: -1 });
            return reply.send(orders);
        }
    );

    fastify.get(
        "/orders/:id",
        { preHandler: shouldBeUser },
        async (request, reply) => {
            console.log("Fetching order details");
            const { id } = request.params as { id: string };
            const order = await Order.findById(id);
            return reply.send(order);
        }
    );

    fastify.get(
        "/order-chart",
        { preHandler: shouldBeAdmin },
        async (request, reply) => {
            const now = new Date();
            const sixMonthsAgo = startOfMonth(subMonths(now, 5));

            const raw = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sixMonthsAgo, $lte: now },
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" },
                        },
                        total: { $sum: 1 },
                        successful: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        successful: 1,
                        total: 1,
                        month: "$_id.month",
                        year: "$_id.year",
                    },
                },
                { $sort: { year: 1, month: 1 } },
            ]);

            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            const results: OrderChartType[] = [];

            for (let i = 5; i >= 0; i--) {
                const date = subMonths(now, i);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const record = raw.find(
                    (r: any) => r.month === month && r.year === year
                );

                results.push({
                    month: monthNames[month - 1] as string,
                    total: record ? record.total : 0,
                    successful: record ? record.successful : 0,
                });
            }

            return reply.send(results);
        }
    );
};
