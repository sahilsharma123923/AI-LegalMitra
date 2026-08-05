import { Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("legalmitra_token", data.access_token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to login right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c1c] px-4 py-8">
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 18px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <Scale className="text-neutral-400" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-neutral-200 leading-none">
              LegalMitra
            </h1>

            <p className="mt-1 text-sm text-neutral-500">AI Legal Assistant</p>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-400 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-neutral-300 mb-1 pl-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-neutral-300 placeholder:text-neutral-500 outline-none transition focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1 pl-2">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-neutral-300 placeholder:text-neutral-500 outline-none transition focus:border-neutral-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-xl hover:text-neutral-950 w-full rounded-xl bg-neutral-900 py-3 text-neutral-300 font-medium transition hover:bg-neutral-500 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-neutral-200 font-medium hover:text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;