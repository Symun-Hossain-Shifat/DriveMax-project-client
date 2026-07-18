"use client";

import React, { useState } from "react";
import { ShieldCheck, Truck, RotateCcw, Wrench, ArrowRight } from "./Icons";

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: ShieldCheck,
      title: "100% Genuine OEM Guarantee",
      desc: "Every component is certified for optimal fitment, durability, and factory-standard performance specifications.",
      badge: "Certified Parts",
      color: "group-hover:text-amber-500",
      bgGlow: "from-amber-500/10 to-orange-500/5",
      borderColor: "hover:border-amber-500/30",
    },
    {
      icon: Truck,
      title: "Fast & Fully Insured Shipping",
      desc: "Free standard shipping on orders over $99. Direct trackable air-freight options to guarantee swift dispatch.",
      badge: "Insured Transit",
      color: "group-hover:text-blue-500",
      bgGlow: "from-blue-500/10 to-purple-500/5",
      borderColor: "hover:border-blue-500/30",
    },
    {
      icon: RotateCcw,
      title: "30-Day Hassle-Free Returns",
      desc: "Unhappy or ordered the wrong variant? Print our pre-paid return slip and get replacement credit or full refund.",
      badge: "Easy Exchange",
      color: "group-hover:text-emerald-500",
      bgGlow: "from-emerald-500/10 to-teal-500/5",
      borderColor: "hover:border-emerald-500/30",
    },
    {
      icon: Wrench,
      title: "24/7 Expert Technical Support",
      desc: "Unsure about torque specs or thread dimensions? Chat with our certified mechanics for live fitment guidance.",
      badge: "Mechanic Hotline",
      color: "group-hover:text-rose-500",
      bgGlow: "from-rose-500/10 to-red-500/5",
      borderColor: "hover:border-rose-500/30",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden border-b border-zinc-900">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
            DriveMax Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Engineered for Reliability. Built for Speed.
          </h2>
          <p className="mt-3.5 text-zinc-400 text-sm sm:text-base leading-relaxed">
            We bridge the gap between high-performance automotive manufacturing and vehicle owners. Experience premium standard distribution.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 p-6 rounded-2xl transition-all duration-500 ${feat.borderColor} hover:translate-y-[-6px] hover:shadow-2xl shadow-black/50 overflow-hidden`}
              >
                
                {/* Glowing Background Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Animated Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 ${
                    isHovered ? "w-full" : "w-0"
                  }`}
                />

                {/* Badge */}
                <div className="flex justify-between items-center mb-5 relative z-10">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded bg-zinc-950/80 border border-zinc-800 text-zinc-400">
                    {feat.badge}
                  </span>
                </div>

                {/* Icon wrapper */}
                <div className="inline-flex p-3 bg-zinc-950 border border-zinc-800 rounded-xl mb-4 text-zinc-400 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 relative z-10">
                  <IconComponent className={`w-6 h-6 transition-colors duration-300 ${feat.color}`} />
                </div>

                {/* Title and desc */}
                <h3 className="text-lg font-bold text-white mb-2.5 relative z-10 group-hover:text-amber-400 transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 relative z-10">
                  {feat.desc}
                </p>

                {/* Interactive link action */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-amber-500 transition-colors relative z-10 group/link"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
