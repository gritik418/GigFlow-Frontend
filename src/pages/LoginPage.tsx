import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-50 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-24 rounded-xl bg-indigo-800 flex items-center justify-center text-white font-bold text-xl shadow-md">
              GigFlow
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Sign in to continue to GigFlow
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg cursor-pointer bg-indigo-700 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-800 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px w-full bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-700 hover:text-indigo-800 transition"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} GigFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
};
