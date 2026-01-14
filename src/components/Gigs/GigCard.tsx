import { Link } from "react-router-dom";

const GigCard = ({ gig }: { gig: Gig }) => {
  const isOpen = gig.status === "open";

  return (
    <Link
      to={`/gigs/${gig._id}`}
      className="group cursor-pointer bg-white flex flex-col rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-2 max-w-sm mx-auto"
    >
      <div className="relative h-48 w-full flex flex-col overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border ${
              isOpen
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-orange-100 text-orange-800 border-orange-200"
            }`}
          >
            {gig.status.toUpperCase()}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-bold text-slate-800 shadow-lg border border-slate-200">
          <div className="flex items-baseline gap-1">
            <span className="text-slate-500">$</span>
            <span className="text-2xl font-black">{gig.budget}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-slate-300 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>

      <div className="p-6 flex flex-1 flex-col">
        <h3 className="font-black text-xl leading-tight text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-700 transition-all duration-200">
          {gig.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
          {gig.description}
        </p>

        <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              Remote
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {new Date(gig.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 text-sm truncate">
              Project Owner
            </p>
            <p className="text-xs text-slate-500">
              {gig.ownerId.firstName} {gig.ownerId.lastName}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          disabled={!isOpen}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 border-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed ${
            isOpen
              ? "bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
              : "bg-linear-to-r from-slate-200 to-slate-300 text-slate-700 hover:from-slate-300 hover:to-slate-400"
          }`}
        >
          {isOpen ? "Place Bid" : "Gig Assigned"}
        </button>
      </div>
    </Link>
  );
};

export default GigCard;
