import { PaymentFormInputs, PaymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
const PaymentForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormInputs>({
        resolver: zodResolver(PaymentFormSchema),
    });

    const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (
        data: PaymentFormInputs
    ) => {};
    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handlePaymentForm)}
        >
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name"
                    className="text-sm text-gray-500 font-medium"
                >
                    Name on card
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="name"
                    {...register("cardHolder")}
                    type="text"
                    placeholder="John Doe"
                />
                {errors.cardHolder && (
                    <p className="text-red-500 text-xs">
                        {errors.cardHolder.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="cardNumber"
                    className="text-sm text-gray-500 font-medium"
                >
                    Card Number
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="cardNumber"
                    {...register("cardNumber")}
                    type="text"
                    placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && (
                    <p className="text-red-500 text-xs">
                        {errors.cardNumber.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="expirationDate"
                    className="text-sm text-gray-500 font-medium"
                >
                    Expiration Date
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="expirationDate"
                    {...register("expirationDate")}
                    type="text"
                    placeholder="MM/YY"
                />
                {errors.expirationDate && (
                    <p className="text-red-500 text-xs">
                        {errors.expirationDate.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="cvv"
                    className="text-sm text-gray-500 font-medium"
                >
                    CVV
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="cvv"
                    {...register("cvv")}
                    type="text"
                    placeholder="123"
                />
                {errors.cvv && (
                    <p className="text-red-500 text-xs">{errors.cvv.message}</p>
                )}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <Image
                    src="/klarna.png"
                    alt="Payment Methods"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
                <Image
                    src="/cards.png"
                    alt="Payment Methods"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
                <Image
                    src="/stripe.png"
                    alt="Payment Methods"
                    width={50}
                    height={25}
                    className="rounded-md"
                />
            </div>
            <button
                type="submit"
                className="bg-gray-800 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 cursor-pointer"
            >
                Check out
                <ShoppingCart className="size-4" />
            </button>
        </form>
    );
};

export default PaymentForm;
