import React from 'react';
import { Download, Filter, Search, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const dummyLedger = [
  { id: 1, date: '10 Apr 2026', desc: 'Raw Material Purchase', cat: 'Inventory', type: 'Expense', amount: 45000 },
  { id: 2, date: '12 Apr 2026', desc: 'Wholesale Order #102', cat: 'Sales', type: 'Income', amount: 120000 },
  { id: 3, date: '15 Apr 2026', desc: 'Electricity Bill', cat: 'Utilities', type: 'Expense', amount: 18000 },
  { id: 4, date: '16 Apr 2026', desc: 'Direct Sale', cat: 'Sales', type: 'Income', amount: 35000 },
];

const Ledger = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0a1d37] tracking-tight">General Ledger</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Comprehensive record of all financial transactions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-sm font-medium text-[#0a1d37] shadow-sm"
            />
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex justify-center items-center space-x-2 bg-white border border-slate-200 text-[#0a1d37] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Filter size={16} /> <span>Filter</span>
            </button>
            <button className="flex-1 sm:flex-none flex justify-center items-center space-x-2 bg-gradient-to-r from-[#D4AF37] via-[#E2C25D] to-[#B8860B] text-[#0a1d37] px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-[0_4px_12px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 border border-[#F3E5AB]/50">
              <Download size={16} /> <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"></div>
        
        <div className="overflow-x-auto mt-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount (₨)</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyLedger.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-5 text-sm font-medium text-slate-500 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="p-5">
                    <p className="text-sm font-bold text-[#0a1d37]">{row.desc}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Txn ID: #{10000 + row.id}</p>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {row.cat}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      row.type === 'Income' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {row.type === 'Income' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                      {row.type}
                    </span>
                  </td>
                  <td className="p-5 text-right whitespace-nowrap">
                    <span className={`text-base font-black ${row.type === 'Income' ? 'text-emerald-600' : 'text-[#0a1d37]'}`}>
                      {row.type === 'Income' ? '+' : '-'} {row.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button className="p-1.5 text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer (Static for layout context) */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Showing 1 to 4 of 4 entries</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 text-sm font-bold cursor-not-allowed">Prev</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 text-sm font-bold cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ledger;