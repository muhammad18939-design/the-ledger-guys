import React, { useState, useEffect, useRef } from 'react';
import { Download, Filter, Search, ArrowUpRight, ArrowDownRight, MoreHorizontal, Check } from 'lucide-react';

// --- Expanded Realistic Data with Multiple Companies ---
const initialLedgerData = [
  { id: 1, date: '01 Apr 2026', desc: 'Raw Material Purchase', company: 'Alpha Metals LLC', cat: 'Inventory', type: 'Expense', amount: 45000 },
  { id: 2, date: '02 Apr 2026', desc: 'Wholesale Order #102', company: 'Nexus Retailers', cat: 'Sales', type: 'Income', amount: 120000 },
  { id: 3, date: '03 Apr 2026', desc: 'Electricity Bill', company: 'K-Electric', cat: 'Utilities', type: 'Expense', amount: 18000 },
  { id: 4, date: '04 Apr 2026', desc: 'Direct Sale', company: 'Walk-in Customer', cat: 'Sales', type: 'Income', amount: 35000 },
  { id: 5, date: '05 Apr 2026', desc: 'Server Hosting', company: 'Amazon Web Services', cat: 'IT Services', type: 'Expense', amount: 25000 },
  { id: 6, date: '06 Apr 2026', desc: 'B2B Consulting', company: 'TechCorp Solutions', cat: 'Services', type: 'Income', amount: 85000 },
  { id: 7, date: '08 Apr 2026', desc: 'Office Supplies', company: 'Stationery Hub', cat: 'Operations', type: 'Expense', amount: 12500 },
  { id: 8, date: '09 Apr 2026', desc: 'Software Licenses', company: 'Microsoft', cat: 'IT Services', type: 'Expense', amount: 40000 },
  { id: 9, date: '10 Apr 2026', desc: 'Retainer Fee Q2', company: 'Global Industries', cat: 'Retainer', type: 'Income', amount: 150000 },
  { id: 10, date: '11 Apr 2026', desc: 'Facebook Ads', company: 'Meta Platforms', cat: 'Marketing', type: 'Expense', amount: 55000 },
  { id: 11, date: '12 Apr 2026', desc: 'Wholesale Order #105', company: 'Prime Retail', cat: 'Sales', type: 'Income', amount: 95000 },
  { id: 12, date: '13 Apr 2026', desc: 'Internet Bill', company: 'StormFiber', cat: 'Utilities', type: 'Expense', amount: 8000 },
  { id: 13, date: '14 Apr 2026', desc: 'Equipment Repair', company: 'FixIt Mechanics', cat: 'Maintenance', type: 'Expense', amount: 22000 },
  { id: 14, date: '15 Apr 2026', desc: 'Q1 Dividend Payout', company: 'Shareholders', cat: 'Dividends', type: 'Expense', amount: 300000 },
  { id: 15, date: '16 Apr 2026', desc: 'Export Order', company: 'Dubai Traders Ltd.', cat: 'Sales', type: 'Income', amount: 450000 },
  { id: 16, date: '18 Apr 2026', desc: 'Legal Consultation', company: 'A&B Law Associates', cat: 'Legal', type: 'Expense', amount: 60000 },
  { id: 17, date: '19 Apr 2026', desc: 'Water & Gas', company: 'City Utilities', cat: 'Utilities', type: 'Expense', amount: 14000 },
  { id: 18, date: '20 Apr 2026', desc: 'Bulk Discount Sale', company: 'Nexus Retailers', cat: 'Sales', type: 'Income', amount: 110000 },
  { id: 19, date: '21 Apr 2026', desc: 'Warehouse Rent', company: 'Estate Holdings', cat: 'Rent', type: 'Expense', amount: 120000 },
  { id: 20, date: '22 Apr 2026', desc: 'Freelance Design', company: 'Creative Studio', cat: 'Contractor', type: 'Expense', amount: 35000 },
  { id: 21, date: '24 Apr 2026', desc: 'Custom Software Dev', company: 'Alpha Solutions', cat: 'Services', type: 'Income', amount: 250000 },
  { id: 22, date: '26 Apr 2026', desc: 'Employee Bonuses', company: 'Internal Payroll', cat: 'Payroll', type: 'Expense', amount: 180000 },
  { id: 23, date: '27 Apr 2026', desc: 'Google Ads', company: 'Google LLC', cat: 'Marketing', type: 'Expense', amount: 45000 },
  { id: 24, date: '28 Apr 2026', desc: 'Product Launch Reg', company: 'Event Managers', cat: 'Marketing', type: 'Expense', amount: 75000 },
  { id: 25, date: '30 Apr 2026', desc: 'Monthly Subscriptions', company: 'Various B2C', cat: 'Sales', type: 'Income', amount: 80000 },
];

