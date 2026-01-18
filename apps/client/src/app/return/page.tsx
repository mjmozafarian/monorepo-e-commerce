import Link from "next/link";
import { CheckCircle, XCircle, Clock, Package, ArrowRight } from "lucide-react";

const ReturnPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string }> | undefined;
}) => {
    const session_id = (await searchParams)?.session_id;

    if (!session_id) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center p-8 bg-gray-50 rounded-2xl max-w-md">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Invalid Session
                    </h1>
                    <p className="text-gray-600 mb-6">
                        No session ID was provided. Please try your purchase
                        again.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Return to Shop
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
    );
    const data = await res.json();

    const isSuccess = data.paymentStatus === "paid";
    const isPending = data.paymentStatus === "unpaid" || data.status === "open";

    return (
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                {/* Status Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div
                        className={`p-8 text-center ${
                            isSuccess
                                ? "bg-gradient-to-br from-green-50 to-emerald-50"
                                : isPending
                                  ? "bg-gradient-to-br from-yellow-50 to-amber-50"
                                  : "bg-gradient-to-br from-red-50 to-rose-50"
                        }`}
                    >
                        {isSuccess ? (
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        ) : isPending ? (
                            <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                        ) : (
                            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                        )}

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {isSuccess
                                ? "Payment Successful!"
                                : isPending
                                  ? "Payment Pending"
                                  : "Payment Failed"}
                        </h1>
                        <p className="text-gray-600">
                            {isSuccess
                                ? "Thank you for your purchase. Your order is being processed."
                                : isPending
                                  ? "Your payment is still being processed. Please wait."
                                  : "There was an issue with your payment. Please try again."}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">
                                Session Status
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    data.status === "complete"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {data.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">
                                Payment Status
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    data.paymentStatus === "paid"
                                        ? "bg-green-100 text-green-700"
                                        : data.paymentStatus === "unpaid"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                }`}
                            >
                                {data.paymentStatus}
                            </span>
                        </div>

                        {data.customerEmail && (
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Email</span>
                                <span className="text-gray-900 font-medium">
                                    {data.customerEmail}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-gray-50 space-y-3">
                        <Link
                            href="/orders"
                            className="flex items-center justify-center gap-2 w-full bg-black text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Package className="w-5 h-5" />
                            View Your Orders
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 px-6 py-3.5 rounded-full font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Need help?{" "}
                    <Link
                        href="/contact"
                        className="text-black underline hover:no-underline"
                    >
                        Contact our support team
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ReturnPage;
