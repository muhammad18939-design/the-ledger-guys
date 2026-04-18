import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react'; 

const Layout = ({ children, activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen bg-[#f3f6f9] font-sans antialiased text-slate-900 overflow-hidden">
      
      {/* ========================================== */}
      {/* 1. LOADING OVERLAY (Glassmorphism Effect) */}
      {/* ========================================== */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a1d37]/40 backdrop-blur-md text-white transition-opacity duration-500">
          <div className="relative flex items-center justify-center mb-6">
            {/* Peche ka glowing ring animation */}
            <div className="absolute inset-0 rounded-full border-4 border-[#f1b31c] opacity-20 animate-ping"></div>
            {/* Main spinning loader */}
            <Loader2 size={56} className="animate-spin text-[#f1b31c] relative z-10" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-widest text-white tracking-[0.2em]">
            THE LEDGER <span className="text-[#f1b31c]">GUYS</span>
          </h2>
          <p className="text-sm text-slate-200 mt-2 animate-pulse font-medium">Initializing your workspace...</p>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. MAIN APP LAYOUT */}
      {/* ========================================== */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div 
        className={`flex-1 min-h-screen transition-all duration-500 ease-in-out ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <main className="h-full p-10 xl:p-12 overflow-y-auto">
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