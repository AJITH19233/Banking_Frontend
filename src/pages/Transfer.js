import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import { FiArrowRight, FiCheckCircle, FiUserPlus, FiStar } from "react-icons/fi";

function Transfer() {
  const [data, setData] = useState({ from_account: "", to_account: "", amount: "" });
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  
  const [newBenData, setNewBenData] = useState({ name: "", account_number: "" });
  const [benStatus, setBenStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    API.get("/accounts/").then(res => setAccounts(res.data)).catch(console.error);
    API.get("/beneficiaries/").then(res => setBeneficiaries(res.data)).catch(console.error);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await API.post("/transactions/transfer/", data);
      setStatus({ type: "success", message: "Transfer completed successfully!" });
      setData({ ...data, amount: "", to_account: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.error || "Transfer failed." });
    }
    setLoading(false);
  };

  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    setBenStatus({ type: "", message: "" });
    try {
      await API.post("/beneficiaries/", newBenData);
      setBenStatus({ type: "success", message: "Added!" });
      setNewBenData({ name: "", account_number: "" });
      fetchData();
    } catch (err) {
      setBenStatus({ type: "error", message: err.response?.data?.account_number?.[0] || "Failed to add." });
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <Navbar />

        <div className="px-8 pb-10 z-10 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Transfer Funds</h2>
                <p className="text-slate-400">Send money instantly to other accounts.</p>
              </div>

              <GlassCard>
                {status.message && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                    {status.type === 'success' && <FiCheckCircle className="text-xl" />}
                    <p>{status.message}</p>
                  </div>
                )}

                <form onSubmit={handleTransfer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">From Account</label>
                      <select 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
                        value={data.from_account}
                        onChange={(e) => setData({ ...data, from_account: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select Account</option>
                        {accounts.map(acc => (
                          <option key={acc.id || acc.account_number} value={acc.account_number}>
                            {acc.account_number} (₹{acc.balance})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Recipient Account Number</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
                        placeholder="Enter account number" 
                        value={data.to_account}
                        onChange={(e) => setData({ ...data, to_account: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Amount (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                      <input 
                        type="number" 
                        min="1"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-4 text-2xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
                        placeholder="0.00" 
                        value={data.amount}
                        onChange={(e) => setData({ ...data, amount: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50 flex justify-end">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-70"
                    >
                      {loading ? 'Processing...' : 'Transfer Now'}
                      {!loading && <FiArrowRight />}
                    </button>
                  </div>
                </form>
              </GlassCard>
            </div>

            {/* Beneficiaries Sidebar */}
            <div className="lg:col-span-1 space-y-6 mt-16">
              <GlassCard className="p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><FiStar className="text-yellow-400"/> Beneficiaries</h3>
                
                {beneficiaries.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No saved payees found.</p>
                ) : (
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    {beneficiaries.map(ben => (
                      <button
                        key={ben.id}
                        type="button"
                        onClick={() => setData({ ...data, to_account: ben.account_number })}
                        className="w-full text-left p-3 rounded-lg bg-slate-800/30 hover:bg-indigo-500/10 border border-slate-700/50 hover:border-indigo-500/30 transition-all flex justify-between items-center group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400">{ben.name}</p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{ben.account_number}</p>
                        </div>
                        <FiArrowRight className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-700/50">
                  <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"><FiUserPlus /> Add Beneficiary</h4>
                  {benStatus.message && (
                    <p className={`text-xs mb-3 ${benStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{benStatus.message}</p>
                  )}
                  <form onSubmit={handleAddBeneficiary} className="space-y-3">
                    <input
                      type="text"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                      placeholder="Name (e.g. John Doe)"
                      value={newBenData.name}
                      onChange={e => setNewBenData({ ...newBenData, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                      placeholder="Account Number"
                      value={newBenData.account_number}
                      onChange={e => setNewBenData({ ...newBenData, account_number: e.target.value })}
                      required
                    />
                    <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 rounded-lg border border-slate-600 transition-colors">
                      Save Payee
                    </button>
                  </form>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;