import { Scale } from "lucide-react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // API call

    setLoading(false);
  };

  return (
    <div className="relative  h-[600px]  w-full bg-[#1C1C1C] flex items-center justify-center px-2">
      <div
        className="relative w-full max-w-md rounded-2xl p-7"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 18px 32px rgba(0,0,0,0.5)",
        }}
      >
       <div className="flex items-center justify-center gap-3 mb-8">
         {/* Logo */}
     <div
      className="w-12 h-12 rounded-xl flex items-center  justify-center"
      style={{
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      }}
     >
     <Scale className="text-neutral-950" size={26} />
    </div>

  {/* Text */}
  <div className="flex flex-col items-center justify-center">
       <h1 className="text-3xl font-semibold text-neutral-200 ">
      LegalMitra
      </h1>
        <p className="text-sm text-neutral-500 mt-1">
      AI Legal Assistant
       </p>
   </div>
   </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-neutral-300 text-xs mb-1.5">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full text-neutral-300 rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-neutral-500 border transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.16)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.16)")
              }
            />
          </div>

          <div>
            <label className="block text-neutral-300 text-xs mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full text-white rounded-lg px-4 py-2.5 pr-11 text-sm outline-none placeholder:text-neutral-500 border transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.16)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.16)")
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/55 hover:text-white transition"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <FaRegEye size={16} />
                ) : (
                  <FaRegEyeSlash size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className=" w-full bg-neutral-950 text-neutral-200 hover:bg-neutral-700 transition font-medium text-sm rounded-lg py-2.5 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-xs mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-neutral-300 font-medium hover:text-blue-500 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;