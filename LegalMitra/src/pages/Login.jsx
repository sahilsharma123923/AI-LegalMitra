import { Scale } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c1c] px-4">
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
        {/* Header */}
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

            <p className="mt-1 text-sm text-neutral-500">
              AI Legal Assistant
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1 pl-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-neutral-300 placeholder:text-neutral-500 outline-none transition focus:border-neutral-500"
            />
          </div>

          <button
            type="submit"
            className=" text-xl hover:text-neutral-950 w-full rounded-xl bg-neutral-900 py-3 text-neutral-300 font-medium transition hover:bg-neutral-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-neutral-400 mt-4">
     Don't have an account?{" "}
    <Link
    to="/signup"
    className="text-neutral-200 font-medium hover:text-blue-500 underline"
    >
    Sign up
     </Link>
    </p>
      </div>
    </div>
  );
};

export default Login;