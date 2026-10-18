import React, { useState } from 'react';
import { SwirlSection, MixerSettings } from '../types';
import { ThreeSwirlCanvas } from './ThreeSwirlCanvas';
import { HotspotPin } from './HotspotPin';
import { soundManager } from '../utils/soundManager';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Droplets,
  RotateCw,
  Compass,
} from 'lucide-react';

interface HeroSectionProps {
  sections: SwirlSection[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  mixerSettings: MixerSettings;
  onOpenMixer: () => void;
  onOpenReserve: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  sections,
  currentIndex,
  onSelectIndex,
  mixerSettings,
  onOpenMixer,
  onOpenReserve,
}) => {
  const currentSection = sections[currentIndex];
  const [spinTrigger, setSpinTrigger] = useState(0);

  const handleNext = () => {
    soundManager.playSwirlWhoosh();
    onSelectIndex((currentIndex + 1) % sections.length);
  };

  const handlePrev = () => {
    soundManager.playSwirlWhoosh();
    onSelectIndex((currentIndex - 1 + sections.length) % sections.length);
  };

  const handleTakeASpin = () => {
    soundManager.playSwirlWhoosh();
    soundManager.playHoneyDrip();
    setSpinTrigger((prev) => prev + 1);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden bg-[#f4efe6] select-none">
      
      {/* Decorative luxury editorial ambient lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ded4c3]/40 to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#ded4c3]/30 to-transparent" />
        {/* Soft radial golden sheen behind center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-200/25 via-orange-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex-1 flex flex-col justify-center">
        
        {/* Top Section Tag (matches screenshot "SECTION 1 - THE SPIN" / "THE MIX 2") */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-amber-800" />
            <span className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.24em] text-neutral-600 uppercase">
              {currentSection.tag}
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-neutral-400">
            0{currentIndex + 1} / 0{sections.length}
          </div>
        </div>

        {/* Center Stage Grid: Left Headline, Center 3D Canvas, Right Details */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-4 min-h-[460px] md:min-h-[540px]">
          
          {/* Left Column: Big Editorial Serif Headline */}
          <div className="lg:col-span-4 z-20 space-y-4 text-left pointer-events-auto">
            <div className="space-y-1">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[0.98] tracking-tight text-[#1b1511] font-bold">
                {currentSection.title}
                <br />
                <span className="italic font-normal text-amber-900 block mt-1">
                  {currentSection.titleHighlight}
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#4d3f37] max-w-sm leading-relaxed font-normal">
              {currentSection.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleTakeASpin}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1b1511] text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:scale-105 cursor-pointer active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>{currentSection.buttonText}</span>
              </button>

              <button
                onClick={onOpenMixer}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/70 hover:bg-white text-neutral-800 text-xs font-medium tracking-wide border border-[#d8cdbe] transition-all hover:scale-105 cursor-pointer"
              >
                <Droplets className="w-3.5 h-3.5 text-amber-600" />
                <span>Adjust Viscosity</span>
              </button>
            </div>

            {/* Tasting Notes Tags */}
            <div className="pt-3">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-1.5">
                Flavor Profile & Aroma:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentSection.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#ebe2d3]/80 border border-[#ded5c5] text-[#382f29]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: 3D Interactive WebGL Swirl Canvas + Hotspots */}
          <div className="lg:col-span-8 relative w-full h-[380px] sm:h-[460px] md:h-[520px] flex items-center justify-center">
            
            {/* Real-time 3D Three.js Liquid Canvas */}
            <ThreeSwirlCanvas
              mode={currentSection.mode}
              mixerSettings={mixerSettings}
              spinTrigger={spinTrigger}
            />

            {/* Dynamic Hotspot Pins matching the screenshot */}
            <div className="absolute inset-0 pointer-events-none">
              {currentSection.hotspots.map((hotspot) => (
                <HotspotPin
                  key={hotspot.id}
                  hotspot={hotspot}
                  onClickDetail={() => soundManager.playHoneyDrip()}
                />
              ))}
            </div>

            {/* Left & Right Navigation Arrows matching screenshot */}
            <button
              onClick={handlePrev}
              className="absolute left-1 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 border border-[#ded5c6] shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer z-20"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 border border-[#ded5c6] shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer z-20"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching screenshot pagination & controls */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-[#e5dcd0] flex items-center justify-between">
        
        {/* Pagination Dashes / Dots `_ _ _ _` (matching screenshot) */}
        <div className="flex items-center gap-3">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                soundManager.playChime(380 + idx * 60, 'sine', 0.2);
                onSelectIndex(idx);
              }}
              className="group py-2 cursor-pointer flex items-center gap-2"
            >
              <span
                className={`h-0.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-10 bg-amber-800'
                    : 'w-5 bg-neutral-300 group-hover:bg-neutral-500'
                }`}
              />
              <span
                className={`text-[9px] font-mono transition-opacity ${
                  currentIndex === idx ? 'opacity-100 text-amber-900 font-bold' : 'opacity-0'
                }`}
              >
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Center Scroll / Step label (matches screenshot "SCROLL 1") */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
          <span>Mode: {currentSection.mode.replace('-', ' ')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
          <span>Interactive 3D WebGL</span>
        </div>

        {/* Floating Magnifier Circle Button (matching bottom right search lens from screenshot) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReserve}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-neutral-800 border border-[#d6c9ba] text-[11px] font-medium tracking-wide transition-all shadow-sm cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Explore</span> Reserve
          </button>

          <button
            onClick={onOpenReserve}
            className="w-9 h-9 rounded-full bg-[#1b1511] text-white flex items-center justify-center hover:bg-neutral-800 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Inspect Collection"
          >
            <Search className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
