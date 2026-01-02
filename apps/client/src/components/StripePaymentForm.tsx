"use client";
import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import useCartStore from "@/store/cartStore";
const stripe = loadStripe(
    "pk_test_51SfQZgR8PzD9OjH3hcyaO6CPH3vPv3XMvPLWp3jg3WL6x09rtNyatjhRPOUOw7fzEtkYtadlA5FES11K7w6eu5SN00OoBzf4IS"
);
const fetchClientSecret = async (cart: CartItemsType, token: string) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
        {
            method: "POST",
            body: JSON.stringify({ cart }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => response.json())
        .then((json) => json.checkoutSessionClientSecret);
};
const StripePaymentForm = ({
    shippingForm,
}: {
    shippingForm: ShippingFormInputs;
}) => {
    const { cart } = useCartStore();
    const [token, setToken] = useState<string | null>(null);

    const { getToken } = useAuth();
    useEffect(() => {
        getToken().then((token) => setToken(token));
    }, []);

    if (!token) return <div>Loading ...</div>;
    return (
        <CheckoutProvider
            stripe={stripe}
            options={{
                fetchClientSecret: async () => fetchClientSecret(cart, token),
            }}
        >
            <CheckoutForm shippingForm={shippingForm} />
        </CheckoutProvider>
    );
};

export default StripePaymentForm;
