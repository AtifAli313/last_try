import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import Button from "../components/ui/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      const token = res.data.token || res.data.accessToken;
      const user = res.data.user;

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      login(token, user);

      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#dad4f6] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-md relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-3xl font-extrabold text-center mb-2 font-heading text-slate-900">Welcome Back</h2>
          <p className="text-center text-slate-600 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="w-full bg-white/50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <Button disabled={loading} className="w-full py-3 text-lg">
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-slate-600 mt-4">
              Don’t have an account? {" "}
              <Link to="/register" className="text-accent font-bold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
