import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Banknote, TrendingUp, CreditCard, Scale, ArrowUpRight, ArrowDownRight, Download, Calendar, Activity } from 'lucide-react';

// Realistic Financial Data
const cashFlowData = [
  { month: 'Jan', income: 412500, expenses: 245000 },
  { month: 'Feb', income: 385000, expenses: 232000 },
  { month: 'Mar', income: 524000, expenses: 289000 },
  { month: 'Apr', income: 489500, expenses: 315000 },
];

// Professional Dashboard Summaries
const homeSummary = [
  { title: 'Total Revenue', value: '₨ 1.81M', icon: Banknote, trend: '+14.2%', isPositive: true },
  { title: 'Total Expenses', value: '₨ 1.08M', icon: CreditCard, trend: '+5.1%', isPositive: false },
  { title: 'Net Profit', value: '₨ 731K', icon: TrendingUp, trend: '+22.4%', isPositive: true },
  { title: 'FBR Tax Status', value: 'Active', icon: Scale, trend: 'Verified', isPositive: true, isText: true },
];

const Home = () => {
  // Helper for formatting tooltip currency
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a1d37] p-4 rounded-xl shadow-lg border border-slate-700">
          <p className="text-slate-300 font-bold mb-2">{label} 2026</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6 text-sm mb-1">
              <span className="flex items-center text-slate-400 capitalize">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                {entry.name}
              </span>
              <span className="font-bold text-white">
                ₨ {(entry.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0a1d37] tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Real-time business health and corporate compliance monitoring.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Calendar size={16} className="text-[#D4AF37]" />
            <span>Q1 / Q2 - 2026</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#0a1d37] hover:bg-[#153055] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_4px_12px_rgba(10,29,55,0.2)] hover:-translate-y-0.5">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards - High-End Corporate Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {homeSummary.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#D4AF37]/30 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-[#0a1d37] transition-colors duration-300">
                  <Icon size={20} className="text-slate-600 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                
                {/* Trend Badge */}
                <div className={`flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                  item.isText ? 'bg-blue-50 text-blue-600' :
                  item.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {!item.isText && (item.isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />)}
                  {item.trend}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.title}</p>
                <h3 className="text-3xl font-black text-[#0a1d37] tracking-tight">{item.value}</h3>
              </div>

              {/* Decorative Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-[#0a1d37] flex items-center">
                <Activity size={18} className="mr-2 text-[#D4AF37]" /> Cash Flow Dynamics
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">Monthly trajectory of inbound vs outbound capital.</p>
            </div>
            <div className="flex space-x-4">
              <span className="flex items-center text-xs font-bold text-slate-500">
                <span className="w-2.5 h-2.5 bg-[#0a1d37] rounded-sm mr-2"></span> Income
              </span>
              <span className="flex items-center text-xs font-bold text-slate-500">
                <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-sm mr-2"></span> Expenses
              </span>
            </div>
          </div>
          
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a1d37" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0a1d37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} fontWeight={600} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₨${value/1000}k`} fontWeight={600} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="income" stroke="#0a1d37" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Bar Chart & Mini Stats */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0a1d37] mb-1">Performance Ratio</h2>
            <p className="text-xs text-slate-500 font-medium mb-6">Income vs Expenses breakdown</p>
            
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="income" fill="#0a1d37" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profit Margin</p>
                <p className="text-2xl font-black text-[#0a1d37]">40.3%</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">On Track</span>
              </div>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full w-[65%] rounded-full relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 text-right uppercase tracking-wider">65% to Q2 Goal</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;