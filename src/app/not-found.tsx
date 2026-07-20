"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Tag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#f5f0e6] flex items-center justify-center px-6">
      {/* faint stall-canvas texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #f5f0e6 0, #f5f0e6 1px, transparent 1px, transparent 14px)",
        }}
      />

      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d4a24e]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* signature: swinging price tag reading 404 */}
        <motion.div
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-10 origin-top"
        >
          <div className="relative flex flex-col items-center">
            <span className="h-10 w-[2px] bg-[#d4a24e]/40" />
            <div className="relative flex items-center gap-2 rounded-md border border-[#d4a24e]/40 bg-[#111111] px-6 py-4 shadow-[0_0_30px_-8px_rgba(212,162,78,0.35)]">
              <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-[#d4a24e]/50 bg-[#0a0a0a]" />
              <Tag className="h-5 w-5 text-[#d4a24e]" strokeWidth={1.5} />
              <span className="font-mono text-4xl tracking-wider text-[#f5f0e6]">
                404
              </span>
            </div>
          </div>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f0e6]">
          This stall is empty.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#f5f0e6]/55 leading-relaxed">
          Whatever you were looking for has been sold out, moved, or never
          set up shop here. TrendyHaat doesn't have this page.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[#d4a24e] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#e8b768]"
          >
            <Home className="h-4 w-4" strokeWidth={2} />
            Back to the haat
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-[#f5f0e6]/15 px-6 py-3 text-sm font-medium text-[#f5f0e6]/80 transition-colors hover:border-[#f5f0e6]/35 hover:text-[#f5f0e6]"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}