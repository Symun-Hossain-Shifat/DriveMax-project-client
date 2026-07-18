"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "./Icons";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: "Marcus Vance",
      role: "Track Racing Instructor",
      quote: "The Brembo rotors and HKS coilovers transformed my Supra's cornering precision. Technical specifications were 100% accurate, and mechanical support helped clarify torque specs in minutes.",
      rating: 5,
      vehicle: "2021 Toyota Supra",
      initial: "M",
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Elena Rostova",
      role: "Superbike Enthusiast",
      quote: "Finding parts for the Yamaha R1 is usually a hassle with long wait times. DriveMax delivered my carbon exhaust and Öhlins shock in just 4 days. Guaranteed compatibility is a lifesaver!",
      rating: 5,
      vehicle: "2022 Yamaha YZF-R1",
      initial: "E",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Derrick Miller",
      role: "Auto Shop Owner",
      quote: "As a commercial garage owner, I need delivery speed and genuine parts. DriveMax offers consistent wholesale discounts, accurate stock lists, and OEM quality. Our go-to partner.",
      rating: 5,
      vehicle: "Commercial Garage Owner",
      initial: "D",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900 relative overflow-hidden">

      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
            Client Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Loved by Drivers & Riders Worldwide
          </h2>
          <p className="mt-3.5 text-zinc-400 text-sm">
            Read stories from performance instructors, amateur track racers, and premium mechanical workshops.
          </p>
        </div>

        {/* Carousel Slider Panel */}
        <div className="max-w-4xl mx-auto relative">

          <div className="absolute top-0 left-0 text-zinc-800 -translate-x-4 -translate-y-4 pointer-events-none hidden md:block">
            <Quote className="w-20 h-20 stroke-[3]" />
          </div>

          {/* Testimonial Active Card */}
          <div className="bg-zinc-900 border border-zinc-800/80 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500">

            {/* Corner glowing strip */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${reviews[activeIndex].color}`} />

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

              {/* Profile Avatar */}
              <div className={`w-16 h-16 rounded-full shrink-0 bg-gradient-to-br ${reviews[activeIndex].color} flex items-center justify-center text-zinc-950 font-black text-2xl shadow-lg shadow-orange-500/5`}>
                {reviews[activeIndex].initial}
              </div>

              {/* Quote details */}
              <div className="flex-1 text-center md:text-left">

                {/* Rating stars */}
                <div className="flex justify-center md:justify-start text-amber-500 gap-0.5 mb-4">
                  {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-zinc-200 text-base md:text-lg leading-relaxed italic">
                  "{reviews[activeIndex].quote}"
                </p>

                {/* Customer footer */}
                <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-zinc-800/80 pt-5">
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      {reviews[activeIndex].name}
                    </h4>
                    <p className="text-xs text-zinc-500">
                      {reviews[activeIndex].role}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 self-center md:self-end px-3 py-1 bg-zinc-950 border border-zinc-850 rounded-lg text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Owner: {reviews[activeIndex].vehicle}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Slider controls */}
          <div className="flex justify-center gap-3.5 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === activeIndex ? "bg-amber-500 w-6" : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
