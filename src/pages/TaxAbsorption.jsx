import React from 'react';
import { ShieldCheck, AlertCircle, Calculator, FileText, CheckCircle2 } from 'lucide-react';

const TaxAbsorption = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0a1d37] tracking-tight">Tax Absorption & FBR</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Automated tax calculation & Active Taxpayer status tracking.</p>
        </div>
      </div>

      {/* Premium ATL Status Banner */}
      <div className="bg-[#0a1d37] rounded-2xl p-8 md:p-10 text-white shadow-[0_8px_30px_rgba(10,29,55,0.15)] flex flex-col md:flex-row items-center justify-between border border-[#153055] relative overflow-hidden">
        {/* Deep Gold Ambient Glow Effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37] opacity-15 rounded-full blur-[80px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 opacity-10 rounded-full blur-[60px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 z-10 w-full md:w-auto text-center sm:text-left">
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner relative group">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ShieldCheck size={48} className="text-[#D4AF37] relative z-10" strokeWidth={1.5} />
          </div>
          
          <div className="pt-1">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-4">
              <h2 className="text-3xl font-black tracking-tight text-white">ATL Status</h2>
              {/* Premium Green Badge */}
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-xs font-black tracking-widest uppercase">Verified Active</span>
              </div>
            </div>
            <p className="text-slate-400 mt-2 text-sm font-medium">Currently enjoying reduced withholding tax rates across all transactions.</p>
          </div>
        </div>
        
        <div className="hidden md:block text-right z-10 border-l border-white/10 pl-10">
          <p className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-widest font-bold">Last Synchronized</p>
          <p className="font-black text-[#D4AF37] text-xl tracking-tight">18 Apr 2026</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">FBR Portal API</p>
        </div>
      </div>

      {/* Data Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Estimated Income Tax Card */}
        <div className="bg-white p-7 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 relative">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Calculator size={24} className="text-[#0a1d37]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0a1d37]">Estimated Income Tax</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Provisional calculation for FY26</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
              <span className="font-black text-slate-700 text-lg">₨ 1,812,500</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deductible Expenses</span>
              <span className="font-black text-red-500 text-lg">- ₨ 1,081,000</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-black text-[#0a1d37] uppercase tracking-widest">Taxable Income</span>
              <span className="font-black text-[#0a1d37] text-2xl">₨ 731,500</span>
            </div>
            
            {/* Themed Official Alert Box */}
            <div className="mt-6 p-5 bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-xl flex items-start space-x-3">
              <AlertCircle size={20} className="text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#0a1d37] font-medium leading-relaxed">
                  Based on current FBR slabs for Individuals/AOPs, your income falls below the minimum taxable threshold of ₨ 1,200,000.
                </p>
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Payable:</span>
                  <span className="bg-white px-2 py-1 rounded border border-[#D4AF37]/30 text-sm font-black text-[#0a1d37]">₨ 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHT Deducted Card */}
        <div className="bg-white p-7 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <FileText size={24} className="text-[#0a1d37]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0a1d37]">Withholding Tax (WHT)</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Tax deducted at source (Adjustable)</p>
            </div>
          </div>
            
          <div className="space-y-4 flex-1">
            {/* Transaction Item 1 */}
            <div className="p-4 bg-slate-50 border border-slate-200 hover:border-[#D4AF37]/50 transition-colors rounded-xl flex justify-between items-center group">
              <div>
                <p className="font-bold text-[#0a1d37] text-sm">Electricity Bills <span className="text-xs font-bold text-slate-400 ml-1">(Sec 235)</span></p>
                <p className="text-xs text-slate-500 font-medium mt-1">K-Electric Commercial Connection</p>
              </div>
              <p className="font-black text-[#0a1d37] text-lg group-hover:text-[#D4AF37] transition-colors">₨ 4,500</p>
            </div>
            
            {/* Transaction Item 2 */}
            <div className="p-4 bg-slate-50 border border-slate-200 hover:border-[#D4AF37]/50 transition-colors rounded-xl flex justify-between items-center group opacity-70 hover:opacity-100">
              <div>
                <p className="font-bold text-[#0a1d37] text-sm">Bank Withdrawals <span className="text-xs font-bold text-slate-400 ml-1">(Sec 231A)</span></p>
                <p className="text-xs text-slate-500 font-medium mt-1">Exempt due to Active ATL Status</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-400 text-lg line-through decoration-red-400/50">₨ 2,500</p>
                <p className="font-black text-emerald-600 text-sm">₨ 0</p>
              </div>
            </div>
          </div>

          {/* Footer Total */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Adjustable Tax</p>
              <p className="text-sm font-medium text-slate-500">Available for FY26 Return</p>
            </div>
            <p className="text-3xl font-black text-[#D4AF37]">₨ 4,500</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TaxAbsorption;