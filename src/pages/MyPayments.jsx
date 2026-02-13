import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authContext";

const MyPayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const endpoint = user?.role === "admin" ? "/payments" : "/payments/my";
        const res = await api.get(endpoint);
        setPayments(res.data.data || []);
      } catch (error) {
        console.error(error);
        alert("Failed to load payments");
      }
    };

    fetchPayments();
  }, []);

  return (
    <section className="min-h-screen pt-32 px-6 md:px-12 bg-[#dad4f6] fixed inset-0 overflow-y-auto">

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 pb-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
            {user?.role === "admin" ? "All Payments" : "Payment History"}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            {user?.role === "admin" ? "Monitor all transaction records across the system" : "View and track your transaction history with ease."}
          </p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </div>

        {payments.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-4 shadow-md">
            <div className="text-6xl">🧾</div>
            <p className="text-xl text-slate-600">No payment records found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {payments.map((p) => (
              <div key={p._id} className="bg-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-lg transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Booking ID: <span className="font-mono text-slate-700">{p.booking?._id || "N/A"}</span></p>
                    <p className="text-slate-900 font-medium">{p.method?.toUpperCase() || "CARD"}</p>
                    {user?.role === "admin" && p.user && (
                      <p className="text-xs text-accent font-semibold mt-1">User: {p.user.name} ({p.user.email})</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl font-bold font-serif text-accent">Rs. {p.amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${p.status === 'completed' ? 'bg-green-500/20 text-green-600' :
                    p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-600'
                    }`}>
                    {p.status}
                  </span>
                  <p className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPayments;