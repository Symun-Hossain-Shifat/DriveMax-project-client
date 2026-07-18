"use client";

import React from "react";
import { 
  Wrench, 
  Disc, 
  Flame, 
  CircleDot, 
  Compass, 
  Lightbulb, 
  ArrowRight,
  ShieldAlert
} from "./Icons";
import { useApp } from "./AppContext";

export default function Categories() {
  const { showToast } = useApp() as any; 
  // Let's safe-check context toast trigger or alert directly
  const { activeVehicle } = useApp();

  const categories = [
    {
      id: "engine",
      name: "Engine Components",
      count: "1,420 Parts Available",
      icon: Wrench,
      description: "Pistons, block components, filters, timing chains & custom gasket kits.",
      color: "from-orange-500 to-amber-600",
      shadow: "shadow-orange-500/10",
      forBike: true,
      forCar: true
    },
    {
      id: "brakes",
      name: "Brake Systems",
      count: "840 Parts Available",
      icon: Disc,
      description: "Ceramic pads, drilled rotors, Brembo calipers & braided steel hose lines.",
      color: "from-rose-500 to-red-600",
      shadow: "shadow-red-500/10",
      forBike: true,
      forCar: true
    },
    {
      id: "wheels",
      name: "Wheels & Tires",
      count: "1,120 Parts Available",
      icon: CircleDot,
      description: "Forged alloy rims, track-spec slicks, offroad adventure treads & valves.",
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/10",
      forBike: true,
      forCar: true
    },
    {
      id: "exhaust",
      name: "Exhaust Systems",
      count: "530 Parts Available",
      icon: Flame,
      description: "Titanium exhaust manifolds, mufflers, carbon fiber pipes & catalytic converters.",
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-500/10",
      forBike: true,
      forCar: true
    },
    {
      id: "suspension",
      name: "Suspension & Tuning",
      count: "760 Parts Available",
      icon: Compass,
      description: "Adjustable coilovers, nitrogen shocks, track sway bars & urethane bushings.",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10",
      forBike: true,
      forCar: true
    },
    {
      id: "lighting",
      name: "LED & Halogen Lighting",
      count: "390 Parts Available",
      icon: Lightbulb,
      description: "RGB headlamps, sequential signal lenses, fog projectors & cockpit dials.",
      color: "from-amber-400 to-yellow-500",
      shadow: "shadow-yellow-500/10",
      forBike: true,
      forCar: true
    }
  ];

  // Filter based on active vehicle type (Car or Bike) to demonstrate smart features!
  const filteredCategories = activeVehicle
    ? categories.filter(c => activeVehicle.type === "Car" ? c.forCar : c.forBike)
    : categories;

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900 border-b border-zinc-950 relative overflow-hidden">
      
      {/* Background design accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-orange-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title and stats bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
              Parts Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Browse Catalogs by Category
            </h2>
            <p className="mt-3.5 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore custom-built catalogs tailored to your machine type. Select below to review available components.
            </p>
          </div>

          {/* Active Garage indicator widget in heading */}
          {activeVehicle && (
            <div className="flex items-center gap-3 bg-zinc-950 p-4 border border-zinc-800 rounded-2xl md:self-end">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-black">Filtered For</p>
                <p className="text-xs font-bold text-zinc-200">{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</p>
              </div>
            </div>
          )}
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="group relative bg-zinc-950/70 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-950/90 shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer"
              >
                {/* Glowing Circle backdrop */}
                <div className={`absolute -right-12 -top-12 w-28 h-28 rounded-full bg-gradient-to-br ${cat.color} opacity-[0.03] group-hover:opacity-10 group-hover:scale-125 transition-all duration-500 blur-lg`} />

                {/* Left vertical visual line */}
                <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b ${cat.color} opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start justify-between mb-4">
                  {/* Icon wrap */}
                  <div className={`p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 group-hover:text-white transition-colors duration-300 shadow-md ${cat.shadow}`}>
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  
                  {/* Parts count */}
                  <span className="text-[10px] font-black tracking-wider text-zinc-500 uppercase group-hover:text-amber-500 transition-colors">
                    {cat.count}
                  </span>
                </div>

                {/* Category details */}
                <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Arrow Action */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 opacity-80 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all">
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
