"use client";

import React, { useState } from "react";
import { useApp, Product } from "./AppContext";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye, 
  X, 
  Check, 
  ShieldCheck, 
  Truck,
  RotateCcw,
  Sparkles
} from "./Icons";

export default function HotDeals() {
  const { addToCart, toggleWishlist, isInWishlist, activeVehicle } = useApp();
  const [activeTab, setActiveTab] = useState<"deals" | "new" | "featured">("deals");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "Brembo Drilled Performance Brake Rotors (Pair)",
      category: "Brake Systems",
      price: 290,
      originalPrice: 360,
      rating: 4.9,
      reviewsCount: 84,
      image: "Brembo Rotors",
      compatVehicle: [
        { make: "Toyota", model: "Supra" },
        { make: "Toyota", model: "GR Yaris" },
        { make: "Honda", model: "Civic Type R" },
        { make: "BMW", model: "M4 GTS" }
      ],
      isBikePart: false
    },
    {
      id: "2",
      name: "Akrapovič Carbon Fiber Racing Slip-On Exhaust",
      category: "Exhaust Systems",
      price: 680,
      originalPrice: 850,
      rating: 5.0,
      reviewsCount: 42,
      image: "Carbon Exhaust",
      compatVehicle: [
        { make: "Yamaha", model: "YZF-R1" },
        { make: "Yamaha", model: "YZF-R6" },
        { make: "Kawasaki", model: "ZX-10R" }
      ],
      isBikePart: true
    },
    {
      id: "3",
      name: "HKS Hipermax S Adjustable Coilover Suspension Kit",
      category: "Suspension & Tuning",
      price: 1420,
      originalPrice: 1680,
      rating: 4.8,
      reviewsCount: 29,
      image: "Coilovers",
      compatVehicle: [
        { make: "Toyota", model: "Supra" },
        { make: "Honda", model: "Civic Type R" },
        { make: "BMW", model: "M4 GTS" }
      ],
      isBikePart: false
    },
    {
      id: "4",
      name: "NGK Laser Iridium Spark Plugs (Set of 4)",
      category: "Engine Components",
      price: 52,
      originalPrice: 70,
      rating: 4.9,
      reviewsCount: 248,
      image: "Spark Plugs",
      compatVehicle: [
        { make: "Toyota", model: "Supra" },
        { make: "Toyota", model: "Camry" },
        { make: "Honda", model: "Civic Type R" },
        { make: "Honda", model: "Accord" },
        { make: "Ford", model: "Mustang Shelby" }
      ],
      isBikePart: false
    },
    {
      id: "5",
      name: "Öhlins TTX GP Rear Mono Shock Absorber",
      category: "Suspension & Tuning",
      price: 1150,
      originalPrice: 1350,
      rating: 5.0,
      reviewsCount: 18,
      image: "Ohlins Shock",
      compatVehicle: [
        { make: "Yamaha", model: "YZF-R1" },
        { make: "Kawasaki", model: "ZX-10R" },
        { make: "Ducati", model: "Panigale V4 S" }
      ],
      isBikePart: true
    },
    {
      id: "6",
      name: "K&N Cold Air High-Flow Intake System",
      category: "Engine Components",
      price: 340,
      originalPrice: 420,
      rating: 4.7,
      reviewsCount: 116,
      image: "Air Intake",
      compatVehicle: [
        { make: "Toyota", model: "Supra" },
        { make: "BMW", model: "M4 GTS" },
        { make: "Ford", model: "Mustang Shelby" },
        { make: "Ford", model: "F-150 Raptor" }
      ],
      isBikePart: false
    }
  ];

  // Helper check compatibility
  const checkCompatibility = (prod: Product) => {
    if (!activeVehicle) return null;
    const match = prod.compatVehicle?.some(
      (v) => v.make === activeVehicle.make && v.model === activeVehicle.model
    );
    return match ? "Compatible" : "Incompatible";
  };

  // Filter products by tabs
  const getTabProducts = () => {
    switch (activeTab) {
      case "new":
        return products.slice(3, 6);
      case "featured":
        return [products[0], products[2], products[4]];
      case "deals":
      default:
        return products;
    }
  };

  const filteredProducts = getTabProducts();

  return (
    <section id="shop" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Title and Tabs Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
              Hot Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Featured Components & Deals
            </h2>
            <p className="mt-3.5 text-zinc-400 text-sm">
              Premium quality aftermarket racing gear and OEM replacements. Tap details to review technical specifications.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-zinc-900/60 p-1 border border-zinc-800 rounded-xl max-w-sm self-start lg:self-end">
            <button
              onClick={() => setActiveTab("deals")}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "deals" ? "bg-amber-500 text-black shadow-md" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Weekly Deals
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "new" ? "bg-amber-500 text-black shadow-md" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "featured" ? "bg-amber-500 text-black shadow-md" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Bestsellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const isWishlisted = isInWishlist(prod.id);
            const fitStatus = checkCompatibility(prod);
            const discount = prod.originalPrice 
              ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) 
              : 0;

            return (
              <div 
                key={prod.id}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 relative"
              >
                
                {/* Sale Tag */}
                {discount > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md">
                    -{discount}% OFF
                  </span>
                )}

                {/* Product Render Placeholder graphic block (CSS mesh styled) */}
                <div className="w-full h-48 bg-zinc-950 flex flex-col justify-center items-center relative overflow-hidden p-6 border-b border-zinc-800/80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
                  
                  {/* Glowing core background */}
                  <div className="w-24 h-24 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
                    <span className="text-zinc-600 group-hover:text-amber-500/80 font-black text-2xl transition-colors select-none">
                      {prod.image.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Overlaid Actions (Quick View / Hover) */}
                  <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3.5 z-20">
                    <button
                      onClick={() => setQuickViewProduct(prod)}
                      className="p-3 bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
                      title="Quick View Product Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod)}
                      className={`p-3 border rounded-full transition-all cursor-pointer ${
                        isWishlisted 
                          ? "bg-amber-500/20 border-amber-500 text-amber-400" 
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                {/* Product Descriptions and Fitment Indicators */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    {/* Category Name */}
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {prod.category}
                      </span>

                      {/* Motorcycle vs Car Icon Indicator */}
                      <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                        {prod.isBikePart ? "Bike Part" : "Car Part"}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {prod.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(prod.rating) ? "fill-amber-500" : "text-zinc-700"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-400 font-semibold">{prod.rating}</span>
                      <span className="text-[10px] text-zinc-500">({prod.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  {/* Compatibility tag checking */}
                  {activeVehicle && fitStatus && (
                    <div className={`flex items-center gap-1.5 py-1 px-3 rounded-lg border text-xs font-semibold self-start ${
                      fitStatus === "Compatible"
                        ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}>
                      <Check className={`w-3.5 h-3.5 ${fitStatus === "Compatible" ? "text-emerald-400" : "text-zinc-500"}`} />
                      <span>
                        {fitStatus === "Compatible" 
                          ? `Fits Your ${activeVehicle.make} ${activeVehicle.model}` 
                          : `Doesn't fit ${activeVehicle.make} ${activeVehicle.model}`}
                      </span>
                    </div>
                  )}

                  {/* Price and Cart Buttons */}
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-zinc-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-white">${prod.price}</span>
                      {prod.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">${prod.originalPrice}</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(prod)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/5 active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                      ADD
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* QUICK VIEW ACCORDION OVERLAY MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/5 blur-[80px]" />
            
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-4">
              
              {/* Product Visual graphic block */}
              <div className="bg-zinc-950 rounded-2xl h-56 flex flex-col justify-center items-center border border-zinc-850 relative overflow-hidden">
                <span className="text-zinc-800 font-extrabold text-4xl select-none">
                  {quickViewProduct.image.substring(0, 2).toUpperCase()}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black mt-2">
                  DriveMax Premium Tech Catalog
                </span>
              </div>

              {/* Product Technical Spec lists */}
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {quickViewProduct.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">${quickViewProduct.price}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through">${quickViewProduct.originalPrice}</span>
                  )}
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Engineered with military-grade premium compounds to ensure ultimate thermal reliability under high pressure. Full installation guides are packaged inside.
                </p>

                {/* Compatibility Checklist */}
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                    Verified Fitment Models
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {quickViewProduct.compatVehicle?.map((veh, i) => (
                      <span key={i} className="text-[10px] font-semibold text-zinc-300 bg-zinc-950 border border-zinc-850 px-2.5 py-1 rounded">
                        {veh.make} {veh.model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Micro guarantees */}
                <div className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Manufacturer 12-Month Replacement Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Ships within 24 Hours with express carrier tracking</span>
                  </div>
                </div>

                {/* Modal actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold rounded-xl text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                    ADD TO SHOPPING CART
                  </button>
                  <button
                    onClick={() => {
                      toggleWishlist(quickViewProduct);
                    }}
                    className={`px-4.5 py-3 rounded-xl border transition-all cursor-pointer ${
                      isInWishlist(quickViewProduct.id)
                        ? "bg-amber-500/20 border-amber-500 text-amber-400"
                        : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isInWishlist(quickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
