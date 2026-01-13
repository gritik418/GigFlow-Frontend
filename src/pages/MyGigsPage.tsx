import { Link } from "react-router-dom";
import MyGigCard from "../components/MyGigs/MyGigCard";

export const dummyGigs: Gig[] = [];
const MyGigsPage = () => {
  //   const gigs = [];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Gigs</h1>

          <Link
            to="/gigs/new"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
          >
            + New Gig
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="text"
            placeholder="Search gigs..."
            className="w-full max-w-xs rounded-lg border border-slate-300 px-4 py-2 text-sm"
          />
        </div>

        {/* Gig List */}
        {dummyGigs.length === 0 ? (
          //   <EmptyState />
          <div>nothin</div>
        ) : (
          <div className="space-y-4">
            {dummyGigs.map((gig) => (
              <MyGigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigsPage;
