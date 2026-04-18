import React from 'react';
import { 
  Home, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  ChevronLeft, 
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
      // Premium easing function for that CEO-level mechanical fluidity
      className={`fixed left-0 top-0 h-screen text-white flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-[100] shadow-2xl border-r border-slate-700/50
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
        md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}
      style={{ backgroundColor: '#0a1d37' }} 
    >
      {/* Desktop Floating Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-4 top-10 bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#0a1d37] w-8 h-8 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] items-center justify-center border-2 border-white z-[110] hover:scale-110 cursor-pointer transition-transform duration-300"
      >
        {/* Animated Chevron - Smoothly rotates 180deg */}
        <ChevronLeft 
          size={18} 
          strokeWidth={3} 
          className={`transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      {/* Mobile Close Button */}
      <button 
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden absolute right-4 top-4 p-1 hover:bg-slate-700 rounded-md text-slate-300 transition-colors z-[110]"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className={`border-b border-slate-700/50 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        !showExpandedContent ? 'py-6 px-2 h-24' : 'p-6'
      }`}>
        {/* Logo smoothly scales and changes border width */}
        <img 
          src="./logo.jpg" 
          alt="The Ledger Guys Logo" 
          className={`rounded-full border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] object-cover bg-white shrink-0 ${
            !showExpandedContent ? 'w-10 h-10 border-2' : 'w-20 h-20 border-4'
          }`} 
        />
        
        {/* Logo Text - Smoothly slides up and fades out instead of instantly disappearing */}
        <div className={`flex flex-col items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top ${
          !showExpandedContent ? 'max-h-0 opacity-0 scale-95 mt-0' : 'max-h-32 opacity-100 scale-100 mt-4'
        }`}>
          <div className="text-xl font-bold text-center tracking-tight whitespace-nowrap">
            <span className="text-white">The Ledger</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
              Guys
            </span>
          </div>
          <p className="mt-2 text-[10px] text-[#0a1d37] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-md px-3 py-1 rounded-full font-bold whitespace-nowrap">
            FINANCIAL AUTOMATION
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-3 mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
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
              className={`w-full flex items-center py-3.5 rounded-xl transition-all duration-300 font-medium overflow-hidden ${
                !showExpandedContent ? 'justify-center px-0' : 'justify-start px-4'
              } ${
                isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E2C25D] to-[#B8860B] text-[#0a1d37] shadow-[0_4px_15px_rgba(212,175,55,0.3)] font-bold border border-[#F3E5AB]/50' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              } ${isActive && showExpandedContent ? 'scale-105' : 'scale-100'}`}
            >
              <Icon size={24} className="shrink-0 z-10 relative" />
              
              {/* Labels - Smooth width and opacity transition */}
              <span className={`text-base whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                showExpandedContent ? 'max-w-[200px] opacity-100 ml-3.5 translate-x-0' : 'max-w-0 opacity-0 ml-0 -translate-x-4'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer - Smoothly collapses downward */}
      <div className={`border-t border-slate-700/50 text-xs text-slate-400 text-center font-mono whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        showExpandedContent ? 'max-h-24 opacity-100 p-5' : 'max-h-0 opacity-0 p-0 border-transparent'
      }`}>
        Empowering Cottage Industry <br /> © 2026 TLG
      </div>
    </div>
  );
};

export default Sidebar;