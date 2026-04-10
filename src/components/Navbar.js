import React, { useState, useEffect } from "react";
import { FiBell, FiCheck } from "react-icons/fi";
import API from "../services/api";

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // Polling every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications/?unread=true");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.post(`/notifications/${id}/read/`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-20 glass-card mx-8 mt-6 mb-8 px-6 flex items-center justify-between sticky top-6 z-40 bg-slate-900/50">
      <div>
        <h2 className="text-xl font-bold text-white tracking-wide">Overview</h2>
        <p className="text-sm text-slate-400">Welcome to your dashboard</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 flex items-center justify-center transition-all relative"
          >
            <FiBell className="text-slate-300 text-lg" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-slate-900"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-3 w-80 glass-card p-4 rounded-xl shadow-2xl border-slate-700/50 z-50">
              <h3 className="text-white font-semibold mb-3">Notifications</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-4">No new notifications</p>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 flex justify-between gap-3 group">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{notif.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                      </div>
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 hover:text-blue-300 h-fit p-1 bg-blue-500/10 rounded"
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-l border-slate-700/50 pl-6">
          <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-indigo-400/30 flex items-center justify-center">
            <span className="text-white font-medium text-sm">US</span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-white leading-tight">User Account</p>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;