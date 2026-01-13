import { Link } from "react-router-dom";

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-slate-200 text-slate-700",
  draft: "bg-indigo-100 text-indigo-700",
};

const MyGigCard = ({ gig }: { gig: any }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{gig.title}</h3>

          <p className="mt-1 text-sm text-slate-500">
            Budget: <span className="font-medium">${gig.budget}</span>
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Created on {gig.createdAt}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[gig.status]
          }`}
        >
          {gig.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        <Link
          to={`/gigs/${gig.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View
        </Link>

        <Link
          to={`/gigs/${gig.id}/edit`}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default MyGigCard;
