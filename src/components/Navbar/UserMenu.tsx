import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/authApi";
import userApi from "../../services/userApi";

const UserMenu = ({ user }: { user: UserInterface | null }) => {
  const [open, setOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();

      toast.success(result.message);
      dispatch(userApi.util.invalidateTags(["User"]));
      navigate("/login");

      setOpen(false);
    } catch {
      toast.error("Logout failed. Try again.");
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
      >
        <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user?.firstName[0]}
          </span>
        </div>
        <span className="font-semibold capitalize text-gray-900">
          {user?.firstName}
        </span>
      </div>

      {open && (
        <div className="absolute left-0 mt-2 w-36 bg-white shadow-lg rounded-xl py-2 z-50">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
