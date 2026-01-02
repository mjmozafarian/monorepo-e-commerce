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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { CategoryType, colors, ProductFormSchema, sizes } from "@repo/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const fetchCategories = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return await response.json();
};

const AddProduct = () => {
    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: "",
            shortDescription: "",
            description: "",
            price: 0,
            categorySlug: "",
            sizes: [],
            colors: [],
        },
    });

    const { data } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const { getToken } = useAuth();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
            const token = await getToken();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add product");
            }
        },
        onSuccess: () => {
            toast.success("Product added successfully");
        },
        onError: () => {
            toast.error("Failed to add product");
        },
    });
    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="mb-4">Add Product</SheetTitle>
                <SheetDescription>
                    <Form {...form}>
                        <form
                            className="space-y-8"
                            onSubmit={form.handleSubmit((data) =>
                                mutation.mutate(data)
                            )}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Product Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="A brief description of the product"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A brief description of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Detailed description of the product"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Detailed description of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="100"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The price of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {data && (
                                <FormField
                                    control={form.control}
                                    name="categorySlug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {data.map(
                                                            (
                                                                category: CategoryType
                                                            ) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={
                                                                        category.slug
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                The category of the product.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="sizes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sizes</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                {sizes.map((size) => (
                                                    <div
                                                        key={size}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Checkbox
                                                            id={`size-${size}`}
                                                            checked={field.value?.includes(
                                                                size
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                const currentSizes =
                                                                    field.value ||
                                                                    [];
                                                                if (checked) {
                                                                    field.onChange(
                                                                        [
                                                                            ...currentSizes,
                                                                            size,
                                                                        ]
                                                                    );
                                                                } else {
                                                                    field.onChange(
                                                                        currentSizes.filter(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                s !==
                                                                                size
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label
                                                            className="text-xs"
                                                            htmlFor={`size-${size}`}
                                                        >
                                                            {size}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Select the available sizes.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="colors"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Colors</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4 my-2">
                                                    {colors.map((color) => (
                                                        <div
                                                            key={color}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Checkbox
                                                                id={`color-${color}`}
                                                                checked={field.value?.includes(
                                                                    color
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    const currentColors =
                                                                        field.value ||
                                                                        [];
                                                                    if (
                                                                        checked
                                                                    ) {
                                                                        field.onChange(
                                                                            [
                                                                                ...currentColors,
                                                                                color,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        field.onChange(
                                                                            currentColors.filter(
                                                                                (
                                                                                    c
                                                                                ) =>
                                                                                    c !==
                                                                                    color
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <Label
                                                                className="text-xs flex items-center gap-2"
                                                                htmlFor={`color-${color}`}
                                                            >
                                                                <div
                                                                    className="size-2 rounded-full"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                />
                                                                {color}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Select the available colors.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <div>
                                                {form
                                                    .watch("colors")
                                                    ?.map((color) => (
                                                        <div
                                                            key={color}
                                                            className="mb-4 flex items-center gap-4"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="size-4 rounded-full"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                />
                                                                <span className="text-sm font-medium min-w-20">
                                                                    {color}:
                                                                </span>
                                                            </div>
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={async (
                                                                    e
                                                                ) => {
                                                                    const file =
                                                                        e.target
                                                                            .files?.[0];
                                                                    if (file) {
                                                                        try {
                                                                            const formData =
                                                                                new FormData();
                                                                            formData.append(
                                                                                "file",
                                                                                file
                                                                            );
                                                                            formData.append(
                                                                                "upload_preset",
                                                                                "ecom-monorepo"
                                                                            );

                                                                            const response =
                                                                                await fetch(
                                                                                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                                                                    {
                                                                                        method: "POST",
                                                                                        body: formData,
                                                                                    }
                                                                                );
                                                                            const data =
                                                                                await response.json();
                                                                            if (
                                                                                data.secure_url
                                                                            ) {
                                                                                const currentImages =
                                                                                    form.getValues(
                                                                                        "images"
                                                                                    ) ||
                                                                                    {};
                                                                                form.setValue(
                                                                                    "images",
                                                                                    {
                                                                                        ...currentImages,
                                                                                        [color]:
                                                                                            data.secure_url,
                                                                                    }
                                                                                );
                                                                                toast.success(
                                                                                    `${color} image uploaded successfully`
                                                                                );
                                                                            }
                                                                        } catch (err) {
                                                                            console.error(
                                                                                "Image upload failed",
                                                                                err
                                                                            );
                                                                            toast.error(
                                                                                "Image upload failed"
                                                                            );
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            {field.value?.[
                                                                color
                                                            ] ? (
                                                                <span className="text-green-600 text-sm ">
                                                                    Image
                                                                    selected
                                                                </span>
                                                            ) : (
                                                                <span className="text-red-600 text-sm ">
                                                                    Image
                                                                    required
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutation.isPending
                                    ? "Adding Product..."
                                    : "Add Product"}
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default AddProduct;
