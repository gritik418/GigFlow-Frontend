import { Link } from "react-router-dom";

const DashboardCard = ({
  to,
  title,
  desc,
  gradient,
  icon,
}: {
  to: string;
  title: string;
  desc: string;
  gradient: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link to={to} className="group">
      <div className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div
          className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            {icon}
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
