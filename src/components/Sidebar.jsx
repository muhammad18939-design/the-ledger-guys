import React from 'react';
import { 
  Home, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  X 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { id: 'Home', label: 'Dashboard', icon: Home },
    { id: 'DataEntry', label: 'Data Entry Form', icon: FileText },
    { id: 'Ledger', label: 'Ledger & Cash Flow', icon: BookOpen },
    { id: 'TaxAbsorption', label: 'FBR Tax Absorption', icon: ShieldCheck },
    { id: 'Wealth', label: 'Wealth Manager Index', icon: TrendingUp }, 
  ];

  const showExpandedContent = !isCollapsed || isMobileOpen;

  return (
    <div 
      className={`fixed left-0 top-0 h-screen text-white flex flex-col transition-all duration-300 ease-in-out z-[100] shadow-2xl border-r border-slate-700/50
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
        md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}
      style={{ backgroundColor: '#0a1d37' }} 
    >
      {/* Desktop Floating Toggle Button (Premium Gold Gradient) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-4 top-10 bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#0a1d37] w-8 h-8 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)] items-center justify-center border-2 border-white z-[110] hover:scale-110 cursor-pointer transition-transform"
      >
        {isCollapsed ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3} />}
      </button>

      {/* Mobile Close Button */}
      <button 
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden absolute right-4 top-4 p-1 hover:bg-slate-700 rounded-md text-slate-300 transition-colors z-[110]"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className={`border-b border-slate-700/50 flex flex-col items-center justify-center transition-all duration-300 ${
        !showExpandedContent ? 'py-6 px-2 space-y-0 h-24' : 'p-6 space-y-4'
      }`}>
        {/* Added shrink-0 so the logo never gets squished, and adjusted padding above! */}
        <img 
          src="./logo.jpg" 
          alt="The Ledger Guys Logo" 
          className={`rounded-full border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300 object-cover bg-white shrink-0 ${
            !showExpandedContent ? 'w-10 h-10 border-2' : 'w-20 h-20 border-4 mt-4 md:mt-0'
          }`} 
        />
        
        {showExpandedContent && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-center tracking-tight whitespace-nowrap">
              <span className="text-white">The Ledger</span>{' '}
              {/* Gold Gradient Text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                Guys
              </span>
            </div>
            {/* Gold Gradient Badge */}
            <p className="mt-2 text-[10px] text-[#0a1d37] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-md px-3 py-1 rounded-full font-bold whitespace-nowrap">
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
                setIsMobileOpen(false); 
              }}
              title={!showExpandedContent ? item.label : ''}
              className={`w-full flex items-center ${!showExpandedContent ? 'justify-center px-0' : 'justify-start px-4'} py-3.5 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E2C25D] to-[#B8860B] text-[#0a1d37] shadow-[0_4px_15px_rgba(212,175,55,0.3)] scale-105 font-bold border border-[#F3E5AB]/50' 
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