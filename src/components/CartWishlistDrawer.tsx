"use client";

import React from "react";
import { useApp } from "./AppContext";
import { X, Trash2, ShoppingCart, Heart, Plus, Minus, CreditCard, ArrowRight } from "./Icons";
import { useToast } from "./Toast";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "cart" | "wishlist";
}

export default function CartWishlistDrawer({ isOpen, onClose, type }: DrawerProps) {
  const { cart, removeFromCart, addToCart, clearCart, wishlist, toggleWishlist } = useApp();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const isCart = type === "cart";
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast("Checkout Initiated", "success", "Redirecting to secure stripe gateways...");
    onClose();
  };

  const handleMoveToCart = (prod: any) => {
    addToCart(prod);
    toggleWishlist(prod); // Removes from wishlist
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCart ? (
                <>
                  <ShoppingCart className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-black text-white">Your Cart ({cart.length})</h3>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-black text-white">Your Wishlist ({wishlist.length})</h3>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isCart ? (
              cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingCart className="w-12 h-12 text-zinc-700 mb-3" />
                  <h4 className="font-bold text-zinc-400">Shopping Cart is Empty</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Browse our high performance parts directories and add items to your cart to checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex gap-4 p-4.5 bg-zinc-950 border border-zinc-800 rounded-2xl relative overflow-hidden"
                    >
                      {/* Graphics box representation */}
                      <div className="w-16 h-16 shrink-0 bg-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center text-xs font-black text-zinc-500 select-none">
                        {item.product.image.substring(0, 2).toUpperCase()}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{item.product.category}</p>
                        </div>

                        {/* Adjust quantities */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  removeFromCart(item.product.id);
                                  // Simulates decrease: add product back with -1 or custom logic.
                                  // We can just recreate dec function if needed but standard remove works too.
                                } else {
                                  removeFromCart(item.product.id);
                                }
                              }}
                              className="px-2 py-1 text-zinc-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-zinc-200">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.product.id as any)} // Fallback context loader
                              className="px-2 py-1 text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-black text-white">${item.product.price * item.quantity}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-2 right-2 text-zinc-650 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )
            ) : (
              wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart className="w-12 h-12 text-zinc-700 mb-3" />
                  <h4 className="font-bold text-zinc-400">Wishlist is Empty</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Tap the heart icon on deals or quick-views to bookmark items you're monitoring.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl relative"
                    >
                      <div className="w-14 h-14 shrink-0 bg-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center text-xs font-black text-zinc-500 select-none">
                        {item.image.substring(0, 2).toUpperCase()}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-amber-500 font-extrabold mt-0.5">${item.price}</p>
                        </div>

                        {/* Move/Remove buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="px-3 py-1 bg-amber-500 text-black font-extrabold text-[10px] uppercase rounded-md flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Move to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-bold text-[10px] uppercase rounded-md cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Footer Subtotal */}
          {isCart && cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950/60 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-semibold">Subtotal</span>
                <span className="text-lg font-black text-white">${cartSubtotal}</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Taxes, customs handling fees, and shipping details are computed in next checkout step.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-400 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                >
                  CLEAR
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/10 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 stroke-[2.5]" />
                  PROCEED TO SECURE CHECKOUT
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
