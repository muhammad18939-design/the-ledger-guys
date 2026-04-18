import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  PieChart, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Building2, 
  ArrowUpRight
} from 'lucide-react';

// Realistic 5-Year Projection Data
const projectionData = [
  { year: '2026', savings: 500000, invested: 500000 },
  { year: '2027', savings: 1000000, invested: 1250000 },
  { year: '2028', savings: 1500000, invested: 2100000 },
  { year: '2029', savings: 2000000, invested: 3350000 },
  { year: '2030', savings: 2500000, invested: 4800000 },
];

// Realistic Sector & Company Investment Data
const portfolioData = [
  {
    id: 'tech',
    sector: 'Technology Equities',
    totalInvested: 1200000,
    currentValue: 1540000,
    profit: '+28.3%',
    companies: [
      { name: 'Systems Limited', invested: 500000, current: 710000, profit: '+42.0%' },
      { name: 'TRG Pakistan', invested: 400000, current: 480000, profit: '+20.0%' },
      { name: 'Avanceon', invested: 300000, current: 350000, profit: '+16.6%' }
    ]
  },
  {
    id: 'mutual_funds',
    sector: 'Islamic Mutual Funds',
    totalInvested: 2500000,
    currentValue: 2850000,
    profit: '+14.0%',
    companies: [
      { name: 'Al Meezan Investment', invested: 1000000, current: 1150000, profit: '+15.0%' },
      { name: 'NBP Islamic Energy', invested: 800000, current: 920000, profit: '+15.0%' },
      { name: 'UBL Al-Ameen Fund', invested: 700000, current: 780000, profit: '+11.4%' }
    ]
  },
  {
    id: 'real_estate',
    sector: 'Real Estate Investment Trusts',
    totalInvested: 1500000,
    currentValue: 1620000,
    profit: '+8.0%',
    companies: [
      { name: 'Globe Residency REIT', invested: 1000000, current: 1080000, profit: '+8.0%' },
      { name: 'TPL Properties', invested: 500000, current: 540000, profit: '+8.0%' }
    ]
  }
];

const Wealth = () => {
  const [expandedSector, setExpandedSector] = useState('tech'); // Default expanded

  const toggleSector = (id) => {
    setExpandedSector(expandedSector === id ? null : id);
  };

  // Helper function to format currency
  const formatCurrency = (value) => `₨ ${(value / 1000000).toFixed(2)}M`;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0a1d37] flex items-center">
          Wealth Manager Index
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Strategic portfolio allocation and real-time yield tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Chart & Portfolio Drilldown */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0a1d37]">5-Year Growth Projection</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">In Millions (PKR)</span>
            </div>
            
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000000}M`} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="invested" name="Managed Wealth" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#goldGradient)" />
                  <Area type="monotone" dataKey="savings" name="Idle Cash" stroke="#cbd5e1" strokeWidth={2} fillOpacity={0.1} fill="#cbd5e1" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sectors & Companies Dropdown Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-[#0a1d37] mb-6">Portfolio Breakdown</h2>
            
            <div className="space-y-4">
              {portfolioData.map((item) => (
                <div key={item.id} className={`border rounded-xl transition-all duration-300 ${expandedSector === item.id ? 'border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.15)]' : 'border-slate-200 hover:border-slate-300'}`}>
                  
                  {/* Sector Header (Clickable) */}
                  <div 
                    onClick={() => toggleSector(item.id)}
                    className="flex items-center justify-between p-4 cursor-pointer bg-white rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${expandedSector === item.id ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0a1d37]">{item.sector}</h3>
                        <p className="text-xs text-slate-500">Invested: {formatCurrency(item.totalInvested)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-bold text-emerald-600 flex items-center justify-end">
                          <ArrowUpRight size={16} className="mr-1" /> {item.profit}
                        </p>
                        <p className="text-xs text-slate-500">{formatCurrency(item.currentValue)}</p>
                      </div>
                      {expandedSector === item.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                  </div>

                  {/* Companies Dropdown Content */}
                  {expandedSector === item.id && (
                    <div className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100 rounded-b-xl space-y-3">
                      <div className="grid grid-cols-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                        <div className="col-span-2">Asset / Company</div>
                        <div className="text-right">Invested</div>
                        <div className="text-right">Yield</div>
                      </div>
                      
                      {item.companies.map((company, idx) => (
                        <div key={idx} className="grid grid-cols-4 items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                          <div className="col-span-2 flex items-center space-x-3">
                            <Building2 size={16} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{company.name}</span>
                          </div>
                          <div className="text-right text-sm text-slate-600">{formatCurrency(company.invested)}</div>
                          <div className="text-right text-sm font-bold text-emerald-600">{company.profit}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations & Stats */}
        <div className="space-y-6">
          
          {/* Premium Recommendation Card */}
          <div className="bg-[#0a1d37] text-white p-6 rounded-2xl shadow-[0_8px_20px_rgba(10,29,55,0.4)] relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full blur-[60px] opacity-20"></div>
            
            <Sparkles className="text-[#D4AF37] mb-4 relative z-10" size={32} />
            <h3 className="text-xl font-bold mb-2 relative z-10">AI Analyst Insight</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed relative z-10">
              Based on the current market trends, reallocating <strong className="text-white">15%</strong> of your Tech Equities into Shariah-compliant REITs will stabilize your quarterly dividends.
            </p>
            <button className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#0a1d37] font-extrabold py-3 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all relative z-10">
              Execute Rebalance
            </button>
          </div>

          {/* Allocation Stats */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#0a1d37] to-slate-800 text-[#D4AF37] rounded-xl shadow-md">
                <PieChart size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Current Allocation</p>
                <p className="text-lg font-extrabold text-[#0a1d37]">Growth Oriented</p>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Mutual Funds</span>
                  <span className="font-bold text-[#0a1d37]">48%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Tech Equities</span>
                  <span className="font-bold text-[#0a1d37]">23%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#0a1d37] h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Real Estate</span>
                  <span className="font-bold text-[#0a1d37]">29%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '29%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wealth;