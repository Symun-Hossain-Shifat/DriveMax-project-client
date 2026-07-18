"use client";

import React from "react";
import { Calendar, User, Clock, ArrowRight } from "./Icons";

export default function Blogs() {
  const posts = [
    {
      id: 1,
      title: "How to Identify Worn-Out Brake Rotors & Pads Early",
      category: "Maintenance",
      excerpt: "Squealing noise, pedal vibration, or visible grooves? Learn the key warning signs before they compromise your braking performance.",
      readTime: "5 min read",
      author: "Chief Mech. Dave",
      date: "July 12, 2026",
      tag: "Car Maintenance",
      color: "from-rose-500/10 to-transparent",
      borderColor: "hover:border-rose-500/30"
    },
    {
      id: 2,
      title: "Superbike Chain Maintenance & Tensioning Guide",
      category: "DIY Guide",
      excerpt: "Proper chain slack, lubrication frequency, and clean alignment are vital. Follow our detailed guide to extend sprocket life.",
      readTime: "7 min read",
      author: "Racer Sarah",
      date: "June 30, 2026",
      tag: "Bike Maintenance",
      color: "from-blue-500/10 to-transparent",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: 3,
      title: "Maximizing Engine Output with Cold Air Intake Tuning",
      category: "Performance",
      excerpt: "Understanding volumetric efficiency and mass airflow sensors. Get the most out of your high-flow filters without throwing check engine lights.",
      readTime: "6 min read",
      author: "Tuner Kenji",
      date: "May 18, 2026",
      tag: "Engine Performance",
      color: "from-amber-500/10 to-transparent",
      borderColor: "hover:border-amber-500/30"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900 border-b border-zinc-950 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-orange-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
            DriveMax Knowledge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Mechanic Guides & Performance Blogs
          </h2>
          <p className="mt-3.5 text-zinc-400 text-sm">
            Stay up to date with professional racing setups, simple DIY fixes, and product installation checklists.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id}
              className={`group bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-950/90 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl ${post.borderColor}`}
            >
              
              {/* Image Graphic block */}
              <div className="relative w-full h-44 bg-zinc-900 overflow-hidden flex flex-col justify-center items-center p-6 border-b border-zinc-850">
                <div className={`absolute inset-0 bg-gradient-to-tr ${post.color} pointer-events-none`} />
                <span className="text-zinc-800 font-extrabold text-2xl select-none group-hover:scale-110 transition-transform duration-300">
                  {post.category.toUpperCase()}
                </span>
                
                {/* Category absolute badge */}
                <span className="absolute top-4 left-4 z-10 bg-zinc-950/80 border border-zinc-800 text-zinc-300 text-[9px] font-black tracking-widest px-2.5 py-1 rounded">
                  {post.tag}
                </span>
              </div>

              {/* Descriptions */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Article Metadata bar */}
                  <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-zinc-500 font-bold mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500/70" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500/70" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer metadata author and action link */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    {post.author}
                  </span>
                  
                  <a
                    href="#blog"
                    className="flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-white transition-colors"
                  >
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
