import React, { useState, useRef } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Banknote, TrendingUp, CreditCard, Scale, ArrowUpRight, ArrowDownRight, 
  Download, Calendar, Activity, ChevronDown, Target, AlertCircle, CheckCircle2 
} from 'lucide-react';

// --- Realistic Financial Data & Mocks ---
const cashFlowData = [
  { month: 'Jan', income: 412500, expenses: 245000 },
  { month: 'Feb', income: 385000, expenses: 232000 },
  { month: 'Mar', income: 524000, expenses: 289000 },
  { month: 'Apr', income: 489500, expenses: 315000 },
];

// Drill-down data
const revenueBreakdown = [
  { name: 'B2B Contracts', value: 850000 },
  { name: 'Direct Sales', value: 600000 },
  { name: 'Retainers', value: 360000 },
];

const expenseBreakdown = [
  { name: 'Payroll', value: 550000 },
  { name: 'Inventory/Raw', value: 320000 },
  { name: 'Marketing', value: 150000 },
  { name: 'Utilities & Ops', value: 60000 },
];

const profitTrend = [
  { month: 'Jan', margin: 40.6, ebitda: 185000 },
  { month: 'Feb', margin: 39.7, ebitda: 168000 },
  { month: 'Mar', margin: 44.8, ebitda: 250000 },
  { month: 'Apr', margin: 35.6, ebitda: 190000 },
];

const COLORS = ['#0a1d37', '#D4AF37', '#1c4a8a', '#e2e8f0'];

// Dashboard Summaries config
const homeSummary = [
  { id: 'revenue', title: 'Total Revenue', value: '₨ 1.81M', icon: Banknote, trend: '+14.2%', isPositive: true },
  { id: 'expenses', title: 'Total Expenses', value: '₨ 1.08M', icon: CreditCard, trend: '+5.1%', isPositive: false },
  { id: 'profit', title: 'Net Profit', value: '₨ 731K', icon: TrendingUp, trend: '+22.4%', isPositive: true },
  { id: 'tax', title: 'FBR Tax Status', value: 'Active', icon: Scale, trend: 'Verified', isPositive: true, isText: true },
];

