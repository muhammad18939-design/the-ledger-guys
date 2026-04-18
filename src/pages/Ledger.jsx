import React from 'react';
import { Download, Filter } from 'lucide-react';

const dummyLedger = [
  { id: 1, date: '2026-04-10', desc: 'Raw Material Purchase', cat: 'Inventory', type: 'Expense', amount: 45000 },
  { id: 2, date: '2026-04-12', desc: 'Wholesale Order #102', cat: 'Sales', type: 'Income', amount: 120000 },
  { id: 3, date: '2026-04-15', desc: 'Electricity Bill', cat: 'Utilities', type: 'Expense', amount: 18000 },
  { id: 4, date: '2026-04-16', desc: 'Direct Sale', cat: 'Sales', type: 'Income', amount: 35000 },
];

const Ledger = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-ledger-dark)]">General Ledger</h1>
          <p className="text-slate-500 mt-1">Track your complete cash flow history.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition">
            <Filter size={18} /> <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-[var(--color-ledger-gold)] text-[var(--color-ledger-dark)] px-4 py-2 rounded-lg font-semibold hover:brightness-105 transition shadow-sm">
            <Download size={18} /> <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium text-right">Amount (₨)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyLedger.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 text-slate-600">{row.date}</td>
                  <td className="p-4 font-medium text-slate-800">{row.desc}</td>
                  <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs">{row.cat}</span></td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-bold ${row.type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                    {row.type === 'Income' ? '+' : '-'} {row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ledger;