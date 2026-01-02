"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@clerk/nextjs/server";
// export type User = {
//     id: string;
//     avatar: string;
//     status: "active" | "inactive";
//     fullName: string;
//     email: string;
// };

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                checked={row.getIsSelected()}
            />
        ),
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="size-9 relative">
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName || user.username || "User Avatar"}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex flex-col gap-1">
                    {user.firstName || user.username || "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            return <div>{user.emailAddresses[0]?.emailAddress || "-"}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            const status = user.banned ? "banned" : "active";
            return (
                <div
                    className={cn(
                        `p-1 rounded-md w-max text-sm`,
                        status === "active" && "bg-green-500/40",
                        status === "banned" && "bg-red-500/40"
                    )}
                >
                    {status as string}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(user.id)
                            }
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/users/${user.id}`}>
                                View customer
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
