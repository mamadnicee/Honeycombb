import React from 'react';
import { Laptop, Maximize2, Minimize2 } from 'lucide-react';

interface MacBookFrameProps {
  children: React.ReactNode;
  isMockupMode: boolean;
  onToggleMockup: () => void;
}

export const MacBookFrame: React.FC<MacBookFrameProps> = ({
  children,
  isMockupMode,
  onToggleMockup,
}) => {
  if (!isMockupMode) {
    return (
      <div className="relative w-full min-h-screen bg-[#f4efe6]">
        {children}
        {/* Floating device switcher pill */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onToggleMockup}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1714] text-white shadow-xl hover:bg-neutral-800 transition-all text-xs font-medium tracking-wide backdrop-blur-md cursor-pointer border border-neutral-700 hover:scale-105"
            title="Switch to MacBook Desk Presentation Mode"
          >
            <Laptop className="w-4 h-4 text-amber-400" />
            <span>MacBook Studio Mode</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#1b1511] relative py-6 md:py-12 px-3 md:px-8 flex flex-col items-center justify-center overflow-x-hidden transition-colors duration-500">
      {/* Background Studio Lighting & Walnut Desk Surface */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a201a] via-[#1b1410] to-[#120d0b] pointer-events-none" />
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#e59323_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Studio Lamp Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Control Toolbar */}
      <div className="relative z-40 mb-4 flex items-center justify-between w-full max-w-6xl px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
            enkywebstudio Mockup Presentation
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMockup}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Switch to Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Realistic MacBook Pro 16" Frame */}
      <div className="relative z-30 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Screen Top Bezel / Display Lid */}
        <div className="w-full rounded-t-[24px] bg-[#0c0d0e] p-[10px] md:p-[14px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] border-t border-l border-r border-[#3a3c40] relative">
          
          {/* Subtle metallic bevel highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Notch & Camera */}
          <div className="absolute top-[10px] md:top-[14px] left-1/2 -translate-x-1/2 w-28 md:w-36 h-4 md:h-5 bg-[#0c0d0e] rounded-b-xl z-50 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#182332] ring-1 ring-[#223042]" />
            <div className="w-1 h-1 rounded-full bg-[#0a141e]" />
          </div>

          {/* Internal Screen Display */}
          <div className="relative w-full aspect-[16/10] bg-[#f4efe6] rounded-[14px] overflow-hidden shadow-inner border border-neutral-900/40">
            {/* Screen Glass Reflection Sheen */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-80" />
            
            {/* Website Content inside screen viewport */}
            <div className="w-full h-full overflow-y-auto no-scrollbar relative">
              {children}
            </div>
          </div>
        </div>

        {/* MacBook Bottom Base / Keyboard Deck in Perspective */}
        <div className="w-[104%] -mt-1 h-5 md:h-7 bg-gradient-to-b from-[#242629] via-[#1b1c1e] to-[#0d0e10] rounded-b-[18px] shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative flex items-center justify-center border-b border-[#303338]">
          {/* Center thumb notch */}
          <div className="w-20 md:w-28 h-1.5 bg-[#141517] rounded-b-md shadow-inner" />
          {/* Subtle reflection on aluminum lip */}
          <div className="absolute inset-x-12 top-0 h-[1px] bg-white/15" />
        </div>

        {/* Desk Contact Shadow */}
        <div className="w-[96%] h-8 bg-black/60 blur-xl -mt-2 rounded-full pointer-events-none" />
      </div>

      {/* Floating Exit Mockup Button */}
      <div className="relative z-40 mt-6 text-center">
        <button
          onClick={onToggleMockup}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-neutral-300 text-xs tracking-wider transition-colors border border-white/10 cursor-pointer"
        >
          <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Exit Mockup / Full Screen Experience</span>
        </button>
      </div>
    </div>
  );
};
