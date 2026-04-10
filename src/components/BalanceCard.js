import { FiTrendingUp } from "react-icons/fi";

function BalanceCard({ account }) {
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-[20px] group-hover:bg-blue-400/30 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Account Number</p>
            <p className="text-slate-200 tracking-wider font-mono bg-slate-900/50 px-2 py-1 rounded inline-block text-sm">
              {account.account_number || "**** 1234"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <FiTrendingUp className="text-blue-400 text-xl" />
          </div>
        </div>

        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ₹{account.balance?.toLocaleString() || "0.00"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
