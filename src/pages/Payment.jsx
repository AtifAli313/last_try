import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import JazzCashLogo from "../assets/Logos/Jazzcash-logo.png";
import EasypaisaLogo from "../assets/Logos/Easypaisa-logo.png";
import CardLogo from "../assets/Logos/Card-logo.png";
import BankLogo from "../assets/Logos/Bank-logo.png";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState("card");
  const [error, setError] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  // Mock Card State
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get("/bookings/my");
        const bookings = res.data.data || [];
        const found = bookings.find((b) => b._id === bookingId);

        if (!found) {
          setError("Booking not found");
          setLoading(false);
          return;
        }

        // If already confirmed (paid), redirect to success
        if (found.status === "confirmed") {
          navigate("/payments/my"); // Or some other appropriate page
          return;
        }

        setBooking(found);
      } catch (err) {
        console.error(err);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchBooking();
  }, [bookingId, token, navigate]);

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    // Simple validation
    if (method === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
      setError("Please fill in all card details");
      setProcessing(false);
      return;
    }

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (["jazzcash", "easypaisa", "bank_transfer"].includes(method)) {
        if (!receiptFile) {
          setError("Please upload a transaction receipt screenshot");
          setProcessing(false);
          return;
        }

        const formData = new FormData();
        formData.append("method", method);
        formData.append("receipt", receiptFile);

        await api.post(`/payments/manual/${bookingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

      } else {
        await api.post(`/payments/${bookingId}`, {
          method,
        });
      }

      // Navigate to confirmation with booking state
      navigate("/booking-success", { state: { booking: booking, method: method } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-red-600 mb-4">Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/rooms')} className="mt-4 text-[#D4AF37] hover:underline">Back to Rooms</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#dad4f6] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-7xl mx-auto space-y-12 mb-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Complete Payment</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Review your booking details and choose your preferred payment method to finalize your stay.
            </p>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Booking Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit order-2 md:order-1">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-700">Booking Summary</h2>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500 block">Room Type</span>
                <span className="text-lg font-medium text-[#0D1B2A]">
                  {booking.room?.name || "Luxury Suite"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block uppercase tracking-wide">Check-in</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block uppercase tracking-wide">Check-out</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium text-gray-900">{booking.guests} Adults</span>
              </div>

              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Nights</span>
                <span className="font-medium text-gray-900">
                  {Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
                <span className="text-lg font-bold text-gray-800">Total Due</span>
                <span className="text-2xl font-bold text-[#D4AF37]">Rs. {booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 order-1 md:order-2">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-700">Payment Details</h2>

            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handlePay} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Select Payment Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', name: 'Card', image: CardLogo },
                    { id: 'jazzcash', name: 'JazzCash', image: JazzCashLogo },
                    { id: 'easypaisa', name: 'EasyPaisa', image: EasypaisaLogo },
                    { id: 'bank_transfer', name: 'Bank', image: BankLogo }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 h-28 ${method === m.id
                        ? "border-[#D4AF37] bg-yellow-50/50 shadow-md ring-1 ring-[#D4AF37]"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}
                    >
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          className="h-10 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-2xl">{m.icon}</span>
                      )}
                      <span className="font-bold text-xs uppercase mt-1">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CARD PAYMENT FORM */}
              {method === "card" && (
                <div className="space-y-4 animate-fade-in p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-600">Credit / Debit Card</span>
                    <div className="flex gap-2">
                      <div className="h-6 w-9 bg-gray-200 rounded"></div>
                      <div className="h-6 w-9 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="0000 0000 0000 0000"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        placeholder="123"
                        value={cardDetails.cvc}
                        onChange={handleCardChange}
                        className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* LOCAL WALLETS / BANK TRANSFER INFO */}
              {["jazzcash", "easypaisa", "bank_transfer"].includes(method) && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-yellow-50/50 border border-yellow-200 rounded-xl p-6 text-sm text-yellow-900 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">ℹ️</span>
                      <div>
                        <p className="font-bold text-base mb-1">Payment Instructions:</p>
                        <ul className="list-disc list-inside space-y-1 text-yellow-800">
                          {method === 'jazzcash' && (
                            <>
                              <li>Transfer amount to JazzCash Number: <strong>0300-1234567</strong></li>
                              <li>Account Title: <strong>Gangs Sengy GH</strong></li>
                            </>
                          )}
                          {method === 'easypaisa' && (
                            <>
                              <li>Transfer amount to EasyPaisa Number: <strong>0345-1234567</strong></li>
                              <li>Account Title: <strong>Gangs Sengy GH</strong></li>
                            </>
                          )}
                          {method === 'bank_transfer' && (
                            <>
                              <li>Bank: <strong>HBL (Habib Bank Limited)</strong></li>
                              <li>Account: <strong>1234 5678 9012 34</strong></li>
                              <li>Title: <strong>Gangs Sengy Guest House</strong></li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Upload Transaction Receipt</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#D4AF37] transition-all bg-white group">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setReceiptFile(e.target.files[0])}
                        id="receipt-upload"
                      />
                      <div className="space-y-2">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">📸</div>
                        <p className="text-sm font-medium text-gray-600">
                          {receiptFile ? <span className="text-[#D4AF37] font-bold">{receiptFile.name}</span> : "Click to upload your payment screenshot"}
                        </p>
                        <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c09e32] transition duration-300 shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 transform active:scale-95"
              >
                {processing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{method === 'card' ? 'Pay Now' : 'Submit for Verification'}</span>
                    <span className="opacity-70">|</span>
                    <span>Rs. {booking.totalAmount}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure 256-bit Encrypted Payment</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;