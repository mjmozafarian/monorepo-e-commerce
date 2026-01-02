import { ShippingFormInputs, ShippingFormSchema } from "@repo/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
const ShippingForm = ({
    setShippingForm,
}: {
    setShippingForm: (data: ShippingFormInputs) => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormInputs>({
        resolver: zodResolver(ShippingFormSchema),
    });

    const router = useRouter();

    const handleShippingForm: SubmitHandler<ShippingFormInputs> = (
        data: ShippingFormInputs
    ) => {
        console.log("Shipping Form Data:", data);
        setShippingForm(data);
        router.push("/cart?step=3", { scroll: false });
    };
    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleShippingForm)}
        >
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name"
                    className="text-sm text-gray-500 font-medium"
                >
                    Name
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name"
                    className="text-sm text-gray-500 font-medium"
                >
                    Email
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="email"
                    {...register("email")}
                    type="text"
                    placeholder="john.doe@example.com"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="phone"
                    className="text-sm text-gray-500 font-medium"
                >
                    Phone
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="phone"
                    {...register("phone")}
                    type="text"
                    placeholder="John Doe"
                />
                {errors.phone && (
                    <p className="text-red-500 text-xs">
                        {errors.phone.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="name"
                    className="text-sm text-gray-500 font-medium"
                >
                    Address
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="address"
                    {...register("address")}
                    type="text"
                    placeholder="John Doe"
                />
                {errors.address && (
                    <p className="text-red-500 text-xs">
                        {errors.address.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="city"
                    className="text-sm text-gray-500 font-medium"
                >
                    City
                </label>
                <input
                    className="border border-gray-200 rounded-md py-2 outline-none text-sm px-3 focus:border-black transition-all duration-300"
                    id="city"
                    {...register("city")}
                    type="text"
                    placeholder="John Doe"
                />
                {errors.city && (
                    <p className="text-red-500 text-xs">
                        {errors.city.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-gray-800 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 cursor-pointer"
            >
                Continue
                <ArrowRight className="size-4" />
            </button>
        </form>
    );
};

export default ShippingForm;
