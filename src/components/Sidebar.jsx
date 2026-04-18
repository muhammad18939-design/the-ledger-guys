import React from 'react';
import { 
  Home, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'dataEntry', label: 'Data Entry Form', icon: FileText },
    { id: 'ledger', label: 'Ledger & Cash Flow', icon: BookOpen },
    { id: 'tax', label: 'FBR Tax Absorption', icon: ShieldCheck },
    { id: 'wealth', label: 'Wealth Multiplication', icon: TrendingUp },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-ledger-dark text-white flex flex-col transition-all duration-300 ease-in-out z-[100] shadow-2xl border-r border-slate-700/50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Floating Toggle Button - Ab Yeh Screen Pe Hamesha Dikhay Ga */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-10 bg-ledger-gold text-ledger-dark w-8 h-8 rounded-full shadow-lg flex items-center justify-center border-2 border-white z-[110] hover:scale-110 cursor-pointer transition-transform"
      >
        {isCollapsed ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3} />}
      </button>

      {/* Logo Section */}
      <div className={`p-6 border-b border-slate-700/50 flex flex-col items-center justify-center transition-all duration-300 ${
        isCollapsed ? 'space-y-0 h-28' : 'space-y-4'
      }`}>
        <img 
          src="/logo.jpg" 
          alt="The Ledger Guys Logo" 
          className={`rounded-full border-4 border-ledger-accent shadow-inner transition-all object-cover bg-white ${
            isCollapsed ? 'w-10 h-10 border-2' : 'w-20 h-20'
          }`} 
        />
        
        {!isCollapsed && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-center tracking-tight whitespace-nowrap">
              <span className="text-white">The Ledger</span> <span className="text-ledger-gold">Guys</span>
            </div>
            <p className="mt-2 text-[10px] text-ledger-gold bg-ledger-gold/10 px-3 py-1 rounded-full font-mono whitespace-nowrap">
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
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''} // Hover karny par name show hoga jab band ho
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start px-4'} py-3.5 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-ledger-gold text-ledger-dark shadow-md scale-105 font-bold' 
                  : 'hover:bg-ledger-accent hover:text-white text-slate-300'
              }`}
            >
              <Icon size={24} className={`shrink-0 ${!isCollapsed && 'mr-3.5'}`} />
              
              {!isCollapsed && (
                <span className="text-base whitespace-nowrap transition-all duration-300">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-5 border-t border-slate-700/50 text-xs text-slate-500 text-center font-mono whitespace-nowrap">
          Empowering Cottage Industry <br /> © 2026 TLG
        </div>
      )}
    </div>
  );
};

export default Sidebar;