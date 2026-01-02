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

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters long")
        .max(50),
    email: z.email("Invalid email address"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits long")
        .max(15, "Phone number must be at most 15 digits long"),
    address: z.string().min(2).max(100),
    city: z.string().min(2).max(100),
});
const EditUser = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "Jon Doe",
            email: "jon.doe@example.com",
            phone: "380123456789",
            address: "123 Main St",
            city: "New York",
        },
    });
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Edit User Information</SheetTitle>
                <SheetDescription>
                    <Form {...form}>
                        <form className="space-y-8">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jon Doe"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="jon.doe@example.com"
                                                {...field}
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+1 234 567 8901"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your phone number for contact.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123 Main St"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your phone number for contact.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="New York, USA"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Your city for contact.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default EditUser;
