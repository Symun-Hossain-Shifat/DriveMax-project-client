"use client";

import React, { useState, useEffect } from "react";
import { ToastProvider } from "@/components/Toast";
import { AppProvider } from "@/components/AppContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import HotDeals from "@/components/HotDeals";
import Stats from "@/components/Stats";
import GarageTool from "@/components/GarageTool";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import FAQAndNewsletter from "@/components/FAQAndNewsletter";
import Footer from "@/components/Footer";
import CartWishlistDrawer from "@/components/CartWishlistDrawer";

function MainContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"cart" | "wishlist">("cart");

  const openDrawer = (type: "cart" | "wishlist") => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased select-none selection:bg-amber-500 selection:text-black">

      {/* Dynamic Navbar */}
      <Navbar
        onCartClick={() => openDrawer("cart")}
        onWishlistClick={() => openDrawer("wishlist")}
      />

      {/* Hero Header */}
      <Hero />

      {/* Trust & Guarantee features */}
      <Features />

      {/* Parts directory segment */}
      <Categories />

      {/* Featured Deals catalog list */}
      <HotDeals />

      {/* Visual Counters trust metrics */}
      <Stats />

      {/* Garage compatible fitting manager */}
      <GarageTool />

      {/* Verified user quotes reviews */}
      <Testimonials />

      {/* Maintenance DIY news and guides */}
      <Blogs />

      {/* Support FAQ collapsible questions & newsletter signups */}
      <FAQAndNewsletter />

      {/* Directory contact and footer info */}
      <Footer />

      {/* Sliding cart / wishlist drawer */}
      <CartWishlistDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        type={drawerType}
      />

    </div>
  );
}

export default function Home() {
  // Avoid hydration issues by mounting client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-4 animate-pulse">
          Loading DriveMax Store...
        </p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ToastProvider>
  );
}
