import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/dashboard/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex bg-[#0f172a] min-h-screen text-white">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-[#0f172a] text-slate-200">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <Navbar />

        <div className="px-8 pb-10 z-10 animate-fade-in">
          {/* Top section: Balance Cards */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6">Your Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.accounts?.length > 0 ? (
                data.accounts.map((acc, index) => (
                  <BalanceCard key={index} account={acc} />
                ))
              ) : (
                <div className="glass-card p-6 text-slate-400">No accounts found.</div>
              )}
            </div>
          </div>

          {/* Bottom section: Transactions */}
          <div>
            <TransactionTable transactions={data?.recent_transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;