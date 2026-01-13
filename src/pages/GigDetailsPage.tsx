import { Link, useParams } from "react-router-dom";
import { useGetGigByIdQuery } from "../services/gigsApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

const GigDetailsPage = () => {
  const { gigId } = useParams();
  const { data, error, isLoading } = useGetGigByIdQuery(gigId || "");
  const [gig, setGig] = useState<Gig | null>(null);
  const user = useSelector(selectUser);

  const isOwner: boolean = gig?.ownerId?._id === user?._id;

  const isOpen = gig?.status === "open";

  useEffect(() => {
    if (data?.data) {
      setGig(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !gig) {
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/50 shadow-2xl mb-12">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="lg:flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                    {gig?.title}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-600 mb-4">
                    <span className="text-3xl font-bold text-emerald-600">
                      ${gig?.budget}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {gig?.ownerId?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {gig?.ownerId?.firstName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {gig?.ownerId?.email}
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-slate-700 leading-relaxed">
                  {gig?.description}
                </p>
              </div>

              <div className="flex items-center mt-12 justify-center">
                <div className="space-y-4">
                  {isOwner && (
                    <Link
                      to={`/gigs/${gigId}/bids`}
                      className="w-80 block bg-linear-to-r cursor-pointer from-emerald-600 to-emerald-700 text-white py-5 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:from-emerald-700 transition-all duration-300 text-center"
                    >
                      View Bids
                    </Link>
                  )}

                  {!isOwner && isOpen && (
                    <div className="bg-blue-900 text-center cursor-pointer text-white py-5 px-8 rounded-3xl font-black text-xl shadow-2xl">
                      Place Bid
                    </div>
                  )}

                  {!isOpen && (
                    <div className="text-center py-6 w-80 bg-gray-200 mx-auto rounded-2xl">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-2xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        Gig Closed
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailsPage;
