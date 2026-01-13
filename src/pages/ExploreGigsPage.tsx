import { useEffect, useState } from "react";
import GigCard from "../components/Gigs/GigCard";
import { useGetGigsQuery } from "../services/gigsApi";

const ExploreGigsPage: React.FC = () => {
  const { data, isLoading } = useGetGigsQuery();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data?.data) {
      setGigs(data.data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Find Your Next Gig
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
            Browse thousands of freelance projects. Web dev, design, marketing,
            and more. Start bidding on high-quality gigs today.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gigs by title, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-24 py-5 text-lg rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-slate-900 font-semibold"
              />
              <svg
                className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 animate-pulse"
              >
                <div className="h-36 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl mb-6 animate-pulse" />

                <div className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded-lg w-4/5 mb-4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-3/5 mb-4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-2/5 animate-pulse" />

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                      <div className="h-4 bg-slate-200 rounded w-20" />
                    </div>
                    <div className="h-10 bg-slate-200 rounded-xl w-24 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {gigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {gigs.map((gig) => (
                <GigCard key={gig._id.toString()} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <svg
                className="w-24 h-24 mx-auto mb-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-6l-3 3-3-3"
                />
              </svg>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No gigs found
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Try adjusting your search terms or filters. New gigs are added
                every minute.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreGigsPage;
