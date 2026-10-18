import React from 'react';
import { ProductItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, Check, ArrowRight, Star } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface CartItem extends ProductItem {
  quantity: number;
}

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  cart: CartItem[];
  onAddToCart: (product: ProductItem) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  isOpen,
  onClose,
  products,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf7f2] border-l border-[#ded4c5] shadow-2xl flex flex-col text-[#1e1714]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#e8ded0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <div>
                <h3 className="font-editorial text-xl font-bold">Reserve Swirl Boutique</h3>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                  Artisanal Harvests
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
            
            {/* Cart Items Section */}
            {cart.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    Your Selection ({cart.length})
                  </h4>
                </div>

                <div className="divide-y divide-[#ece2d4] bg-white rounded-2xl p-3 border border-[#ded5c5]">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-editorial text-xs font-bold truncate">{item.name}</h5>
                        <p className="text-[11px] text-amber-800 font-semibold">${item.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded bg-[#f4efe6] hover:bg-[#e9e1d2] text-neutral-700"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded bg-[#f4efe6] hover:bg-[#e9e1d2] text-neutral-700"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 bg-white/60 rounded-2xl border border-dashed border-[#ded5c5] p-4">
                <ShoppingBag className="w-8 h-8 text-neutral-300 mx-auto mb-1.5" />
                <p className="text-xs text-neutral-500 font-medium">Your harvest bag is currently empty.</p>
                <p className="text-[11px] text-neutral-400">Select any reserve bottle below to taste.</p>
              </div>
            )}

            {/* Featured Reserve Catalog */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Signature Honey & Swirl Reserve
              </h4>

              <div className="space-y-3">
                {products.map((product) => {
                  const inCart = cart.some((c) => c.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="p-3 rounded-2xl bg-white border border-[#ded5c5] hover:border-amber-600/60 transition-all flex gap-3.5 group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-amber-50 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono tracking-wider text-amber-700 uppercase">
                              {product.category}
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] text-amber-600 font-bold">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              {product.rating}
                            </span>
                          </div>
                          <h5 className="font-editorial text-xs font-bold text-neutral-900 leading-snug">
                            {product.name}
                          </h5>
                          <p className="text-[10px] text-neutral-500 truncate mt-0.5 font-persian">
                            {product.persianName}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-[#1e1714]">
                            ${product.price}{' '}
                            <span className="text-[9px] font-normal text-neutral-400">
                              / {product.volume}
                            </span>
                          </span>

                          <button
                            onClick={() => {
                              soundManager.playHoneyDrip();
                              onAddToCart(product);
                            }}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                              inCart
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-[#1e1714] text-white hover:bg-neutral-800'
                            }`}
                          >
                            {inCart ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e8ded0] bg-white space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-neutral-600 font-normal">Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  soundManager.playChime(640, 'sine', 0.3);
                  alert('Thank you! This is a demo checkout for the SWiRL experience.');
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Reserve Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
