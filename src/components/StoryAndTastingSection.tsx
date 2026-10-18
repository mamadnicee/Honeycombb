import React from 'react';
import { ProductItem, MixerSettings } from '../types';
import { Sparkles, Award, ArrowRight, ShieldCheck, Heart, Coffee } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface StoryAndTastingSectionProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onOpenMixer: () => void;
  onOpenGuide: () => void;
  onSelectSectionMode: (modeIndex: number) => void;
  mixerSettings: MixerSettings;
}

export const StoryAndTastingSection: React.FC<StoryAndTastingSectionProps> = ({
  products,
  onSelectProduct,
  onOpenMixer,
  onOpenGuide,
  onSelectSectionMode,
}) => {
  return (
    <section className="w-full bg-[#faf6ef] py-16 md:py-24 border-t border-[#e8ded0] text-[#1e1714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Editorial Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-800 uppercase flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              Artisan Extraction Process
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Where Liquid Amber Meets Roasted Espresso
            </h2>
            <p className="text-xs sm:text-sm text-[#4d3f37] leading-relaxed">
              Every drop is harvested from wild mountain blossoms at high altitude, untouched by artificial heat or filtration. When poured into slow-dripped single origin espresso, the natural viscosity forms a mesmerizing helical suspension.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenMixer}
                className="px-5 py-2.5 rounded-full bg-[#1e1714] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Customize Viscosity In Lab
              </button>
              <button
                onClick={onOpenGuide}
                className="px-5 py-2.5 rounded-full bg-white text-neutral-800 border border-[#d6cbbe] text-xs font-medium tracking-wide hover:bg-neutral-50 transition-all cursor-pointer font-persian"
              >
                آموزش ساخت این انیمیشن‌ها
              </button>
            </div>
          </div>

          {/* Interactive Mode Showcase Cards (Direct link to the 3 video styles) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: The Spin */}
            <div
              onClick={() => {
                soundManager.playSwirlWhoosh();
                onSelectSectionMode(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#ded4c5] hover:border-amber-600 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between h-72"
            >
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-amber-50 relative">
                  <img
                    src="/images/honey-swirl-glass.jpg"
                    alt="The Spin"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-mono tracking-wider">
                    SECTION 01
                  </span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                  The Spiral Glass
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                  Swirling ribbon of golden cane caramel spiraling around ribbed cold brew glass.
                </p>
              </div>
              <div className="flex items-center text-[11px] font-semibold text-amber-800 group-hover:translate-x-1 transition-transform">
                <span>View Mode 1</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Card 2: The Infinity Loop */}
            <div
              onClick={() => {
                soundManager.playSwirlWhoosh();
                onSelectSectionMode(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#ded4c5] hover:border-amber-600 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between h-72"
            >
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-amber-50 relative">
                  <img
                    src="/images/honey-infinity-loop.jpg"
                    alt="Infinity Loop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-mono tracking-wider">
                    SECTION 02
                  </span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                  The Infinity Ribbon
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                  Continuous 3D figure-8 flowing loop with silky milk and espresso infusions.
                </p>
              </div>
              <div className="flex items-center text-[11px] font-semibold text-amber-800 group-hover:translate-x-1 transition-transform">
                <span>View Mode 2</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Card 3: The Sip Vortex */}
            <div
              onClick={() => {
                soundManager.playSwirlWhoosh();
                onSelectSectionMode(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#ded4c5] hover:border-amber-600 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between h-72"
            >
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-amber-50 relative">
                  <img
                    src="/images/honey-vortex-splash.jpg"
                    alt="The Sip Vortex"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-mono tracking-wider">
                    SECTION 03
                  </span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                  The Daily Vortex
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                  Suspended honey droplet splash with centrifugal aroma blending.
                </p>
              </div>
              <div className="flex items-center text-[11px] font-semibold text-amber-800 group-hover:translate-x-1 transition-transform">
                <span>View Mode 3</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

          </div>
        </div>

        {/* Sensory Values Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-[#ebe0d3]">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-editorial text-base font-bold">Cold Extracted</h4>
            <p className="text-[11px] text-neutral-500">
              Never heated above hive temperature (35°C), protecting vital enzymes and royal pollen.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
              <Coffee className="w-4 h-4" />
            </div>
            <h4 className="font-editorial text-base font-bold">Washed Specialty</h4>
            <p className="text-[11px] text-neutral-500">
              Direct-trade single lot beans roasted specifically to match honeyed natural sweetness.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-editorial text-base font-bold">84° Brix Viscosity</h4>
            <p className="text-[11px] text-neutral-500">
              Optimal kinetic density for stable floating swirls that do not immediately dissolve.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="font-editorial text-base font-bold">Sustainably Hived</h4>
            <p className="text-[11px] text-neutral-500">
              Preserving mountain flora ecosystems with ethical bee colonies and zero chemical pesticides.
            </p>
          </div>
        </div>

        {/* Reserve Products Showcase Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                Limited Small-Batch Bottles
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold mt-1">
                The Curated Reserve Cellar
              </h3>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              Each jar is numbered and wax-sealed by hand. Savor straight from the spoon or swirl into specialty brews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="group bg-white rounded-3xl p-4 border border-[#ded5c5] hover:border-amber-700/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-3 relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#1b1511]/85 backdrop-blur-md text-white text-[10px] font-semibold">
                      ${prod.price}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono tracking-wider text-amber-700 uppercase block mb-1">
                    {prod.category}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-persian line-clamp-1 mt-0.5">
                    {prod.persianName}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f4ede2] mt-3 flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-500 text-[11px]">{prod.volume}</span>
                  <span className="flex items-center gap-1 text-amber-800 group-hover:translate-x-1 transition-transform">
                    <span>Taste & Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
