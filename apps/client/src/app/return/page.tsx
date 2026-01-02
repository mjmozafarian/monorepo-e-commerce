import Link from "next/link";

const ReturnPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string }> | undefined;
}) => {
    const session_id = (await searchParams)?.session_id;
    console.log("Session ID in Return Page:", session_id);

    if (!session_id) {
        return <div>No session ID provided.</div>;
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`
    );
    const data = await res.json();
    console.log("Checkout Session Data:", data);

    return (
        <div>
            <h1>Payment {data.status}</h1>
            <p>Payment Status: {data.paymentStatus}</p>
            <Link href="/orders">See your orders</Link>
        </div>
    );
};

export default ReturnPage;
