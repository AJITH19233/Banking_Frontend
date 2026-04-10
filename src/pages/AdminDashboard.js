import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import API from "../services/api";
import { FiUsers, FiDollarSign, FiActivity, FiCreditCard } from "react-icons/fi";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/admin/");
      setData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Unauthorized. Secure Superuser Access Required.");
      } else {
        setError("Failed to load dashboard data. Assuming disconnected.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-slate-950 min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 min-h-screen font-['Outfit']">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Navbar />
        
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
            <p className="text-slate-400 mt-1">Global monitoring and control center</p>
          </div>

          {error ? (
            <GlassCard className="border-red-500/30 bg-red-500/10 items-center justify-center py-12">
              <FiActivity className="text-4xl text-red-400 mb-4" />
              <h2 className="text-xl font-bold text-red-400">{error}</h2>
            </GlassCard>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border-indigo-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg">
                      <FiUsers className="text-indigo-400 text-xl" />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium">Total Users</h3>
                  <p className="text-3xl font-bold text-white mt-1">{data.metrics.total_users}</p>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border-emerald-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                      <FiCreditCard className="text-emerald-400 text-xl" />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium">Total Accounts</h3>
                  <p className="text-3xl font-bold text-white mt-1">{data.metrics.total_accounts}</p>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <FiActivity className="text-blue-400 text-xl" />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium">Tx Volume</h3>
                  <p className="text-3xl font-bold text-white mt-1">{data.metrics.total_transactions}</p>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <FiDollarSign className="text-purple-400 text-xl" />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium">Total Value</h3>
                  <p className="text-3xl font-bold text-white mt-1">
                    ${parseFloat(data.metrics.total_volume).toLocaleString()}
                  </p>
                </GlassCard>
              </div>

              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Global Activity</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700/50 text-slate-400 text-sm">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">From User</th>
                        <th className="pb-3 font-medium">To User</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {data.recent_global_activity.map((tx, idx) => (
                        <tr key={idx} className="border-b border-slate-700/20 last:border-0 hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 text-slate-300">
                            {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}
                          </td>
                          <td className="py-4 font-medium text-white">{tx.from}</td>
                          <td className="py-4 font-medium text-white">{tx.to}</td>
                          <td className="py-4 font-semibold text-blue-400">${parseFloat(tx.amount).toLocaleString()}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                              tx.status === 'failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                              'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {data.recent_global_activity.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-slate-500">
                            No recent activity found on the network.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
