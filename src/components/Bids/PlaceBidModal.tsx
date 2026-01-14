"use client";
import { useState, useEffect } from "react";
import { usePlaceBidMutation } from "../../services/bidsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface PlaceBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  gig: Gig;
}

export default function PlaceBidModal({
  isOpen,
  onClose,
  gig,
}: PlaceBidModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [placeBid] = usePlaceBidMutation();
  const [bidAmount, setBidAmount] = useState<number>(gig.budget);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<PlaceBidErrors>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);

      const result = await placeBid({
        message,
        price: Number(bidAmount),
        gigId: gig._id,
      }).unwrap();

      if (result.message) {
        toast.success(result.message);
        navigate("/gigs/explore");
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-120 w-full transform transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } max-h-[90vh] overflow-hidden`}
      >
        <div className="p-4 sm:p-6 pb-2 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Place Your Bid
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Budget:</span>
            <span className="font-bold text-xl text-green-600">
              ₹{gig.budget}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Bid Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  min={1}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-16 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-200 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
              {errors?.price?.errors &&
              typeof errors.price?.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.price?.errors[0]}
                </span>
              ) : null}
            </div>

            <div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  value={message}
                  rows={7}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 resize-none text-sm border-2 border-gray-200 rounded-lg focus:border-blue-200 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  placeholder="Type here."
                />
              </div>

              {errors?.message?.errors &&
              typeof errors.message?.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.message?.errors[0]}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer py-4 px-6 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="flex-1 disabled:cursor-not-allowed cursor-pointer py-4 px-6 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12a1 1 0 011-1h1.25l1.75-4.75A1 1 0 018.5 6h7a1 1 0 01.92.38l1.75 4.75H20a1 1 0 110 2h-1.25l-1.75 4.75a1 1 0 01-.92.62h-7a1 1 0 01-.92-.62L9.75 15H8a1 1 0 01-1-1z"
                    />
                  </svg>
                  Placing Bid...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Place Bid
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
