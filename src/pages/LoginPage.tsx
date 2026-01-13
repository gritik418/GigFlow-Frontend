import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authApi";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<LoginResponseErrors>>({});
  const [loginData, setLoginData] = useState<LoginData>({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      const result = await login(loginData).unwrap();
      if (result.message) {
        toast.success(result.message);
        navigate("/");
      }
    } catch (error: any) {
      if (error?.data?.errors) {
        setErrors(error.data.errors);
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-50 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-8">
          <div className="text-center mb-4">
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

          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email or Username
              </label>
              <input
                name="identifier"
                value={loginData.identifier}
                type="text"
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
              />

              {errors?.identifier?.errors &&
              typeof errors.identifier.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.identifier.errors[0]}
                </span>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  value={loginData.password}
                  name="password"
                  onChange={handleChange}
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
              {errors?.password?.errors &&
              typeof errors.password?.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.password?.errors[0]}
                </span>
              ) : null}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-2 rounded-lg cursor-pointer bg-indigo-700 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-800 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px w-full bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-700 hover:text-indigo-800 transition"
            >
              Register
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

export default LoginPage;
