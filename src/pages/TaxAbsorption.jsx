import React from 'react';
import { ShieldCheck, AlertCircle, Calculator, FileText } from 'lucide-react';

const TaxAbsorption = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-ledger-dark tracking-tight">FBR Tax Absorption</h1>
        <p className="text-slate-500 mt-1">Automated tax calculation & Active Taxpayer status tracking.</p>
      </div>

      {/* ATL Status Card - Premium Dark Theme */}
      <div className="bg-ledger-dark rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between border border-slate-700/50 relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-ledger-gold opacity-10 rounded-full blur-3xl"></div>
        
        <div className="flex items-center space-x-5 z-10 w-full md:w-auto">
          <div className="p-3 bg-white/10 rounded-xl border border-white/5 shadow-inner">
            <ShieldCheck size={40} className="text-ledger-gold" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold tracking-tight">ATL Status</h2>
              {/* Green Badge for Active Status */}
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                Active
              </span>
            </div>
            <p className="text-slate-300 mt-1.5 text-sm">Enjoying reduced withholding tax rates.</p>
          </div>
        </div>
        
        <div className="hidden md:block text-right z-10 border-l border-white/10 pl-8">
          <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Last Updated</p>
          <p className="font-bold text-ledger-gold text-lg">April 2026</p>
        </div>
      </div>

      {/* Data Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Estimated Income Tax Card */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-ledger-light rounded-lg">
              <Calculator size={24} className="text-ledger-dark" />
            </div>
            <h3 className="text-lg font-bold text-ledger-dark">Estimated Income Tax</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium">Gross Revenue</span>
              <span className="font-bold text-slate-800">₨ 1,700,000</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium">Deductible Expenses</span>
              <span className="font-bold text-red-500">- ₨ 1,050,000</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-ledger-dark font-bold text-lg">Taxable Income</span>
              <span className="font-extrabold text-ledger-dark text-lg">₨ 650,000</span>
            </div>
            
            {/* Themed Alert Box */}
            <div className="mt-6 p-4 bg-ledger-gold/10 border border-ledger-gold/30 rounded-xl flex items-start space-x-3">
              <AlertCircle size={20} className="text-ledger-dark shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed">
                Based on current slabs, your income falls below the minimum taxable threshold. Estimated Tax Payable: <strong className="text-ledger-dark font-black">₨ 0</strong>
              </p>
            </div>
          </div>
        </div>

        {/* WHT Deducted Card */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-ledger-light rounded-lg">
              <FileText size={24} className="text-ledger-dark" />
            </div>
            <h3 className="text-lg font-bold text-ledger-dark">Withholding Tax (WHT)</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6 pl-12">Tax already deducted at source which can be adjusted.</p>
           
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 hover:border-ledger-gold/50 transition-colors rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Electricity Bills (Sec 235)</p>
                <p className="text-xs text-slate-500 mt-0.5">From K-Electric / WAPDA</p>
              </div>
              <p className="font-bold text-ledger-dark text-lg">₨ 4,500</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-100 hover:border-ledger-gold/50 transition-colors rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Bank Withdrawals</p>
                <p className="text-xs text-slate-500 mt-0.5">Non-ATL rate not applied</p>
              </div>
              <p className="font-bold text-slate-400 text-lg">₨ 0</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TaxAbsorption;