import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import Button from "../components/ui/Button";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", form);

      const token = res.data.token || res.data.accessToken;
      const user = res.data.user;

      if (!token) {
        setError("Token not received from backend");
        setLoading(false);
        return;
      }

      login(token, user);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#dad4f6] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-md relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-3xl font-extrabold text-center mb-2 font-heading text-slate-900">Create Account</h2>
          <p className="text-center text-slate-600 mb-8">Join us for a premium experience</p>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                placeholder="John Doe"
                required
                onChange={handleChange}
                className="w-full bg-white/50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                onChange={handleChange}
                className="w-full bg-white/50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                onChange={handleChange}
                className="w-full bg-white/50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <Button disabled={loading} className="w-full py-3 text-lg">
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <p className="text-center text-slate-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
