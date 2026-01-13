import { Link } from "react-router-dom";

const MyGigCard = ({ gig }: { gig: Gig }) => {
  return (
    <Link
      to={`/gigs/${gig._id}`}
      className="rounded-2xl cursor-pointer border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{gig.title}</h3>

          <p className="mt-1 text-sm text-slate-500">
            Budget: <span className="font-medium">${gig.budget}</span>
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Created on:{" "}
            {new Date(gig.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <span
          className={`rounded-sm px-1 py-1 text-[10px] uppercase text-gray-600 bg-gray-200 font-semibold `}
        >
          {gig.status}
        </span>
      </div>
    </Link>
  );
};

export default MyGigCard;
