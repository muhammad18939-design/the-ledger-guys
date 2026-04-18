
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart, Sparkles } from 'lucide-react';

const projectionData = [
  { year: '2026', savings: 500, invested: 500 },
  { year: '2027', savings: 1000, invested: 1150 },
  { year: '2028', savings: 1500, invested: 1900 },
  { year: '2029', savings: 2000, invested: 2850 },
  { year: '2030', savings: 2500, invested: 4100 },
];

const Wealth = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--color-ledger-dark)]">Wealth Multiplication</h1>
        <p className="text-slate-500 mt-1">Smart investing to grow your retained earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">5-Year Growth Projection (x1000 ₨)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="invested" name="Invested (Mutual Funds)" stroke="#f1b31c" fillOpacity={1} fill="#f1b31c" opacity={0.2} />
                <Area type="monotone" dataKey="savings" name="Idle Bank Cash" stroke="#94a3b8" fillOpacity={0.1} fill="#94a3b8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--color-ledger-dark)] text-white p-6 rounded-2xl shadow-md">
            <Sparkles className="text-[var(--color-ledger-gold)] mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Our Recommendation</h3>
            <p className="text-sm text-slate-300 mb-4">Move 40% of your idle cash to Shariah-compliant Mutual Funds to beat inflation.</p>
            <button className="w-full bg-[var(--color-ledger-gold)] text-[var(--color-ledger-dark)] font-bold py-2 rounded-lg hover:brightness-105 transition">
              Explore Funds
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-[var(--color-ledger-accent)] rounded-full">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Suggested Portfolio</p>
              <p className="font-bold text-slate-800">60% Low-Risk, 40% Equity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wealth;