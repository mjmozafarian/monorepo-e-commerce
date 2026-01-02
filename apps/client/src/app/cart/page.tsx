"use client";

import ShippingForm from "@/components/ShippingForm";
import StripePaymentForm from "@/components/StripePaymentForm";
import useCartStore from "@/store/cartStore";
import { ShippingFormInputs } from "@repo/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
    { id: 1, title: "Shopping Cart" },
    { id: 2, title: "Shopping Address" },
    { id: 3, title: "Payment Method" },
];

const CartPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeStep = parseInt(searchParams.get("step") || "1");
    const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
    const { cart, removeFromCart } = useCartStore();
    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
            {/* TITLE */}
            <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
            {/* STEPS */}
            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`flex items-center gap-2 border-b-2 pb-4 ${
                            activeStep === step.id
                                ? "border-gray-800"
                                : "border-gray-200"
                        }`}
                    >
                        <div
                            className={`size-6 rounded-full text-white flex items-center justify-center ${
                                activeStep === step.id
                                    ? "bg-gray-800 "
                                    : "bg-gray-400 "
                            }`}
                        >
                            {step.id}
                        </div>
                        <p
                            className={`text-sm font-medium ${
                                activeStep === step.id
                                    ? "text-gray-800 "
                                    : "text-gray-400 "
                            }`}
                        >
                            {step.title}
                        </p>
                    </div>
                ))}
            </div>
            {/* STEPS & DETAILS */}
            <div className="w-full flex flex-col lg:flex-row gap-16">
                {/* STEPS */}
                <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
                    {activeStep === 1 ? (
                        cart.map((item) => (
                            // SINGLE CART ITEM
                            <div
                                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                className="flex items-center justify-between"
                            >
                                {/* IMAGE AND DETAILS */}
                                <div className="flex gap-8">
                                    {/* IMAGE */}
                                    <div className="relative size-32 bg-gray-50 rounded-lg overflow-hidden">
                                        <Image
                                            src={
                                                (
                                                    item.images as Record<
                                                        string,
                                                        string
                                                    >
                                                )?.[item.selectedColor]
                                            }
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    {/* DETAILS */}
                                    <div className="flex flex-col justify-between">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Size:{" "}
                                                {item.selectedSize.toUpperCase()}
                                            </p>
                                            <p className="capitalize text-xs text-gray-500">
                                                Color: {item.selectedColor}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                {/* DELETE BUTTON */}
                                <button
                                    onClick={() => removeFromCart(item)}
                                    className="size-8 rounded-full bg-red-100 text-red-400 flex items-center justify-center hover:bg-red-200 transition-all duration-300 cursor-pointer"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        ))
                    ) : activeStep === 2 ? (
                        <ShippingForm setShippingForm={setShippingForm} />
                    ) : activeStep === 3 && shippingForm ? (
                        <StripePaymentForm shippingForm={shippingForm} />
                    ) : (
                        <p className="text-sm text-gray-500">
                            Please complete the shipping form first.
                        </p>
                    )}
                </div>
                {/* DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-fit">
                    <h2 className="font-semibold">Cart Details</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Subtotal</p>
                            <p className=" font-medium">
                                $
                                {cart
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Discount (10%)</p>
                            <p className=" font-medium">$ 10.00</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Shipping Fee</p>
                            <p className=" font-medium">$ 10.00</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <p className="text-gray-800 font-semibold">Total</p>
                            <p className=" font-medium">
                                $
                                {cart
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </p>
                        </div>
                    </div>
                    {activeStep === 1 && (
                        <button
                            onClick={() =>
                                router.push("/cart?step=2", { scroll: false })
                            }
                            className="bg-gray-800 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 cursor-pointer"
                        >
                            Continue <ArrowRight className="size-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
