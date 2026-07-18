"use client";

import React from "react";
import { Landmark, Compass, Users2, Award } from "./Icons";

export default function Stats() {
  const stats = [
    {
      icon: Compass,
      val: "500,000+",
      label: "Parts Cataloged",
      desc: "Full coverage of major passenger car & sportbike models.",
      color: "text-amber-500",
      bgGlow: "from-amber-500/5 to-transparent"
    },
    {
      icon: Award,
      val: "99.8%",
      label: "On-Time Dispatch Rate",
      desc: "Supported by automated smart warehousing hubs.",
      color: "text-rose-500",
      bgGlow: "from-rose-500/5 to-transparent"
    },
    {
      icon: Users2,
      val: "1.2 Million+",
      label: "Active Customers",
      desc: "Trusted by professional racing teams & local garages.",
      color: "text-blue-500",
      bgGlow: "from-blue-500/5 to-transparent"
    },
    {
      icon: Landmark,
      val: "200+",
      label: "Authorized Brands",
      desc: "Direct distributions from Brembo, Akrapovič, NGK, Öhlins.",
      color: "text-emerald-500",
      bgGlow: "from-emerald-500/5 to-transparent"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      
      {/* Background glowing accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[100px]" />
      <div className="absolute bottom-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div 
                key={idx}
                className="group relative bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/80 overflow-hidden flex flex-col items-center text-center hover:-translate-y-1"
              >
                
                {/* Glow backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Floating animated corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-zinc-800 to-transparent opacity-30 group-hover:opacity-100 transition-opacity rounded-bl-xl" />

                {/* Icon wrapper */}
                <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl mb-4 text-zinc-400 group-hover:text-white transition-colors duration-300">
                  <Icon className={`w-5 h-5 ${stat.color} stroke-[1.8]`} />
                </div>

                {/* Value counter */}
                <span className="text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform">
                  {stat.val}
                </span>

                {/* Title */}
                <h4 className="text-sm font-bold text-zinc-200 mt-2">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed max-w-xs">
                  {stat.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
