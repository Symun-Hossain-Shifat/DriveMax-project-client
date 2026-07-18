"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "./AppContext";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Gauge,
  LogOut,
  LogIn,
  Car
} from "./Icons";
import Link from "next/link";

export default function Navbar({
  onCartClick,
  onWishlistClick
}: {
  onCartClick: () => void;
  onWishlistClick: () => void;
}) {
  const { isLoggedIn, setIsLoggedIn, cart, wishlist, activeVehicle } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Measure the real rendered height of the nav (banner + main bar) so the
  // mobile drawer always starts exactly where the nav ends, on any screen
  // size or text-wrap state — no more hardcoded top-[105px].
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const node = navRef.current;
    if (!node) return;

    const updateHeight = () => setNavHeight(node.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const loggedOutRoutes = [
    { name: "Home", href: "#" },
    { name: "Shop Parts", href: "#shop" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" }
  ];

  const loggedInRoutes = [
    { name: "Home", href: "#" },
    { name: "Shop Parts", href: "#shop" },
    { name: "My Wishlist", href: "#wishlist", badge: wishlist.length },
    { name: "Order Tracking", href: "#tracking" },
    { name: "My Garage", href: "#garage" },
    { name: "Admin Dashboard", href: "#admin" }
  ];

  const activeRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div ref={navRef} className="sticky top-0 z-50 w-full">
      <nav className="w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 shadow-xl transition-all duration-300">
        {/* Top Banner Auth Toggle */}
        <div className="w-full bg-zinc-900 border-b border-zinc-800 py-1.5 px-3 sm:px-6 lg:px-8 text-xs flex flex-wrap gap-y-1 justify-between items-center text-zinc-400">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline truncate">DriveMax Online System Active</span>
            <span className="sm:hidden truncate">DriveMax Online</span>
          </div>

          {/* Auth Simulation Toggle Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline font-semibold text-zinc-300 whitespace-nowrap">
              Auth Simulator:
            </span>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap ${isLoggedIn
                ? "bg-amber-500/20 border-amber-500 text-amber-300 font-medium"
                : "bg-zinc-800 border-zinc-700 hover:border-zinc-500 text-zinc-300"
                }`}
            >
              {isLoggedIn ? (
                <>
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xs:inline">Logged In (Click to Log Out)</span>
                  <span className="xs:hidden">Log Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xs:inline">Logged Out (Click to Log In)</span>
                  <span className="xs:hidden">Log In</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Navbar Contents */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 min-w-0">
              <Link href="#" className="flex items-center gap-2 group min-w-0">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-orange-500/20 shrink-0">
                  <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-white via-zinc-200 to-amber-500 bg-clip-text text-transparent truncate">
                  DRIVE<span className="text-amber-500">MAX</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav Routes */}
            <div className="hidden lg:flex items-center space-x-5 xl:space-x-8 overflow-x-auto">
              {activeRoutes.map((route) => (
                <a
                  key={route.name}
                  href={route.href}
                  className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 py-2 group whitespace-nowrap"
                >
                  <span className="flex items-center gap-1.5">
                    {route.name}
                    {route.badge !== undefined && route.badge > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-black bg-amber-500 rounded-full animate-bounce">
                        {route.badge}
                      </span>
                    )}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Action Icons Panel */}
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">

              {/* Active Garage indicator (Desktop / Tablet) */}
              {activeVehicle && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-amber-500 hover:bg-zinc-800 transition-colors max-w-[160px] xl:max-w-none">
                  <Car className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                  <span className="truncate">Fits: {activeVehicle.year} {activeVehicle.make}</span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={onWishlistClick}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-300 hover:text-amber-400 transition-all duration-300 cursor-pointer"
                title="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-black bg-amber-500 rounded-full border border-zinc-950">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-300 hover:text-amber-400 transition-all duration-300 cursor-pointer"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-black bg-amber-500 rounded-full border border-zinc-950 animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Profile Info / Button */}
              <div className="hidden md:flex items-center gap-2 border-l border-zinc-800 pl-2 lg:pl-3">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center font-bold text-zinc-950 ring-2 ring-amber-500/30">
                      S
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-zinc-200">Shifat</p>
                      <p className="text-[10px] text-zinc-400">Admin Account</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 px-3 lg:px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-zinc-950 font-bold rounded-lg text-xs tracking-wider transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer whitespace-nowrap"
                    >
                      <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                      SIGN IN
                    </Link>
                    <Link
                      href="/signup"
                      className="hidden xl:flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-amber-400 font-bold rounded-lg text-xs tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/50 cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu — positioned dynamically off the real nav height */}
      <div
        style={{ top: navHeight }}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-zinc-950 border-t border-zinc-900 transform transition-transform duration-300 ease-in-out overflow-y-auto ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col min-h-full justify-between p-4 sm:p-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900 pb-2">
              Navigation Menu
            </p>
            <div className="flex flex-col gap-2 sm:gap-3">
              {activeRoutes.map((route) => (
                <a
                  key={route.name}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-semibold py-2.5 px-3 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all duration-200"
                >
                  <span>{route.name}</span>
                  {route.badge !== undefined && route.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold leading-none text-black bg-amber-500 rounded-full">
                      {route.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-6 space-y-4">
            {activeVehicle && (
              <div className="flex items-center justify-between p-3 sm:p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-zinc-300 min-w-0">
                  <Car className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Active Vehicle</p>
                    <p className="text-zinc-200 font-semibold truncate">{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</p>
                  </div>
                </div>
              </div>
            )}

            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-2 bg-zinc-900/50 rounded-xl">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center font-bold text-zinc-950 text-base">
                    S
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-zinc-100 text-sm truncate">Symun Hossain Shifat</h5>
                    <p className="text-xs text-zinc-400 truncate">admin@drivemax.com</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out of Simulator
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-orange-500/10 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 stroke-[2.5]" />
                  Sign In to Account
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 font-bold rounded-xl text-sm transition-all duration-300 cursor-pointer"
                >
                  Create New Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}