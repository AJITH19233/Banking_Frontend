import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiSend, FiList, FiUser, FiLogOut, FiShield } from "react-icons/fi";
import { useState, useEffect } from "react";
import API from "../services/api";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile/");
        setIsAdmin(res.data.is_superuser);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome className="text-xl" /> },
    { path: "/transfer", label: "Transfer", icon: <FiSend className="text-xl" /> },
    { path: "/transactions", label: "Transactions", icon: <FiList className="text-xl" /> },
    { path: "/profile", label: "Profile", icon: <FiUser className="text-xl" /> },
  ];
  
  if (isAdmin) {
    navLinks.push({ path: "/admin", label: "Admin Panel", icon: <FiShield className="text-xl" /> });
  }

  return (
    <div className="w-64 glass border-r border-slate-700/50 min-h-screen flex flex-col pt-6 font-['Outfit'] h-full fixed top-0 left-0 bg-slate-900/80">
      <div className="px-8 pb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-xl">B</span>
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 tracking-tight">NexusBank</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;