const Ledger = () => {
  // --- State Management ---
  const [data] = useState(initialLedgerData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // Options: 'All', 'Income', 'Expense'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const filterRef = useRef(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset to first page whenever search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  // --- Filtering & Searching Logic ---
  const filteredData = data.filter((row) => {
    const matchesSearch = 
      row.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.id.toString().includes(searchTerm);
      
    const matchesFilter = filterType === 'All' ? true : row.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTableData = filteredData.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  // --- Export Logic (CSV Download) ---
  const handleExport = () => {
    const headers = ['Txn ID', 'Date', 'Description', 'Company', 'Category', 'Type', 'Amount (PKR)'];
    
    const csvRows = filteredData.map(row => [
      `#${10000 + row.id}`,
      `"${row.date}"`,
      `"${row.desc}"`,
      `"${row.company}"`,
      `"${row.cat}"`,
      row.type,
      row.amount
    ]);

    const csvContent = [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'General_Ledger_Statement.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0a1d37] tracking-tight">General Ledger</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Comprehensive record of all financial transactions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all text-sm font-medium text-[#0a1d37] shadow-sm"
            />
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            
            {/* Filter Dropdown */}
            <div className="relative flex-1 sm:flex-none" ref={filterRef}>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full flex justify-center items-center space-x-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  filterType !== 'All' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                  : 'border-slate-200 text-[#0a1d37] hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Filter size={16} /> 
                <span>{filterType === 'All' ? 'Filter' : filterType}</span>
              </button>

              {/* Filter Menu */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-fade-in">
                  <p className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Type</p>
                  {['All', 'Income', 'Expense'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-50 text-[#0a1d37] flex items-center justify-between"
                    >
                      {type}
                      {filterType === type && <Check size={16} className="text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button 
              onClick={handleExport}
              className="flex-1 sm:flex-none flex justify-center items-center space-x-2 bg-gradient-to-r from-[#D4AF37] via-[#E2C25D] to-[#B8860B] text-[#0a1d37] px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-[0_4px_12px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 border border-[#F3E5AB]/50"
            >
              <Download size={16} /> <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"></div>
        
        <div className="overflow-x-auto mt-1 min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Details</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Company / Party</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount (₨)</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentTableData.length > 0 ? (
                currentTableData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-5 text-sm font-medium text-slate-500 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-bold text-[#0a1d37]">{row.desc}</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">Txn ID: #{10000 + row.id}</p>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-bold text-slate-700">{row.company}</p>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        {row.cat}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        row.type === 'Income' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {row.type === 'Income' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {row.type}
                      </span>
                    </td>
                    <td className="p-5 text-right whitespace-nowrap">
                      <span className={`text-base font-black ${row.type === 'Income' ? 'text-emerald-600' : 'text-[#0a1d37]'}`}>
                        {row.type === 'Income' ? '+' : '-'} {row.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button className="p-1.5 text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400 font-medium">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                currentPage === 1 
                ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed' 
                : 'border-slate-200 bg-white text-[#0a1d37] hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Prev
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                currentPage === totalPages || totalPages === 0
                ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed' 
                : 'border-slate-200 bg-white text-[#0a1d37] hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ledger;