import { useEffect, useState, type ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import { useRegisterMutation } from "../services/authApi";
import toast from "react-hot-toast";

const SignupPage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<RegisterResponseErrors>>({});
  const [signupData, setSignupData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      const result = await register(signupData).unwrap();
      if (result.message) {
        toast.success(result.message);
        sessionStorage.setItem(
          "gigflow_verification",
          JSON.stringify({
            email: signupData.email,
            emailSent: true,
          })
        );
        navigate("/verify-email");
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

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (sessionStorage.getItem("gigflow_verification")) {
      navigate("/verify-email");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-50 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-8">
          <div className="text-center mb-4">
            <div className="mx-auto h-14 w-24 rounded-xl bg-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
              GigFlow
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Join GigFlow and start collaborating
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First name
                </label>
                <input
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="John"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
                />
                {errors?.firstName?.errors &&
                typeof errors.firstName?.errors[0] === "string" ? (
                  <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                    {errors.firstName?.errors[0]}
                  </span>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
                />
                {errors?.lastName?.errors &&
                typeof errors.lastName?.errors[0] === "string" ? (
                  <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                    {errors.lastName?.errors[0]}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                name="username"
                value={signupData.username}
                onChange={handleChange}
                type="text"
                placeholder="username"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
              />
              {errors?.username?.errors &&
              typeof errors.username?.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.username?.errors[0]}
                </span>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
              />
              {errors?.email?.errors &&
              typeof errors.email?.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.email?.errors[0]}
                </span>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={signupData.password}
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

                {errors?.password?.errors &&
                typeof errors.password?.errors[0] === "string" ? (
                  <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                    {errors.password?.errors[0]}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="passwordConfirmation"
                  value={signupData.passwordConfirmation}
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

                {errors?.passwordConfirmation?.errors &&
                typeof errors.passwordConfirmation?.errors[0] === "string" ? (
                  <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                    {errors.passwordConfirmation?.errors[0]}
                  </span>
                ) : null}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-2 disabled:cursor-not-allowed cursor-pointer rounded-lg bg-indigo-700 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-800 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px w-full bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-700 hover:text-indigo-800 transition"
            >
              Sign in
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

export default SignupPage;
