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
      
      {/* 1. PREMIUM LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a1d37]/90 backdrop-blur-lg transition-all duration-700">
          
          {/* Ambient Background Glow */}
          <div className="absolute w-72 h-72 bg-[#D4AF37] rounded-full blur-[100px] opacity-20 animate-pulse"></div>

          <div className="relative flex flex-col items-center z-10">
            {/* Animated Multi-Ring Spinner */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">
              {/* Outer Slow Spin */}
              <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#D4AF37]/30 animate-[spin_3s_linear_infinite]"></div>
              {/* Inner Fast Spin */}
              <div className="absolute inset-2 rounded-full border-l-4 border-r-4 border-[#D4AF37] animate-[spin_1.5s_linear_infinite_reverse]"></div>
              {/* Core Icon */}
              <Loader2 size={36} className="animate-spin text-white relative z-10" />
            </div>

            {/* Upgraded Typography */}
            <h2 className="text-3xl sm:text-4xl font-black tracking-[0.25em] text-white text-center drop-shadow-xl mb-4">
              THE LEDGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">GUYS</span>
            </h2>
            
            {/* Animated Loading Text */}
            <div className="flex items-center space-x-1 text-sm font-bold tracking-[0.2em] uppercase mt-2">
              <span className="text-slate-300">Initializing Workspace</span>
              <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '300ms' }}>.</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MOBILE TOP NAVBAR (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a1d37] shadow-md z-[90] flex items-center justify-between px-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <img 
            src="./logo.jpg" 
            alt="Logo" 
            className="w-8 h-8 rounded-full border-2 border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.3)] bg-white object-cover" 
          />
          <h1 className="font-bold text-white tracking-wider text-sm sm:text-base">
            THE LEDGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">GUYS</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-1 text-[#D4AF37] hover:bg-slate-800 rounded-md transition-colors"
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