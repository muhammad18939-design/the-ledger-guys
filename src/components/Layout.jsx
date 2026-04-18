import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Loader2, Menu } from 'lucide-react'; 

const Layout = ({ children, activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Default expanded on desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile Menu State
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen bg-[#f3f6f9] font-sans antialiased text-slate-900 overflow-hidden">
      
      {/* 1. LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a1d37]/40 backdrop-blur-md text-white transition-opacity duration-500">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#f1b31c] opacity-20 animate-ping"></div>
            <Loader2 size={56} className="animate-spin text-[#f1b31c] relative z-10" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-widest text-white tracking-[0.2em] text-center">
            THE LEDGER <span className="text-[#f1b31c]">GUYS</span>
          </h2>
          <p className="text-sm text-slate-200 mt-2 animate-pulse font-medium">Initializing your workspace...</p>
        </div>
      )}

      {/* 2. MOBILE TOP NAVBAR (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a1d37] shadow-md z-[90] flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="./logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-[#f1b31c] bg-white object-cover" />
          <h1 className="font-bold text-white tracking-wider text-sm sm:text-base">
            THE LEDGER <span className="text-[#f1b31c]">GUYS</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-1 text-[#f1b31c] hover:bg-slate-800 rounded-md transition-colors"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* 3. SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 4. MOBILE BACKGROUND OVERLAY (Darkens background when menu is open) */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[95] backdrop-blur-sm transition-all"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      
      {/* 5. MAIN CONTENT AREA */}
      {/* pt-16 ensures content isn't hidden behind the mobile navbar */}
      <div 
        className={`flex-1 min-h-screen transition-all duration-500 ease-in-out pt-16 md:pt-0 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        } ml-0`}
      >
        <main className="h-full p-4 sm:p-6 md:p-10 xl:p-12 overflow-y-auto">
          <div 
            key={activeTab} 
            className="w-full max-w-7xl mx-auto"
            style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {children}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;