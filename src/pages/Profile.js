import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiUser, FiMail, FiPhone, FiAlertCircle } from "react-icons/fi";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/profile/")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        <Navbar />

        <div className="px-8 pb-10 z-10 animate-fade-in max-w-4xl mx-auto w-full">
          <div className="mb-8 items-center gap-4 hidden">
            <h2 className="text-2xl font-semibold text-white">Your Profile</h2>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : user ? (
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-700/50">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/20">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900">
                    <span className="text-4xl font-bold text-white tracking-widest">{user.username?.substring(0, 2).toUpperCase() || "US"}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                    {user.username}
                  </h3>
                  <div className="flex items-center gap-2 text-indigo-400 font-medium">
                    <span className="px-3 py-1 bg-indigo-500/10 rounded-full text-xs border border-indigo-500/20">Active Member</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Contact Information</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/30">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <FiMail />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Email Address</p>
                          <p className="text-sm text-slate-200 font-medium">{user.email || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/30">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <FiUser />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Username</p>
                          <p className="text-sm text-slate-200 font-medium">{user.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Security Settings</h4>
                    <div className="bg-slate-900/30 p-5 rounded-xl border border-slate-700/30">
                      <div className="flex items-start gap-4 mb-4">
                        <FiAlertCircle className="text-amber-500 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-slate-300 font-medium mb-1">Security Dashboard</p>
                          <p className="text-xs text-slate-500">Enable Two-Factor Authentication to keep your account safe.</p>
                        </div>
                      </div>
                      <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700 w-full mt-2">
                        Manage Security
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-slate-400">
              User details could not be loaded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
