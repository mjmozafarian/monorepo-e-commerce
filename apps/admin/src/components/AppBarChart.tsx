"use client";
// const chartData = [
//     { month: "January", total: 186, successful: 80 },
//     { month: "February", total: 305, successful: 200 },
//     { month: "March", total: 237, successful: 120 },
//     { month: "April", total: 173, successful: 100 },
//     { month: "May", total: 209, successful: 130 },
//     { month: "June", total: 214, successful: 140 },
// ];

import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
    ChartTooltip,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { OrderChartType } from "@repo/types";
import { use } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
    total: {
        label: "Total",
        color: "var(--chart-1)",
    },
    successful: {
        label: "Successful",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

const AppBarChart = ({
    dataPromise,
}: {
    dataPromise: Promise<OrderChartType[]>;
}) => {
    const chartData = use(dataPromise);
    return (
        <div>
            <h1 className="text-lg mb-6 font-medium">Total Revenue</h1>
            <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
            >
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />

                    <Bar dataKey="total" fill="var(--chart-1)" radius={4} />
                    <Bar
                        dataKey="successful"
                        fill="var(--chart-2)"
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default AppBarChart;
