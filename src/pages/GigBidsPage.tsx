import { Link, useParams } from "react-router-dom";
import { useGetGigByIdQuery } from "../services/gigsApi";
import { useEffect, useState } from "react";
import {
  useGetBidsQuery,
  useHireFreelancerMutation,
} from "../services/bidsApi";
import toast from "react-hot-toast";

const GigBidsPage = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hire] = useHireFreelancerMutation();
  const { data, isLoading, error } = useGetGigByIdQuery(gigId || "");
  const {
    data: bidsData,
    isLoading: isBidsLoading,
    error: bidsError,
  } = useGetBidsQuery(gigId || "");

  useEffect(() => {
    if (data?.data) {
      setGig(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (bidsData?.data) {
      setBids(bidsData.data);
    }
  }, [bidsData]);

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

  if (isLoading || isBidsLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !gig || bidsError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Gig Not Found
          </h2>
          <Link
            to="/gigs"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
          >
            Back to Gigs
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {gig.title}
            </h1>
            <p className="text-slate-600 mt-1">
              Budget: ${gig.budget.toLocaleString()} |{" "}
              {bids?.length ? bids.length : 0} bids
            </p>
          </div>
        </div>

        {bids && bids?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bids.map((bid) => (
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
                          {bid.freelancerId.firstName}{" "}
                          {bid.freelancerId.lastName}
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
                      <span className="capitalize font-semibold ml-1">
                        {bid.status}
                      </span>
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
            ))}
          </div>
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-8 bg-white/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 text-center">
            <div className="w-28 h-28 mx-auto mb-8 bg-linear-to-br from-slate-200 via-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg
                className="w-16 h-16 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
              No bids yet
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Your gig is live and waiting for talented freelancers to place
              their bids. They'll discover it soon through our marketplace!
            </p>
            <div className="flex flex-col sm:flex-row gap-4"></div>
            <p className="text-sm text-slate-500 mt-6">
              💡 Tip: Higher budgets and clear descriptions attract more bids
              faster
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigBidsPage;
