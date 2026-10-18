import React from 'react';
import { BookOpen, Sliders, Laptop, GitBranch } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenMixer: () => void;
  onToggleMockup: () => void;
  onNavigateSection: (index: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onOpenMixer,
  onToggleMockup,
  onNavigateSection,
}) => {
  return (
    <footer className="w-full bg-[#1b1511] text-[#faf6f0] border-t border-neutral-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <span className="font-editorial text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-1">
              SW<span className="font-sans italic font-normal text-amber-500">i</span>RL
            </span>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm">
              Artisan honey swirl kinetic design laboratory. Inspired by enkywebstudio creative aesthetics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-persian">راهنمای دیپلوی کلادفلر و گیت‌هاب</span>
            </button>

            <button
              onClick={onOpenMixer}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium tracking-wide transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Lab Studio</span>
            </button>

            <button
              onClick={onToggleMockup}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium tracking-wide transition-colors cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5 text-amber-400" />
              <span>Toggle MacBook View</span>
            </button>
          </div>
        </div>

        {/* Links Column */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-2">
            <h5 className="font-mono text-neutral-400 uppercase tracking-widest text-[10px]">
              Swirl Sections
            </h5>
            <ul className="space-y-1.5 text-neutral-300">
              <li>
                <button
                  onClick={() => onNavigateSection(0)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Section 1: The Spin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection(1)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Section 2: Mix It Up (Infinity)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection(2)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Section 3: The Daily Sip
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-mono text-neutral-400 uppercase tracking-widest text-[10px]">
              Technology Stack
            </h5>
            <ul className="space-y-1.5 text-neutral-400 font-mono text-[11px]">
              <li>Three.js WebGL Engine</li>
              <li>Parametric Lemniscate Spline</li>
              <li>Web Audio ASMR Synthesis</li>
              <li>Vite + React 19 + Tailwind CSS</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-mono text-neutral-400 uppercase tracking-widest text-[10px]">
              Deployment Ready
            </h5>
            <ul className="space-y-1.5 text-neutral-400 text-xs">
              <li>Cloudflare Pages 100% Compatible</li>
              <li>GitHub Continuous Deployment</li>
              <li>Zero-lag Keyframe Video Scrubbing</li>
              <li>SPA 200 Rewrite Ready</li>
            </ul>
          </div>

          <div className="space-y-2 font-persian">
            <h5 className="font-mono text-neutral-400 uppercase tracking-widest text-[10px]">
              پاسخ به سوال کاربر
            </h5>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              تمامی ویدیوها و فایل‌های عسل شما با دستورات راهنما بهینه و روی گیت‌هاب و کلادفلر بدون هیچ لگی اجرا خواهند شد.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 SWiRL Artisan Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <GitBranch className="w-3.5 h-3.5 text-amber-500" />
              <span>Deploy to Cloudflare Pages via GitHub</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