const Home = () => {
  const [activeMetric, setActiveMetric] = useState(null);
  const deepDiveRef = useRef(null);

  // Handle card click and scroll
  const handleCardClick = (id) => {
    setActiveMetric(id);
    setTimeout(() => {
      deepDiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Shared Tooltip for Main Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a1d37] p-4 rounded-xl shadow-xl border border-slate-700 z-50">
          <p className="text-slate-300 font-bold mb-2">{label} 2026</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6 text-sm mb-1">
              <span className="flex items-center text-slate-400 capitalize font-medium">
                <span className="w-2.5 h-2.5 rounded-sm mr-2 shadow-sm" style={{ backgroundColor: entry.color || entry.payload.fill }}></span>
                {entry.name}
              </span>
              <span className="font-black text-white">
                {entry.name === 'margin' ? `${entry.value}%` : `₨ ${entry.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // --- CEO Deep Dive Sub-Components ---
  
  const renderRevenueDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-black text-[#0a1d37] mb-6">Revenue Streams Breakdown</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                {revenueBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">CEO Insights</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <Target className="text-[#D4AF37] mt-0.5" size={20} />
              <p className="text-sm text-[#0a1d37] font-medium"><strong className="font-black">B2B Contracts</strong> represent 47% of total revenue, indicating strong enterprise reliance.</p>
            </li>
            <li className="flex items-start space-x-3">
              <TrendingUp className="text-emerald-500 mt-0.5" size={20} />
              <p className="text-sm text-[#0a1d37] font-medium">Direct Sales grew by 12% MoM. Consider increasing ad spend here.</p>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Customer Acquisition Cost</p>
            <p className="text-2xl font-black text-[#0a1d37]">₨ 4,250</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">↓ 2.1% vs Last Qtr</p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Lifetime Value (LTV)</p>
            <p className="text-2xl font-black text-[#0a1d37]">₨ 145K</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">↑ 5.4% vs Last Qtr</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpenseDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-black text-[#0a1d37] mb-6">Operating Expenses (OpEx)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseBreakdown} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} width={100} />
              <RechartsTooltip cursor={{fill: '#f8fafc'}} content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">Cost Centers & Alerts</h4>
          <ul className="space-y-4">
             <li className="flex items-start space-x-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <p className="text-sm text-red-900 font-medium"><strong className="font-black">Payroll</strong> has expanded beyond the 40% benchmark limit due to recent Q1 hires.</p>
            </li>
            <li className="flex items-start space-x-3">
              <Activity className="text-slate-600 mt-0.5" size={20} />
              <p className="text-sm text-slate-800 font-medium">Marketing spend generated an ROI of 3.2x this month.</p>
            </li>
          </ul>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Burn Rate</p>
            <p className="text-2xl font-black text-[#0a1d37]">₨ 270K <span className="text-sm text-slate-400 font-medium">/ month</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Runway</p>
            <p className="text-2xl font-black text-[#D4AF37]">14.5 Mos</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfitDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      <div className="lg:col-span-2">
        <h3 className="text-xl font-black text-[#0a1d37] mb-6">Net Margin & EBITDA Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} fontWeight={600} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₨${value/1000}k`} fontWeight={600} />
              <YAxis yAxisId="right" orientation="right" stroke="#D4AF37" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} fontWeight={600} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Line yAxisId="left" type="monotone" dataKey="ebitda" stroke="#0a1d37" strokeWidth={4} dot={{ r: 4, fill: '#0a1d37', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="EBITDA" />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }} name="Margin %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
         <div className="bg-[#0a1d37] p-6 rounded-2xl shadow-lg border border-slate-700 text-white flex-1 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Q1 Net Profit Margin</p>
            <h2 className="text-5xl font-black text-[#D4AF37] tracking-tight">40.3%</h2>
            <div className="mt-4 pt-4 border-t border-slate-700/50">
               <p className="text-sm font-medium text-slate-300 leading-relaxed">Exceeding industry benchmark of 25%. Maintain current pricing structures to retain edge.</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderTaxDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center">
         <h3 className="text-xl font-black text-[#0a1d37] mb-6">Tax Compliance Overview</h3>
         <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-600">Provisional Tax Paid (WHT)</span>
                <span className="text-sm font-black text-[#0a1d37]">₨ 4,500 / ₨ 25,000</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#0a1d37] h-full w-[18%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-600">Sales Tax (Provincial) Filings</span>
                <span className="text-sm font-black text-emerald-600">Up to Date</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full rounded-full"></div>
              </div>
            </div>
         </div>
      </div>
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="text-lg font-black text-emerald-900 mb-2">Audit Ready</h4>
        <p className="text-sm text-emerald-700 font-medium">All ledgers are balanced. You are safe from non-filer penalties.</p>
      </div>
    </div>
  );

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

      {/* Actionable Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {homeSummary.map((item) => {
          const Icon = item.icon;
          const isActive = activeMetric === item.id;
          
          return (
            <button 
              key={item.id} 
              onClick={() => handleCardClick(item.id)}
              className={`group relative text-left bg-white p-6 rounded-2xl border transition-all duration-300 overflow-hidden outline-none ${
                isActive 
                  ? 'border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.15)] ring-2 ring-[#D4AF37]/20 translate-y-0' 
                  : 'border-slate-200 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/50 hover:-translate-y-1'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg border transition-colors duration-300 ${
                  isActive ? 'bg-[#0a1d37] border-[#0a1d37]' : 'bg-slate-50 border-slate-100 group-hover:bg-[#0a1d37]'
                }`}>
                  <Icon size={20} className={isActive ? 'text-[#D4AF37]' : 'text-slate-600 group-hover:text-[#D4AF37] transition-colors duration-300'} />
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  {item.title} 
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-[#D4AF37]' : 'opacity-0 group-hover:opacity-100'}`} />
                </p>
                <h3 className="text-3xl font-black text-[#0a1d37] tracking-tight">{item.value}</h3>
              </div>

              {/* Decorative Accent Line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-[#D4AF37] transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
            </button>
          );
        })}
      </div>

      {/* Main Charts Section (Top Level) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-[#0a1d37] flex items-center">
                <Activity size={18} className="mr-2 text-[#D4AF37]" /> Cash Flow Dynamics
              </h2>
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
          
          <div style={{ width: '100%', height: 280 }}>
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
            <h2 className="text-lg font-bold text-[#0a1d37] mb-6">Performance Ratio</h2>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="income" fill="#0a1d37" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Margin</p>
                <p className="text-2xl font-black text-[#0a1d37]">40.3%</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">On Track</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full w-[65%] rounded-full relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DRILL DOWN SECTION (Appears when a card is clicked) --- */}
      {activeMetric && (
        <div 
          ref={deepDiveRef} 
          className="mt-8 pt-8 border-t-2 border-slate-200/60 scroll-mt-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-8 bg-[#D4AF37] rounded-full"></div>
            <h2 className="text-2xl font-black text-[#0a1d37] uppercase tracking-wide">
              Deep Dive: {activeMetric}
            </h2>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200/80">
            {activeMetric === 'revenue' && renderRevenueDetails()}
            {activeMetric === 'expenses' && renderExpenseDetails()}
            {activeMetric === 'profit' && renderProfitDetails()}
            {activeMetric === 'tax' && renderTaxDetails()}
          </div>
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setActiveMetric(null)}
              className="text-sm font-bold text-slate-400 hover:text-[#0a1d37] transition-colors uppercase tracking-wider"
            >
              Close Deep Dive View
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;