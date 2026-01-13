import { Link } from "react-router-dom";
import MyGigCard from "../components/MyGigs/MyGigCard";
import { useGetOwnGigsQuery } from "../services/gigsApi";
import { useEffect, useState } from "react";

const MyGigsPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useGetOwnGigsQuery({ search });
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    if (data?.data) {
      setGigs(data.data);
    }
  }, [data]);
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Gigs</h1>

          <Link
            to="/gigs/new"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
          >
            + New Gig
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 w-full">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gigs..."
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 py-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 animate-pulse"
              >
                <div className="flex items-start justify-between">
                  <div className="h-12 bg-linear-to-br w-1/2 from-slate-200 to-slate-300 rounded-2xl mb-6" />
                  <div className="h-6 bg-linear-to-br w-14 from-slate-200 to-slate-300 rounded-sm mb-6" />
                </div>
                <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-6" />
              </div>
            ))}
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-20 px-8">
            <div className="w-24 h-24 mx-auto mb-8 bg-linear-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">
              No gigs yet
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              You haven't posted any gigs yet. Create your first project to
              attract top freelancers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 py-4">
            {gigs.map((gig) => (
              <MyGigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigsPage;
