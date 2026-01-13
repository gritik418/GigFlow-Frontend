import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading] = useState(false);

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
    if (cooldown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = () => {
    if (!canResend) return;

    // Call resend otp api

    setCooldown(RESEND_COOLDOWN);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  };

  /* ---------------- UI ---------------- */

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
              Enter the 6-digit OTP sent to your email
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

            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-800 transition"
            >
              Back to login
            </Link>
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
