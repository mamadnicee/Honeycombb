import React, { useState } from 'react';
import { Hotspot } from '../types';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface HotspotPinProps {
  hotspot: Hotspot;
  onClickDetail?: (hotspot: Hotspot) => void;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({ hotspot, onClickDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (onClickDetail) {
      onClickDetail(hotspot);
    }
  };

  return (
    <div
      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-20 group"
      style={{ left: `${hotspot.xPercent}%`, top: `${hotspot.yPercent}%` }}
    >
      {/* Pill Badge matching Instagram reel style */}
      <div className="relative flex items-center">
        {/* Pulsing indicator dot */}
        <button
          onClick={handleClick}
          className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4efe6]/90 backdrop-blur-md border border-[#c9bead] shadow-[0_4px_20px_rgba(40,25,15,0.12)] hover:border-[#b45309] hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label={`View details for ${hotspot.name}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
          </span>

          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.16em] uppercase text-[#261e1a] whitespace-nowrap">
            {hotspot.name}
          </span>
        </button>
      </div>

      {/* Floating Detailed Card Popup */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-64 p-3.5 rounded-xl bg-white/95 backdrop-blur-xl border border-[#ded5c6] shadow-[0_12px_32px_rgba(40,25,15,0.18)] z-30 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-start justify-between gap-2 border-b border-[#f0e8db] pb-2 mb-2">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-amber-700 block">
                {hotspot.origin}
              </span>
              <h4 className="font-editorial text-sm font-bold text-[#1e1714]">
                {hotspot.name}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] leading-relaxed text-[#594b43] mb-2.5">
            {hotspot.description}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-[#f4ede3] text-[10px] text-amber-800 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              100% Organic Extraction
            </span>
            <span className="flex items-center text-neutral-500 hover:text-neutral-900 cursor-pointer">
              Notes <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
