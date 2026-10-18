import { useState } from 'react';
import { SWIRL_SECTIONS, PRODUCTS } from './data/mockData';
import { MixerSettings, ProductItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MacBookFrame } from './components/MacBookFrame';
import { StoryAndTastingSection } from './components/StoryAndTastingSection';
import { InteractiveMixer } from './components/InteractiveMixer';
import { ProductDrawer } from './components/ProductDrawer';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Footer } from './components/Footer';
import { soundManager } from './utils/soundManager';
import { Sparkles, HelpCircle, X, Star } from 'lucide-react';

interface CartItem extends ProductItem {
  quantity: number;
}

export default function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isMockupMode, setIsMockupMode] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [showPersianNotice, setShowPersianNotice] = useState(true);

  // Mixer Laboratory Settings
  const [mixerSettings, setMixerSettings] = useState<MixerSettings>({
    honeyType: 'caramel',
    viscosity: 7,
    swirlSpeed: 1.0,
    roastLevel: 3,
    iceLevel: 4,
    glowIntensity: 1.2,
  });

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      ...PRODUCTS[0],
      quantity: 1,
    },
  ]);

  const handleAddToCart = (product: ProductItem) => {
    soundManager.playHoneyDrip();
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    soundManager.playHoneyDrip();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const websiteContent = (
    <div className="relative min-h-screen flex flex-col bg-[#f4efe6] text-[#1e1714]">
      {/* Persian Welcome & Guide Alert Banner */}
      {showPersianNotice && (
        <div className="bg-gradient-to-r from-[#241a14] via-[#35251c] to-[#241a14] text-white px-4 py-2.5 text-xs font-persian flex items-center justify-between border-b border-amber-900/40 relative z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <p className="text-[11px] sm:text-xs">
              <strong className="text-amber-400 font-bold ml-1">پاسخ به سوال شما:</strong>
              سایت درخواستی با انیمیشن‌های ۳ بعدی عسل، روبان بی‌نهایت، و کنترل ماوس آماده شد! برای یادگیری راز ساخت و حل مشکل دیپلوی کلادفلر، روی دکمه راهنما کلیک کنید.
            </p>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-1 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              مشاهده راهنما و رفع مشکل
            </button>
          </div>
          <button
            onClick={() => setShowPersianNotice(false)}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeSectionIndex={activeSectionIndex}
        onNavigateSection={(idx) => {
          soundManager.playSwirlWhoosh();
          setActiveSectionIndex(idx);
        }}
        onOpenMixer={() => setIsMixerOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        cartCount={totalCartCount}
        isMockupMode={isMockupMode}
        onToggleMockup={() => setIsMockupMode(!isMockupMode)}
      />

      {/* Hero 3D Kinetic Section (Matches Section 1, 2, 3 from the video screenshots) */}
      <main className="flex-1">
        <HeroSection
          sections={SWIRL_SECTIONS}
          currentIndex={activeSectionIndex}
          onSelectIndex={(idx) => setActiveSectionIndex(idx)}
          mixerSettings={mixerSettings}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenReserve={() => setIsCartOpen(true)}
        />

        {/* Story & Tasting Section */}
        <StoryAndTastingSection
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          onSelectSectionMode={(idx) => setActiveSectionIndex(idx)}
          mixerSettings={mixerSettings}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenMixer={() => setIsMixerOpen(true)}
        onToggleMockup={() => setIsMockupMode(!isMockupMode)}
        onNavigateSection={(idx) => {
          setActiveSectionIndex(idx);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );

  return (
    <>
      {/* Either display inside the realistic MacBook Pro mockup or as full-bleed edge-to-edge */}
      <MacBookFrame
        isMockupMode={isMockupMode}
        onToggleMockup={() => setIsMockupMode(!isMockupMode)}
      >
        {websiteContent}
      </MacBookFrame>

      {/* Interactive Swirl & Viscosity Mixer Modal */}
      <InteractiveMixer
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        settings={mixerSettings}
        onChangeSettings={(newSettings) => setMixerSettings(newSettings)}
        onTriggerSpin={() => {
          soundManager.playSwirlWhoosh();
        }}
      />

      {/* Reserve Products & Cart Drawer */}
      <ProductDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        products={PRODUCTS}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />

      {/* Comprehensive Deployment & Video Scrubbing Guide Modal (In Persian & English) */}
      <DeploymentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#ded5c5] shadow-2xl overflow-hidden p-6 text-[#1e1714]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase">
                {selectedProduct.category}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-40 h-40 rounded-2xl object-cover bg-neutral-100 shadow-md"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedProduct.rating} / 5.0 Rating</span>
                </div>
                <h3 className="font-editorial text-xl font-bold">{selectedProduct.name}</h3>
                <p className="text-xs text-neutral-500 font-persian">
                  {selectedProduct.persianName}
                </p>
                <div className="text-lg font-bold text-amber-900">
                  ${selectedProduct.price}{' '}
                  <span className="text-xs font-normal text-neutral-500">
                    ({selectedProduct.volume})
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Tasting Notes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#ded5c5] text-neutral-700"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                  setIsCartOpen(true);
                }}
                className="flex-1 py-3 rounded-full bg-[#1e1714] hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Add to Reserve Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Persian Help Guide trigger in bottom left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsGuideOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#d6c9ba] text-[#1e1714] text-xs font-medium shadow-lg hover:shadow-xl hover:border-amber-600 hover:scale-105 transition-all cursor-pointer font-persian"
        >
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>راهنمای دیپلوی و ساخت</span>
        </button>
      </div>
    </>
  );
}
