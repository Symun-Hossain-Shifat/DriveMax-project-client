"use client";

import React from "react";
import { 
  Gauge, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  ShieldCheck
} from "./Icons";
import Link from "next/link";
import { useToast } from "./Toast";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function Footer() {
  const { showToast } = useToast();

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    showToast(`Navigating to ${label}`, "info", "This route will redirect you to the details page.");
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs sm:text-sm">
      {/* Top Value Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-center gap-3.5 justify-center md:justify-start">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-500">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Mechanical Hotline</p>
            <p className="font-extrabold text-white text-sm mt-0.5">+1 (800) 555-MAX-PARTS</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 justify-center md:justify-start">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-500">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Engineering Support</p>
            <p className="font-extrabold text-white text-sm mt-0.5">support@drivemax-parts.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 justify-center md:justify-start">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-500">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-wider">Warehouse Hours</p>
            <p className="font-extrabold text-white text-sm mt-0.5">Mon - Sat: 8:00 AM - 9:00 PM EST</p>
          </div>
        </div>
      </div>

      {/* Main Footer Directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-md text-black shadow shadow-orange-500/20">
              <Gauge className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">
              DRIVE<span className="text-amber-500">MAX</span>
            </span>
          </div>

          <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
            Premium Car & Bike parts e-commerce distributor. Stocking half a million OEM and track-certified aftermarket components.
          </p>

          {/* Social Icons list */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
              title="DriveMax Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
              title="DriveMax YouTube Channel"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
              title="DriveMax Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
              title="DriveMax Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Directory links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest">
            Car Parts Catalog
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            {[
              { label: "Engine Assemblies", href: "#shop" },
              { label: "Brake Kits & Discs", href: "#shop" },
              { label: "Coilovers & Shocks", href: "#shop" },
              { label: "Wheels & Rims", href: "#shop" }
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.label)}
                  className="hover:text-amber-500 flex items-center gap-1 group transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 text-zinc-650 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Directory links Column 2 */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest">
            Superbike Catalog
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            {[
              { label: "Slip-On Exhausts", href: "#shop" },
              { label: "Carbon Fairing Kits", href: "#shop" },
              { label: "Chains & Sprockets", href: "#shop" },
              { label: "LED Projectors", href: "#shop" }
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.label)}
                  className="hover:text-amber-500 flex items-center gap-1 group transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 text-zinc-650 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact address column */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest">
            Distribution Center
          </h4>
          <ul className="space-y-3 text-xs leading-relaxed">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>4500 Speedworks Boulevard, Suite 10, Newark, New Jersey, 07101, USA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+1 (973) 555-0199</span>
            </li>
            <li className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>DriveMax Certified Dealer Outlet</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar copyright */}
      <div className="bg-zinc-950 border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-zinc-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} DriveMax Parts Distribution Network. All Rights Reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#terms" onClick={(e) => handleLinkClick(e, "Terms & Conditions")} className="hover:text-zinc-300">
              Terms of Use
            </a>
            <a href="#privacy" onClick={(e) => handleLinkClick(e, "Privacy Policy")} className="hover:text-zinc-300">
              Privacy Policy
            </a>
            <a href="#cookies" onClick={(e) => handleLinkClick(e, "Cookie Settings")} className="hover:text-zinc-300">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
