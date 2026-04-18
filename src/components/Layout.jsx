import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react'; 

const Layout = ({ children, activeTab, setActiveTab }) => {
  // --- UI STATES ---
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls desktop sidebar width
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Controls mobile sidebar visibility
  
  // --- LOADING OVERLAY STATES ---
  const [isLoading, setIsLoading] = useState(true);     // Triggers the CSS fade-out transition
  const [showOverlay, setShowOverlay] = useState(true); // Completely unmounts the loader from the DOM

  useEffect(() => {
    // Step 1: Initiate the fade-out effect after 2.2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    // Step 2: Completely remove the loader from the DOM after the transition finishes (2200ms + 800ms)
    const removeOverlayTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 3000); 

    // Cleanup timers to prevent memory leaks
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeOverlayTimer);
    };
  }, []);

  return (
    // FIX 1: 'min-h-screen' ki jagah 'h-screen' kiya taake sidebar fixed rahe aur sirf right content scroll ho
    <div className="relative flex h-screen bg-[#f3f6f9] font-sans antialiased text-slate-900 overflow-hidden">
      
      {/* --- 1. PREMIUM CINEMATIC LOADING OVERLAY --- */}
      {showOverlay && (
        <div 
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a1d37]/95 transition-all duration-[800ms] ease-in-out ${
            isLoading 
              ? 'opacity-100 backdrop-blur-xl' 
              : 'opacity-0 backdrop-blur-none pointer-events-none'
          }`}
        >
          
          {/* Ambient Gold Background Glow */}
          <div 
            className={`absolute w-72 h-72 bg-[#D4AF37] rounded-full blur-[100px] animate-pulse transition-opacity duration-[800ms] ${
              isLoading ? 'opacity-20' : 'opacity-0'
            }`}
          ></div>

          {/* Core Loader Content (Scales up dynamically during exit for a 3D effect) */}
          <div 
            className={`relative flex flex-col items-center z-10 transition-all duration-[800ms] ease-in-out ${
              isLoading 
                ? 'scale-100 opacity-100' 
                : 'scale-110 opacity-0 translate-y-4' 
            }`}
          >
            {/* Animated Multi-Ring Spinner */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#D4AF37]/30 animate-[spin_3s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border-l-4 border-r-4 border-[#D4AF37] animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>

            {/* Premium Typography / Brand Name */}
            <h2 className="text-3xl sm:text-4xl font-black tracking-[0.25em] text-white text-center drop-shadow-xl mb-4">
              THE LEDGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">GUYS</span>
            </h2>
            
            {/* Animated Loading Text with Bouncing Dots */}
            <div className="flex flex-col items-center justify-center mt-2">
              <div className="flex items-baseline space-x-1 text-sm font-bold tracking-[0.2em] uppercase">
                <span className="text-slate-300">Initializing Workspace</span>
                <div className="flex space-x-1 ml-1">
                  <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce text-[#D4AF37]" style={{ animationDelay: '300ms' }}>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. MOBILE TOP NAVBAR --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a1d37] shadow-md z-[90] flex items-center justify-between px-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <img 
            src="./logo.jpg" 
            alt="The Ledger Guys Logo" 
            className="w-8 h-8 rounded-full border-2 border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.3)] bg-white object-cover" 
          />
          <h1 className="font-bold text-white tracking-wider text-sm sm:text-base">
            THE LEDGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">GUYS</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-1 text-[#D4AF37] hover:bg-slate-800 rounded-md transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* --- 3. SIDEBAR NAVIGATION --- */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* --- 4. MOBILE BACKGROUND OVERLAY --- */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[95] backdrop-blur-sm transition-all"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      
      {/* --- 5. MAIN CONTENT AREA --- */}
      {/* FIX 2: 'h-screen' aur 'overflow-y-auto' yahan lagaya taake content aaraam se scroll ho */}
      <div 
        className={`flex-1 h-screen overflow-y-auto transition-all duration-500 ease-in-out pt-16 md:pt-0 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        } ml-0`}
      >
        {/* FIX 3: 'min-h-full' rakha taake main body flexible rahay */}
        <main className="min-h-full p-4 sm:p-6 md:p-10 xl:p-12">
          
          {/* DYNAMIC ANIMATION LOGIC:
            - showOverlay true hai (yani pehli baar loading): 2.5s wait
            - showOverlay false hai (yani tab change): 0s wait, fauran load
          */}
          <div 
            key={activeTab} 
            className="w-full max-w-7xl mx-auto opacity-0"
            style={{ 
              animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: showOverlay ? '2.5s' : '0s' 
            }}
          >
            {children}
          </div>
        </main>
      </div>

      {/* --- 6. GLOBAL STYLES & ANIMATIONS --- */}
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