import { useState } from "react";
import { useHireFreelancerMutation } from "../../services/bidsApi";
import toast from "react-hot-toast";

type PropsType = {
  bid: Bid;
  gig: Gig;
};

const BidCard = ({ bid, gig }: PropsType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hire] = useHireFreelancerMutation();

  const handleSubmit = async (bidId: string) => {
    try {
      setLoading(true);
      const result = await hire(bidId).unwrap();
      if (result.message) {
        toast.success(result.message);
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

  return (
    <div
      key={bid._id}
      className="bg-white/70 flex flex-col backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/50 overflow-hidden h-full"
    >
      <div className="flex flex-col h-full px-8 py-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-gray-700 to-blue-900 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">
                {bid.freelancerId.firstName[0]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xl text-slate-900 truncate">
                {bid.freelancerId.firstName} {bid.freelancerId.lastName}
              </h3>
              <p className="text-sm text-slate-500 truncate">
                {bid.freelancerId.email}
              </p>
            </div>
          </div>
          <div className="shrink-0"></div>
        </div>

        <p className="text-slate-700 flex-1 mb-6 leading-relaxed overflow-auto prose prose-sm max-h-full">
          {bid.message}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
          <span className="text-sm text-slate-500">
            Status:
            <span className="capitalize font-semibold ml-1">{bid.status}</span>
          </span>
          {gig.status === "open" && bid.status === "pending" && (
            <button
              disabled={loading}
              onClick={() => handleSubmit(bid._id)}
              className="bg-linear-to-r disabled:cursor-not-allowed cursor-pointer from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl hover:from-emerald-700 active:scale-95 transition-all duration-200"
            >
              {loading ? <>Processing...</> : "Hire Freelancer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidCard;
