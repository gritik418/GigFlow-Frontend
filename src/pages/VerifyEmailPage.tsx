import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "../services/authApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import type { AppDispatch } from "../app/store";
import userApi from "../services/userApi";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

type VerificationDataType = {
  email: string;
  emailSent: boolean;
};

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [verify] = useVerifyEmailMutation();
  const [resendOtp] = useResendOtpMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(""));
      inputsRef.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (!canResend) {
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [canResend]);

  const handleBackToRegister = () => {
    sessionStorage.removeItem("gigflow_verification");
    navigate("/register");
  };

  const handleResend = async () => {
    if (!canResend) return;
    if (!email) {
      toast.error("Invalid session. Please register again.");
      sessionStorage.removeItem("gigflow_verification");
      navigate("/register");
      return;
    }

    try {
      const result = await resendOtp({ email }).unwrap();

      if (result.message) {
        toast.success(result.message);
      }
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }

    setCooldown(RESEND_COOLDOWN);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await verify({
        email,
        otp: otp.join(""),
      }).unwrap();

      if (result.message) {
        toast.success(result.message);
        sessionStorage.removeItem("gigflow_verification");

        dispatch(userApi.util.invalidateTags(["User"]));
        navigate("/");
      }
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storage = sessionStorage.getItem("gigflow_verification");
    if (storage) {
      const parsedData = JSON.parse(storage) as VerificationDataType;
      if (parsedData.emailSent && parsedData.email) {
        setEmail(parsedData.email);
      } else {
        sessionStorage.clear();
        navigate("/register");
      }
    } else {
      sessionStorage.clear();
      navigate("/register");
    }
  }, [navigate]);

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-50 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-14 w-24 rounded-xl bg-indigo-800 flex items-center justify-center text-white font-bold text-xl">
              GigFlow
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Verify your email
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter the 6-digit OTP sent to{" "}
              <span className="font-semibold">{email}</span>
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="h-12 w-12 text-black rounded-lg border border-slate-300 bg-white text-center text-lg font-semibold focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700/20 transition"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isOtpComplete || loading}
            className="w-full cursor-pointer disabled:cursor-not-allowed rounded-lg bg-indigo-700 py-3 text-sm font-semibold text-white hover:bg-indigo-800 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className="font-medium cursor-pointer text-indigo-700 hover:text-indigo-800 disabled:text-slate-400 disabled:cursor-not-allowed transition"
            >
              {canResend ? "Resend OTP" : `Resend in ${cooldown}s`}
            </button>

            <button
              onClick={handleBackToRegister}
              className="text-slate-600 hover:text-slate-800 transition"
            >
              Register
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} GigFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
