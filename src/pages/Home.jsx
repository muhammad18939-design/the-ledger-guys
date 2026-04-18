import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Banknote, TrendingUp, CreditCard, Scale, ArrowUpRight, Download, Calendar } from 'lucide-react';

// Dummy Financial Data
const cashFlowData = [
  { month: 'Jan', income: 400000, expenses: 240000 },
  { month: 'Feb', income: 350000, expenses: 220000 },
  { month: 'Mar', income: 500000, expenses: 280000 },
  { month: 'Apr', income: 450000, expenses: 310000 },
];

const homeSummary = [
  { title: 'Total Revenue (YTD)', value: '₨ 1.7M', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Total Expenses (YTD)', value: '₨ 1.05M', icon: CreditCard, color: 'text-red-500', bg: 'bg-red-50' },
  { title: 'Net Profit (YTD)', value: '₨ 650K', icon: TrendingUp, color: 'text-ledger-gold', bg: 'bg-ledger-gold/10' },
  { title: 'FBR ATL Status', value: 'Active', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const Home = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-ledger-dark tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1">Real-time business health and tax compliance monitoring.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition shadow-sm">
            <Calendar size={16} />
            <span>Jan 2026 - Apr 2026</span>
          </button>
          <button className="flex items-center space-x-2 bg-ledger-dark text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-ledger-dark/20">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Cards - Actionable Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {homeSummary.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Subtle Background Icon for design depth */}
              <Icon className={`absolute -right-4 -bottom-4 size-24 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 ${item.color}`} />
              
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color} transition-colors`}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={18} className="text-slate-300 group-hover:text-ledger-gold transition-colors" />
              </div>
              
              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{item.title}</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-ledger-dark mt-1">{item.value}</p>
                  {idx < 3 && <span className="text-xs font-bold text-emerald-500">+12%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ledger-dark">Cash Flow Dynamics</h2>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs font-medium text-slate-500">
                <span className="w-3 h-3 bg-ledger-dark rounded-full mr-2"></span> Income
              </span>
              <span className="flex items-center text-xs font-medium text-slate-500">
                <span className="w-3 h-3 bg-ledger-gold rounded-full mr-2"></span> Expenses
              </span>
            </div>
          </div>
          
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a1d37" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0a1d37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f1b31c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f1b31c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₨${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a1d37', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="income" stroke="#0a1d37" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="#f1b31c" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Comparative Bar Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-xl font-bold text-ledger-dark mb-1">Performance</h2>
          <p className="text-sm text-slate-500 mb-8">Income vs Expenses ratio</p>
          
          <div className="flex-1" style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={cashFlowData}>
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="income" fill="#0a1d37" radius={[6, 6, 0, 0]} barSize={25} />
                <Bar dataKey="expenses" fill="#f1b31c" radius={[6, 6, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Target Achievement</span>
              <span className="font-bold text-ledger-dark">84%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-ledger-gold h-full w-[84%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;