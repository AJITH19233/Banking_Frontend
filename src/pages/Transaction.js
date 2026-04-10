import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";
import GlassCard from "../components/GlassCard";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setLoading(true);
    API.get(`/transactions/?type=${activeTab}`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [activeTab]);

  const tabs = [
    { id: "all", label: "All Transactions" },
    { id: "sent", label: "Money Sent" },
    { id: "received", label: "Money Received" }
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative overflow-hidden">
        <div className="absolute top-[30%] right-[20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />
        <Navbar />

        <div className="px-8 pb-10 z-10 w-full max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Transaction History</h2>
            <p className="text-slate-400">View all your incoming and outgoing transfers</p>
          </div>

          <div className="flex gap-2 mb-6 bg-slate-800/40 p-1 rounded-xl w-fit border border-slate-700/50">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <GlassCard className="p-0">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="p-6">
                <TransactionTable transactions={transactions} />
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
