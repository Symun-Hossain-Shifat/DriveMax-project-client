"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { Search, ChevronDown, Check, ChevronLeft, ChevronRight, Sparkles } from "./Icons";

export default function Hero() {
  const { addVehicle, activeVehicle } = useApp();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Unleash Ultimate Performance",
      subtitle: "PREMIUM CAR & BIKE PARTS",
      desc: "Upgrade your ride with guaranteed OEM-fit components, track-tested engine parts, and elite accessories.",
      cta: "Explore Hot Deals",
      accent: "from-amber-500 to-orange-600",
      bgGradient: "from-zinc-950 via-zinc-900 to-orange-950/20",
    },
    {
      title: "Precision Bike Accessories",
      subtitle: "RIDE WITH NO LIMITS",
      desc: "Custom sports bike fairings, exhausts, lights, and performance sprockets. Precision engineered for racing.",
      cta: "Shop Motorcycle Parts",
      accent: "from-blue-500 to-purple-600",
      bgGradient: "from-zinc-950 via-zinc-900 to-purple-950/20",
    },
    {
      title: "Guaranteed Compatibility",
      subtitle: "FIND PARTS THAT FIT INSTANTLY",
      desc: "Register your vehicle below to activate smart filtering. Say goodbye to returns and wrong size orders.",
      cta: "Activate My Garage",
      accent: "from-emerald-500 to-teal-600",
      bgGradient: "from-zinc-950 via-zinc-900 to-emerald-950/20",
    },
  ];

  // Auto Slider interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Lookup Form State
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike">("Car");
  const [year, setYear] = useState("2022");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [statusText, setStatusText] = useState("");

  const carMakes = {
    Toyota: ["Supra", "GR Yaris", "Camry", "RAV4"],
    Honda: ["Civic Type R", "Accord", "NSX", "CR-V"],
    BMW: ["M4 GTS", "M5 Competition", "X5 M", "i8"],
    Ford: ["Mustang Shelby", "F-150 Raptor", "Focus RS"],
  };

  const bikeMakes = {
    Yamaha: ["YZF-R1", "MT-09", "YZF-R6", "Ténéré 700"],
    Kawasaki: ["Ninja H2", "ZX-10R", "Ninja 400", "Z900"],
    Ducati: ["Panigale V4 S", "Monster 1200", "Multistrada V4"],
    Suzuki: ["Hayabusa GSX1300R", "GSX-R1000", "V-Strom 1050"],
  };

  const makes = vehicleType === "Car" ? Object.keys(carMakes) : Object.keys(bikeMakes);
  const models = make
    ? vehicleType === "Car"
      ? carMakes[make as keyof typeof carMakes]
      : bikeMakes[make as keyof typeof bikeMakes]
    : [];

  // Handle vehicle type switch and clean choices
  const handleTypeChange = (type: "Car" | "Bike") => {
    setVehicleType(type);
    setMake("");
    setModel("");
  };

  // Register vehicle to app context
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model) {
      setStatusText("Please select both Make and Model.");
      setTimeout(() => setStatusText(""), 3000);
      return;
    }

    addVehicle({
      year,
      make,
      model,
      type: vehicleType,
    });

    setStatusText("✅ Added and compatibility filter is active!");
    setTimeout(() => setStatusText(""), 4500);

    // Smooth scroll down to shop area
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[520px] max-h-[680px] bg-zinc-950 overflow-hidden border-b border-zinc-900">
      
      {/* Background Slides and Glowing Effects */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Main Background with radial gradients representing luxury lights */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-600/5 blur-[150px]" />
          
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Slide Text Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-4 pb-20">
            <div className="max-w-2xl text-left">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-widest bg-gradient-to-r ${slide.accent} text-white uppercase mb-4 shadow-md`}>
                <Sparkles className="w-3.5 h-3.5" />
                {slide.subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                {slide.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
                {slide.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#shop"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold text-sm rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/10 active:scale-95 cursor-pointer"
                >
                  {slide.cta}
                </a>
                <a
                  href="#garage"
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-lg border border-zinc-800 transition-colors cursor-pointer"
                >
                  Manage Garage
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Slider Navigation Arrows */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-20 flex gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Vehicle Wizard Overlay panel (Floating desktop wizard) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 w-full max-w-4xl px-4 hidden md:block">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 p-5 rounded-2xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle neon glowing accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                🎯 Compatibility Finder
              </span>
              
              {/* Car / Bike Selector */}
              <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => handleTypeChange("Car")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    vehicleType === "Car" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Car Parts
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange("Bike")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    vehicleType === "Bike" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Bike Parts
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 items-end">
              {/* Year Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Model Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"].map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>

              {/* Make Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Vehicle Make</label>
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Select Make</option>
                  {makes.map((mk) => (
                    <option key={mk} value={mk}>{mk}</option>
                  ))}
                </select>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Vehicle Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <option value="">Select Model</option>
                  {models.map((md) => (
                    <option key={md} value={md}>{md}</option>
                  ))}
                </select>
              </div>

              {/* Submit / Find */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold py-2.5 rounded-lg text-xs tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                FIND MATCHING PARTS
              </button>
            </div>

            {statusText && (
              <p className="text-center text-xs font-semibold text-amber-500">{statusText}</p>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Fitment trigger button (Mobile only) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
        <a
          href="#garage"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold py-3.5 rounded-xl text-xs tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          COMPATIBILITY WIZARD
        </a>
      </div>

      {/* Chevron down guiding next section */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-black mb-1 animate-pulse">Scroll Down</span>
        <ChevronDown className="w-5 h-5 text-amber-500 animate-bounce" />
      </div>

    </section>
  );
}
