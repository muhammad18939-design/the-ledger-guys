import React, { useState } from 'react';
import { Save, FileText, CalendarDays, Tag, Banknote, AlignLeft, Printer, X, CheckCircle2 } from 'lucide-react';

const DataEntry = ({ addTransaction, setActiveTab }) => {
  const [formData, setFormData] = useState({ date: '', type: 'Income', category: '', amount: '', description: '' });
  const [showInvoice, setShowInvoice] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Normal Save Transaction Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    saveAndRedirect();
  };

  const saveAndRedirect = () => {
    addTransaction({
      date: formData.date,
      type: formData.type,
      cat: formData.category,
      amount: parseFloat(formData.amount),
      desc: formData.description
    });
    
    alert('Transaction successfully saved! Redirecting to the Ledger...');
    setFormData({ date: '', type: 'Income', category: '', amount: '', description: '' });
    setActiveTab('ledger'); 
  };

  // Generate Invoice Logic (Check if mandatory fields are filled before opening)
  const handleGenerateInvoice = () => {
    if (!formData.date || !formData.amount || !formData.category) {
      alert("Please fill in the Date, Category, and Amount to generate an invoice.");
      return;
    }
    setShowInvoice(true);
  };

  // Print Logic
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0a1d37] tracking-tight">Data Entry Form</h1>
        <p className="text-slate-500 mt-1 font-medium">Record your daily financial transactions easily.</p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f1b31c] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CalendarDays size={18} className="text-slate-400" />
                </div>
                <input 
                  type="date" name="date" value={formData.date} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#f1b31c] focus:ring-4 focus:ring-[#f1b31c]/10 transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Transaction Type Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Transaction Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CheckCircle2 size={18} className={formData.type === 'Income' ? 'text-emerald-500' : 'text-red-500'} />
                </div>
                <select 
                  name="type" value={formData.type} onChange={handleChange} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#f1b31c] focus:ring-4 focus:ring-[#f1b31c]/10 transition-all text-slate-700 font-medium appearance-none"
                >
                  <option value="Income">Income / Sale</option>
                  <option value="Expense">Expense / Purchase</option>
                </select>
              </div>
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" name="category" placeholder="e.g., Raw Material, Client Payment" value={formData.category} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#f1b31c] focus:ring-4 focus:ring-[#f1b31c]/10 transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Amount (₨)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Banknote size={18} className="text-slate-400" />
                </div>
                <input 
                  type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleChange} required 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#f1b31c] focus:ring-4 focus:ring-[#f1b31c]/10 transition-all text-slate-700 font-bold text-lg" 
                />
              </div>
            </div>
          </div>
          
          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description / Details</label>
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <AlignLeft size={18} className="text-slate-400" />
              </div>
              <textarea 
                name="description" rows="3" placeholder="Enter transaction details or items here..." value={formData.description} onChange={handleChange} 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#f1b31c] focus:ring-4 focus:ring-[#f1b31c]/10 transition-all text-slate-700 font-medium resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
            <button type="submit" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0a1d37] hover:bg-[#153055] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <Save size={20} />
              <span>Save Transaction</span>
            </button>
            
            <button type="button" onClick={handleGenerateInvoice} className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white border-2 border-[#0a1d37] text-[#0a1d37] hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <FileText size={20} />
              <span>Generate Invoice</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================== */}
      {/* INVOICE MODAL (Hidden in normal view, Full screen in Print) */}
      {/* ========================================== */}
      {showInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1d37]/60 backdrop-blur-sm print:bg-white print:backdrop-blur-none p-4">
          
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:rounded-none">
            
            {/* Modal Header (Hidden on Print) */}
            <div className="flex justify-between items-center bg-slate-50 px-6 py-4 border-b border-slate-100 print:hidden">
              <h3 className="font-bold text-slate-700 flex items-center gap-2"><FileText size={18}/> Document Preview</h3>
              <button onClick={() => setShowInvoice(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                <X size={20} />
              </button>
            </div>

            {/* Printable Invoice Content */}
            <div className="p-8 md:p-12 overflow-y-auto print:overflow-visible print:p-0">
              
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#0a1d37] tracking-wider">THE LEDGER <span className="text-[#f1b31c]">GUYS</span></h2>
                  <p className="text-slate-500 text-sm mt-1">Financial Automation & Services</p>
                  <p className="text-slate-500 text-sm">Karachi, Pakistan</p>
                </div>
                <div className="text-right">
                  <h1 className="text-4xl font-black text-slate-200 tracking-widest uppercase">
                    {formData.type === 'Income' ? 'Invoice' : 'Voucher'}
                  </h1>
                  <p className="font-bold text-[#0a1d37] mt-2">Date: <span className="font-medium text-slate-600">{formData.date}</span></p>
                  <p className="font-bold text-[#0a1d37]">Doc No: <span className="font-medium text-slate-600">#{Math.floor(Math.random() * 100000)}</span></p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Transaction Details</h3>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-wrap gap-y-4 justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Type</p>
                    <p className={`font-bold ${formData.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>{formData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Category</p>
                    <p className="font-bold text-[#0a1d37]">{formData.category}</p>
                  </div>
                </div>
              </div>

              {/* Amount Table */}
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

              {/* Total Calculation */}
              <div className="flex justify-end mb-12">
                <div className="w-1/2 bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-slate-600">Total</span>
                    <span className="font-black text-[#0a1d37]">₨ {parseFloat(formData.amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-16 pt-8 border-t border-slate-100 text-sm text-slate-400">
                <p>Thank you for your business.</p>
                <p>This is a computer-generated document and does not require a signature.</p>
              </div>

            </div>

            {/* Modal Actions (Hidden on Print) */}
            <div className="flex justify-end gap-4 bg-slate-50 px-6 py-4 border-t border-slate-100 print:hidden">
              <button onClick={() => setShowInvoice(false)} className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={saveAndRedirect} className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md">
                <Save size={18} />
                <span>Save Record</span>
              </button>
              <button onClick={handlePrint} className="flex items-center space-x-2 bg-[#0a1d37] hover:bg-[#153055] text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md">
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