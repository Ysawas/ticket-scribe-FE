import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white bg-primary rounded-full p-2 hover:bg-primary/80"
      >
        <FaUserCircle size={24} />
        <span className="font-semibold">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 bg-white text-black shadow-lg rounded w-40 z-50">
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
