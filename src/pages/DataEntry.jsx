import React, { useState, useEffect } from 'react';
import { 
  Save, FileText, CalendarDays, Tag, Banknote, 
  AlignLeft, Printer, X, CheckCircle2, ArrowRight 
} from 'lucide-react';

const DataEntry = ({ addTransaction, setActiveTab }) => {
  const [formData, setFormData] = useState({ date: '', type: 'Income', category: '', amount: '', description: '' });
  const [showInvoice, setShowInvoice] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Success popup state

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // === Success & Auto-Redirect Logic ===
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('ledger'); // Auto redirect to ledger after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, setActiveTab]);

  const saveAndRedirect = () => {
    addTransaction({
      date: formData.date,
      type: formData.type,
      cat: formData.category,
      amount: parseFloat(formData.amount),
      desc: formData.description
    });
    
    setFormData({ date: '', type: 'Income', category: '', amount: '', description: '' });
    setShowInvoice(false);
    setShowSuccess(true); // Trigger the animated popup
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAndRedirect();
  };

  const handleGenerateInvoice = () => {
    if (!formData.date || !formData.amount || !formData.category) {
      alert("Please fill in the Date, Category, and Amount to generate an invoice.");
      return;
    }
    setShowInvoice(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 animate-fade-in relative">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a1d37] tracking-tight">Data Entry Form</h1>
        <p className="text-slate-500 mt-1 font-medium">Record your daily financial transactions easily.</p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37] opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fields (Same as your layout) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CalendarDays size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Type</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CheckCircle2 size={18} className={formData.type === 'Income' ? 'text-emerald-500' : 'text-red-500'} />
                </div>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium appearance-none">
                  <option value="Income">Income / Sale</option>
                  <option value="Expense">Expense / Purchase</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input type="text" name="category" placeholder="e.g., Raw Material" value={formData.category} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Amount (₨)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Banknote size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-bold text-lg" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
            <button type="submit" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#D4AF37] via-[#E2C25D] to-[#B8860B] text-[#0a1d37] px-8 py-3.5 rounded-xl font-extrabold transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 border border-[#F3E5AB]/50">
              <Save size={20} />
              <span>Save Transaction</span>
            </button>
            <button type="button" onClick={handleGenerateInvoice} className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0a1d37] text-white hover:bg-[#153055] px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <FileText size={20} />
              <span>Generate Invoice</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================== */}
      {/* PREMIUM ANIMATED SUCCESS POPUP (Loader Theme) */}
      {/* ========================================== */}
      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden">
          {/* Backdrop like your main layout */}
          <div className="absolute inset-0 bg-[#0a1d37]/90 backdrop-blur-xl animate-in fade-in duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
            {/* Pulsing Gold Circle */}
            <div className="relative">
               <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-3xl opacity-20 animate-pulse"></div>
               <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)] border-4 border-white/20">
                  <CheckCircle2 size={48} className="text-white animate-bounce-short" />
               </div>
            </div>

            <h2 className="text-4xl font-black text-white mt-8 tracking-widest uppercase">
              Success<span className="text-[#D4AF37]">ful</span>
            </h2>
            <p className="text-[#D4AF37] font-bold mt-2 tracking-[0.2em] animate-pulse">
              RECORDING TRANSACTION...
            </p>
            
            <div className="mt-10 flex items-center gap-2 text-white/50 text-sm font-medium">
              <span>Redirecting to Ledger</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gold rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal (Keep your existing one, just call saveAndRedirect on Save Record) */}
      {showInvoice && (
        // ... (Apka purana Invoice Modal code yahan ayega)
        // Sirf "Save Record" button par saveAndRedirect function call karna hai
        <button onClick={saveAndRedirect}>Save Record</button>
      )}

    </div>
  );
};

export default DataEntry;