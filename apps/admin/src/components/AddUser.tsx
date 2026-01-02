"use client";
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserFormSchema } from "@repo/types";

const AddUser = () => {
    const form = useForm<z.infer<typeof UserFormSchema>>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            emailAddress: [""],
            password: "",
        },
    });

    const { getToken } = useAuth();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
            const token = await getToken();

            // Transform data to match Clerk's API format
            const clerkData = {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.userName,
                email_address: data.emailAddress,
                password: data.password,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVICE_URL}/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(clerkData),
                }
            );
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to add user");
            }
        },
        onSuccess: () => {
            toast.success("User added successfully");
        },
        onError: () => {
            toast.error("Failed to add user");
        },
    });

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add User</SheetTitle>
                <SheetDescription>
                    <Form {...form}>
                        <form
                            className="space-y-8"
                            onSubmit={form.handleSubmit((data) => {
                                mutation.mutate(data);
                            })}
                        >
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jon"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="JonDoe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Addresses</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="jon.doe@example.com, jane.doe@example.com"
                                                {...field}
                                                onChange={(e) => {
                                                    const emails =
                                                        e.target.value
                                                            .split(",")
                                                            .map((email) =>
                                                                email.trim()
                                                            );
                                                    field.onChange(emails);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your email address for contact.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your password for authentication.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="disabled:text-gray-500 disabled:"
                            >
                                {mutation.isPending
                                    ? "Submitting..."
                                    : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default AddUser;
