import React, { useState } from 'react';
import { Search, ShoppingBag, Volume2, VolumeX, BookOpen, Sliders, Laptop, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface HeaderProps {
  activeSectionIndex: number;
  onNavigateSection: (index: number) => void;
  onOpenMixer: () => void;
  onOpenCart: () => void;
  onOpenGuide: () => void;
  cartCount: number;
  isMockupMode: boolean;
  onToggleMockup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSectionIndex,
  onNavigateSection,
  onOpenMixer,
  onOpenCart,
  onOpenGuide,
  cartCount,
  isMockupMode,
  onToggleMockup,
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSound = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f4efe6]/85 backdrop-blur-md border-b border-[#e5dcd0]/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo matching screenshot */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigateSection(0)}
            className="group text-left cursor-pointer transition-transform active:scale-95"
          >
            <span className="font-editorial text-2xl md:text-3xl font-black tracking-tight text-[#1e1714] flex items-center gap-1">
              SW<span className="font-sans italic font-normal text-amber-700">i</span>RL
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-mono text-neutral-500 block -mt-1">
              Honey & Caramel Lab
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#382f29]">
            <button
              onClick={() => onNavigateSection(0)}
              className={`transition-colors cursor-pointer pb-0.5 ${
                activeSectionIndex === 0
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'hover:text-amber-700'
              }`}
            >
              The Spin
            </button>
            <button
              onClick={() => onNavigateSection(1)}
              className={`transition-colors cursor-pointer pb-0.5 ${
                activeSectionIndex === 1
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'hover:text-amber-700'
              }`}
            >
              Mix It Up
            </button>
            <button
              onClick={() => onNavigateSection(2)}
              className={`transition-colors cursor-pointer pb-0.5 ${
                activeSectionIndex === 2
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'hover:text-amber-700'
              }`}
            >
              The Sip
            </button>
            <button
              onClick={onOpenMixer}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ebe1d2] hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-amber-700" />
              <span>Lab Studio</span>
            </button>
          </nav>
        </div>

        {/* Right side controls matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Guide Button specifically for user's question! */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-[11px] font-medium shadow-sm transition-all hover:scale-105 cursor-pointer ring-2 ring-amber-400/40"
            title="راهنمای ساخت، اسکرول سه‌بعدی و دیپلوی روی Cloudflare Pages"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-persian font-semibold">راهنمای ساخت و دیپلوی</span>
          </button>

          {/* Search Pill dropdown (matches screenshot `SEARCH v`) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#d6c9ba] text-[#2c231f] text-[10px] font-semibold tracking-widest uppercase transition-all shadow-sm cursor-pointer"
            >
              <span>Search</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f4efe6] rounded-xl">
                  <Search className="w-3.5 h-3.5 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search honey, notes, brews..."
                    className="w-full bg-transparent text-xs text-neutral-800 outline-none placeholder:text-neutral-400"
                    autoFocus
                  />
                </div>
                <div className="mt-2 text-[10px] text-neutral-500 flex flex-wrap gap-1 px-1">
                  <span className="font-semibold text-neutral-700">Trending:</span>
                  <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-amber-100">
                    Mountain Raw
                  </span>
                  <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-amber-100">
                    Caramel Swirl
                  </span>
                  <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-amber-100">
                    Ethiopian Guji
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sound ASMR toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-sm'
                : 'bg-white/60 border-[#d6c9ba] text-neutral-600 hover:text-neutral-900 hover:bg-white'
            }`}
            title={isMuted ? 'Turn on Ambient ASMR' : 'Mute Ambient Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          </button>

          {/* Device Mockup Toggle */}
          <button
            onClick={onToggleMockup}
            className={`hidden md:flex p-2 rounded-full border transition-all cursor-pointer ${
              isMockupMode
                ? 'bg-[#1e1714] text-white border-neutral-700'
                : 'bg-white/60 border-[#d6c9ba] text-neutral-600 hover:text-neutral-900 hover:bg-white'
            }`}
            title={isMockupMode ? 'Exit MacBook Frame' : 'View in MacBook Frame'}
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>

          {/* Shopping Bag Button with count badge (matching screenshot bag icon) */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-[#1e1714] text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
