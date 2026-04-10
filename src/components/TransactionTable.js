import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

function TransactionTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-slate-400">
        No recent transactions found.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/30 text-slate-400 text-sm border-b border-slate-700/50">
              <th className="py-4 px-6 font-medium">Type</th>
              <th className="py-4 px-6 font-medium">Amount</th>
              <th className="py-4 px-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {transactions.map((t, index) => {
              const isCredit = t.type === 'credit' || parseFloat(t.amount) > 0; // Assuming positive is credit, or type is provided later natively
              return (
                <tr key={index} className="hover:bg-slate-700/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCredit ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {isCredit ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                      </div>
                      <span className="font-medium text-slate-200">Transfer</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 font-medium ${isCredit ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {isCredit ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      t.status?.toLowerCase() === 'completed' || !t.status
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {t.status || 'Completed'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
