import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to send message. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (submitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (submitted && countdown === 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [submitted, countdown, navigate]);

  if (submitted) {
    return (
      <section className="min-h-screen pt-48 px-6 flex flex-col items-center bg-[#dad4f6]">
        <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl max-w-2xl w-full shadow-2xl border border-white/50 text-center space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Thank You</h2>
            <p className="text-slate-600 max-w-md mx-auto text-lg font-light">
              We have received your message. Our team will review your inquiry and get back to you shortly.
            </p>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg text-sm uppercase tracking-wider"
            >
              Home Now
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setCountdown(3);
                setForm({ name: "", email: "", message: "" });
              }}
              className="px-8 py-3 bg-white text-slate-900 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm text-sm uppercase tracking-wider"
            >
              New Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 px-6 bg-[#dad4f6]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-4xl font-bold text-slate-900">Get in Touch</h2>
          <p className="text-slate-600">
            Have questions about your stay? We're here to help. Send us a message and we'll respond shortly.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-slate-700">
              <span className="text-accent">📍</span>
              <p>GSGS CMH Road Gamba, Skardu</p>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <span className="text-accent">📞</span>
              <p>+92 341 9020068</p>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <span className="text-accent">✉️</span>
              <p>info@gangssengy.com</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-slate-900 h-32 focus:border-accent focus:outline-none transition resize-none"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-accent text-primary py-3 rounded-lg font-bold hover:bg-yellow-500 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;