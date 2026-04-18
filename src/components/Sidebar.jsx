import React from 'react';
import { 
  Home, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  X // Added an icon to close it on mobile.
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { id: 'Home', label: 'Dashboard', icon: Home },
    { id: 'DataEntry', label: 'Data Entry Form', icon: FileText },
    { id: 'Ledger', label: 'Ledger & Cash Flow', icon: BookOpen },
    { id: 'TaxAbsorption', label: 'FBR Tax Absorption', icon: ShieldCheck },
    { id: 'Wealth', label: 'Wealth Multiplication', icon: TrendingUp },
  ];

  // On mobile, it will always appear expanded; on desktop, the collapsed logic will apply.
  const showExpandedContent = !isCollapsed || isMobileOpen;

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-ledger-dark text-white flex flex-col transition-all duration-300 ease-in-out z-[100] shadow-2xl border-r border-slate-700/50
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
        md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}
      style={{ backgroundColor: '#0a1d37' }} // Fallback in case class is missing
    >
      {/* Desktop Floating Toggle Button (Hidden on Mobile) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-4 top-10 bg-[#f1b31c] text-[#0a1d37] w-8 h-8 rounded-full shadow-lg items-center justify-center border-2 border-white z-[110] hover:scale-110 cursor-pointer transition-transform"
      >
        {isCollapsed ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3} />}
      </button>

      {/* Mobile Close Button (Hidden on Desktop) */}
      <button 
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden absolute right-4 top-4 p-1 hover:bg-slate-700 rounded-md text-slate-300 transition-colors z-[110]"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className={`p-6 border-b border-slate-700/50 flex flex-col items-center justify-center transition-all duration-300 ${
        !showExpandedContent ? 'space-y-0 h-28' : 'space-y-4'
      }`}>
        <img 
  src="./logo.jpg" 
  alt="The Ledger Guys Logo" 
  className={`rounded-full border-4 border-[#f1b31c] shadow-inner transition-all object-cover bg-white ${
    !showExpandedContent ? 'w-10 h-10 border-2' : 'w-20 h-20 mt-4 md:mt-0'
  }`} 
/>
        
        {showExpandedContent && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-center tracking-tight whitespace-nowrap">
              <span className="text-white">The Ledger</span> <span className="text-[#f1b31c]">Guys</span>
            </div>
            <p className="mt-2 text-[10px] text-[#0a1d37] bg-[#f1b31c] px-3 py-1 rounded-full font-bold whitespace-nowrap">
              FINANCIAL AUTOMATION
            </p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-3 mt-4 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileOpen(false); // When a tab is clicked, the mobile menu will automatically close.
              }}
              title={!showExpandedContent ? item.label : ''}
              className={`w-full flex items-center ${!showExpandedContent ? 'justify-center px-0' : 'justify-start px-4'} py-3.5 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-[#f1b31c] text-[#0a1d37] shadow-md scale-105 font-bold' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <Icon size={24} className={`shrink-0 ${showExpandedContent && 'mr-3.5'}`} />
              
              {showExpandedContent && (
                <span className="text-base whitespace-nowrap transition-all duration-300">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {showExpandedContent && (
        <div className="p-5 border-t border-slate-700/50 text-xs text-slate-400 text-center font-mono whitespace-nowrap">
          Empowering Cottage Industry <br /> © 2026 TLG
        </div>
      )}
    </div>
  );
};

export default Sidebar;