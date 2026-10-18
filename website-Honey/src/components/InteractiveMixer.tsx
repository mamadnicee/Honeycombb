import React from 'react';
import { MixerSettings } from '../types';
import { X, Sliders, Droplets, Flame, Sparkles, RotateCw, Check } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface InteractiveMixerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MixerSettings;
  onChangeSettings: (settings: MixerSettings) => void;
  onTriggerSpin: () => void;
}

export const InteractiveMixer: React.FC<InteractiveMixerProps> = ({
  isOpen,
  onClose,
  settings,
  onChangeSettings,
  onTriggerSpin,
}) => {
  if (!isOpen) return null;

  const honeyOptions: {
    id: MixerSettings['honeyType'];
    name: string;
    persianName: string;
    color: string;
    desc: string;
  }[] = [
    {
      id: 'caramel',
      name: 'Toffee Burnt Caramel',
      persianName: 'کارامل سوخته و شهد افرا',
      color: '#c26019',
      desc: 'Rich, glossy, dark roasted sugar profile with amber viscosity.',
    },
    {
      id: 'mountain',
      name: 'Zagros Mountain Raw',
      persianName: 'عسل خام کوهستان زاگرس',
      color: '#d97706',
      desc: 'Deep mountain wildflower nectar, unpasteurized and mineral-rich.',
    },
    {
      id: 'wildflower',
      name: 'Meadow Blossom Gold',
      persianName: 'عسل شکوفه دشت زرین',
      color: '#f59e0b',
      desc: 'Bright golden honey with floral lavender and clover aromatics.',
    },
    {
      id: 'acacia',
      name: 'Crystal Acacia Elixir',
      persianName: 'شهد اقاقیا کریستالی',
      color: '#fbbf24',
      desc: 'High clarity, ultra-smooth fluid with delicate sweetness.',
    },
  ];

  const handleHoneySelect = (type: MixerSettings['honeyType']) => {
    soundManager.playHoneyDrip();
    onChangeSettings({ ...settings, honeyType: type });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#decbb7] shadow-2xl overflow-hidden p-6 text-[#1e1714]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e9ded1]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold">Swirl & Viscosity Studio</h3>
              <p className="text-xs text-neutral-500 font-persian">
                تنظیم زنده غلظت، سرعت چرخش، و نکتار عسل در رندر سه‌بعدی
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Controls */}
        <div className="py-5 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          
          {/* Honey Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 block mb-2.5 flex items-center justify-between">
              <span>Select Nectar / Caramel Base:</span>
              <span className="text-[10px] text-amber-700 font-bold capitalize">
                {settings.honeyType}
              </span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {honeyOptions.map((opt) => {
                const isSelected = settings.honeyType === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleHoneySelect(opt.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-700 bg-amber-50/90 shadow-md ring-2 ring-amber-500/30'
                        : 'border-[#ded4c5] bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                          style={{ backgroundColor: opt.color }}
                        />
                        <span className="text-xs font-semibold text-neutral-900">
                          {opt.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-800" />}
                    </div>
                    <p className="text-[10px] text-neutral-500 line-clamp-2">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-1">
            
            {/* Swirl Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-amber-600" />
                  Swirl Rotation Velocity
                </span>
                <span className="font-mono text-amber-900">{settings.swirlSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={settings.swirlSpeed}
                onChange={(e) =>
                  onChangeSettings({ ...settings, swirlSpeed: parseFloat(e.target.value) })
                }
                className="w-full h-1.5 bg-[#e3d7c5] rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>Gentle Drift</span>
                <span>Hyper Vortex</span>
              </div>
            </div>

            {/* Honey Viscosity / Thickness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-amber-600" />
                  Viscosity (Brix Density)
                </span>
                <span className="font-mono text-amber-900">{settings.viscosity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={settings.viscosity}
                onChange={(e) =>
                  onChangeSettings({ ...settings, viscosity: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-[#e3d7c5] rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>Fluid Runny</span>
                <span>Rich Ribbon</span>
              </div>
            </div>

            {/* Roast Level */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  Espresso Caramelization
                </span>
                <span className="font-mono text-amber-900">{settings.roastLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={settings.roastLevel}
                onChange={(e) =>
                  onChangeSettings({ ...settings, roastLevel: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-[#e3d7c5] rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>Light Gold</span>
                <span>Deep Dark Roast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#e9ded1] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onTriggerSpin();
              soundManager.playSwirlWhoosh();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Test Spin 360°</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#1e1714] hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            Apply & View Swirl
          </button>
        </div>
      </div>
    </div>
  );
};
