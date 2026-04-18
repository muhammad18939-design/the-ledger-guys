import React, { useState, useEffect } from 'react';
import { 
  Save, FileText, CalendarDays, Tag, Banknote, 
  AlignLeft, Printer, X, CheckCircle2, PartyPopper, ArrowRight 
} from 'lucide-react';

const DataEntry = ({ addTransaction, setActiveTab }) => {
  const [formData, setFormData] = useState({ date: '', type: 'Income', category: '', amount: '', description: '' });
  const [showInvoice, setShowInvoice] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // New Success State

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Logic for the final step: Showing Success and Redirecting
  const triggerSuccessSequence = () => {
    setShowInvoice(false);
    setShowSuccess(true);
    
    // Automatically redirect after 3 seconds if user doesn't click
    const timer = setTimeout(() => {
      handleCloseSuccess();
    }, 3500);
    return () => clearTimeout(timer);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setActiveTab('ledger'); // Redirect to Ledger
  };

  const saveAndRedirect = () => {
    addTransaction({
      date: formData.date,
      type: formData.type,
      cat: formData.category,
      amount: parseFloat(formData.amount),
      desc: formData.description
    });
    
    setFormData({ date: '', type: 'Income', category: '', amount: '', description: '' });
    triggerSuccessSequence();
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

  const handlePrint = () => {
    window.print();
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37] opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CalendarDays size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input 
                  type="date" name="date" value={formData.date} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Transaction Type Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Type</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CheckCircle2 size={18} className={formData.type === 'Income' ? 'text-emerald-500' : 'text-red-500'} />
                </div>
                <select 
                  name="type" value={formData.type} onChange={handleChange} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium appearance-none"
                >
                  <option value="Income">Income / Sale</option>
                  <option value="Expense">Expense / Purchase</option>
                </select>
              </div>
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input 
                  type="text" name="category" placeholder="e.g., Raw Material, Client Payment" value={formData.category} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Amount (₨)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Banknote size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input 
                  type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-bold text-lg" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description / Details</label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <AlignLeft size={18} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
              </div>
              <textarea 
                name="description" rows="3" placeholder="Enter transaction details or items here..." value={formData.description} onChange={handleChange} 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-slate-700 font-medium resize-none"
              ></textarea>
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
      {/* PROFESSIONAL SUCCESS MODAL (New) */}
      {/* ========================================== */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0a1d37]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/20">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-[#0a1d37] mb-2">Success!</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              The transaction has been successfully recorded in your digital ledger.
            </p>
            <button 
              onClick={handleCloseSuccess}
              className="w-full flex items-center justify-center space-x-2 bg-[#0a1d37] text-white py-4 rounded-2xl font-bold hover:bg-[#153055] transition-all group"
            >
              <span>Go to Ledger</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* INVOICE MODAL */}
      {/* ========================================== */}
      {showInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1d37]/80 backdrop-blur-md print:bg-white print:backdrop-blur-none p-4 transition-all duration-300">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:rounded-none relative">
            
            <div className="flex justify-between items-center bg-slate-50 px-6 py-4 border-b border-slate-200 print:hidden relative z-10">
              <h3 className="font-bold text-[#0a1d37] flex items-center gap-2"><FileText size={18} className="text-[#D4AF37]"/> Document Preview</h3>
              <button onClick={() => setShowInvoice(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-slate-100">
                <X size={20} />
              </button>
            </div>

            {/* Printable Content */}
            <div className="p-8 md:p-12 overflow-y-auto print:overflow-visible print:p-0 relative z-10 bg-white">
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-wider text-[#0a1d37]">
                    THE LEDGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">GUYS</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Financial Automation & Services</p>
                </div>
                <div className="text-right">
                  <h1 className="text-4xl font-black text-slate-200 tracking-widest uppercase">
                    {formData.type === 'Income' ? 'Invoice' : 'Voucher'}
                  </h1>
                  <p className="font-bold text-[#0a1d37] mt-2 text-sm uppercase tracking-wider">Date: <span className="font-medium text-slate-600 ml-2">{formData.date}</span></p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Transaction Details</h3>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-wrap gap-y-4 justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Type</p>
                    <p className={`font-bold ${formData.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>{formData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Category</p>
                    <p className="font-bold text-[#0a1d37]">{formData.category}</p>
                  </div>
                </div>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2 border-[#0a1d37]">
                    <th className="text-left py-3 font-bold text-[#0a1d37]">Description</th>
                    <th className="text-right py-3 font-bold text-[#0a1d37]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 text-slate-700 whitespace-pre-wrap">{formData.description || 'No description provided.'}</td>
                    <td className="py-4 text-right font-bold text-slate-700">₨ {parseFloat(formData.amount).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end mb-12">
                <div className="w-1/2 bg-slate-50 rounded-xl p-6 border border-slate-100 relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0a1d37]"></div>
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-slate-500 uppercase text-sm tracking-wider">Total</span>
                    <span className="font-black text-[#0a1d37]">₨ {parseFloat(formData.amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-16 pt-8 border-t border-slate-100 text-xs font-medium text-slate-400">
                <p className="mb-1">Thank you for your business.</p>
                <p>Computer-generated document. No signature required.</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 bg-slate-50 px-6 py-4 border-t border-slate-200 print:hidden relative z-10">
              <button onClick={() => setShowInvoice(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={saveAndRedirect} className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-110 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md">
                <Save size={18} />
                <span>Save Record</span>
              </button>
              <button onClick={handlePrint} className="flex items-center space-x-2 bg-[#0a1d37] hover:bg-[#153055] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md">
                <Printer size={18} />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DataEntry;