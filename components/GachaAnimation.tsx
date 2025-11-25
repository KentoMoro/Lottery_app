import React, { useEffect, useState } from 'react';

export const GachaAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Staging the animation for more impact
    const t1 = setTimeout(() => setStage(1), 500); // Initial charge
    const t2 = setTimeout(() => setStage(2), 2000); // Speed up
    const t3 = setTimeout(() => setStage(3), 3500); // Critical flash (White out start)
    const t4 = setTimeout(() => setStage(4), 5000); // Full White Hold (Wait for transition)
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Background Rays */}
      <div className={`absolute inset-0 flex items-center justify-center opacity-50 ${stage >= 1 ? 'animate-spin-slow' : ''}`}>
        <div className="w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,transparent_0deg,#4f46e5_20deg,transparent_40deg,#ec4899_60deg,transparent_80deg,#4f46e5_100deg,transparent_120deg,#ec4899_140deg,transparent_160deg,#4f46e5_180deg,transparent_200deg,#ec4899_220deg,transparent_240deg,#4f46e5_260deg,transparent_280deg,#ec4899_300deg,transparent_320deg,#4f46e5_340deg,transparent_360deg)] opacity-30 blur-xl"></div>
      </div>

      {/* Central Core */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-cyan-400 rounded-full blur-md transition-all duration-1000 ${stage >= 1 ? 'scale-110 border-opacity-100' : 'scale-0 border-opacity-0'} ${stage >= 3 ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {/* Inner Ring Spinning */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-pink-500 rounded-full transition-all duration-[3000ms] ${stage >= 1 ? 'rotate-[720deg] scale-100 opacity-100' : 'rotate-0 scale-0 opacity-0'} ${stage >= 3 ? 'opacity-0' : 'opacity-100'}`}></div>

        {/* Core Orb */}
        <div className={`w-32 h-32 rounded-full bg-white shadow-[0_0_60px_20px_rgba(255,255,255,0.8)] animate-pulse transition-all 
          ${stage >= 4 
            ? 'scale-[150] opacity-100 duration-100' // Maintain White! Do not fade out to black.
            : stage >= 3 
              ? 'scale-[150] opacity-100 duration-[200ms] ease-in' // Rapid expansion to white
              : 'scale-100 opacity-100 duration-500' // Normal state
          }`}>
        </div>
        
        {/* Particles - Hide after flash starts */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {stage >= 2 && stage < 3 && (
                <>
                    <div className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047] animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite] -top-10 left-0"></div>
                    <div className="absolute w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9] animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite] top-10 -right-10"></div>
                    <div className="absolute w-2 h-2 bg-pink-300 rounded-full shadow-[0_0_10px_#f9a8d4] animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite] -bottom-10 left-5"></div>
                </>
            )}
        </div>
      </div>

      {/* Text Effect */}
      <div className={`absolute bottom-20 text-4xl font-gaming font-bold text-white tracking-widest transition-opacity duration-300 ${stage >= 3 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
        DRAWING...
      </div>
    </div>
  );
};