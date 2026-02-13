import React from "react";
import { Link, useLocation } from "react-router-dom";

const BookingConfirmation = () => {
    const location = useLocation();
    const { booking, method } = location.state || {}; // method might be undefined if not passed, handle gracefully

    const isManualPayment = ['jazzcash', 'easypaisa', 'bank_transfer'].includes(method);

    return (
        <div className="min-h-screen bg-[#dad4f6] pt-24 px-4 pb-12">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">

                    {/* Header Section */}
                    <div className="bg-white p-6 border-b border-gray-100 text-center">
                        <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Payment Successful</h1>
                        <p className="text-gray-600">Your payment has been successfully received.</p>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 space-y-8">

                        {/* Booking Status Notice */}
                        <div className="bg-blue-50/50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Booking is currently Pending Approval</h3>
                            <div className="space-y-2 text-blue-800">
                                <p>Your booking is currently under review and will be confirmed once approved by the administrator.</p>
                                <p className="font-medium">Please note that room confirmation is not finalized until approval is completed.</p>
                                <p className="text-sm mt-2">Current Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span></p>
                            </div>
                        </div>

                        {/* Booking Details Summary */}
                        {booking && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Booking Reference</p>
                                    <p className="font-mono text-lg text-gray-900">#{booking._id?.slice(-6).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Room</p>
                                    <p className="text-lg text-gray-900">{booking.room?.name || 'Luxury Room'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Amount Paid</p>
                                    <p className="text-lg font-bold text-[#D4AF37]">Rs. {booking.totalAmount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Payment Method</p>
                                    <p className="text-lg text-gray-900 capitalize">{method?.replace('_', ' ') || 'card'}</p>
                                </div>
                            </div>
                        )}

                        {/* Manual Payment Specific Notice */}
                        {isManualPayment && (
                            <div className="text-sm text-gray-500 italic text-center border-t border-gray-100 pt-4">
                                * Payment received via {method === 'bank_transfer' ? 'Bank Transfer' : method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}.
                                Booking approval will be done manually by admin.
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link
                                to="/payments/my"
                                className="inline-flex justify-center items-center px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-lg hover:bg-[#c09e32] transition duration-300 shadow-md hover:shadow-lg"
                            >
                                View My Bookings
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex justify-center items-center px-8 py-3 bg-white text-gray-600 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
