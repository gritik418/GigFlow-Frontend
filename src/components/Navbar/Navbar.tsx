import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
              GigFlow
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/gigs"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              My Gigs
            </Link>

            <div className="w-px h-6 bg-slate-200" />
            {/* <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.firstName[0]}
                </span>
              </div>
              <span className="font-semibold capitalize text-gray-900">
                {user?.firstName}
              </span>
            </div> */}
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
