"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ShoppingCart,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

export default function Header({ cartCount = 0 }: { cartCount?: number } = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation options in the exact order of the original site
  const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Doctors", href: "/doctors" },
    { name: "Blogs", href: "/blogs" },
    { name: "Dealership", href: "/dealership" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 border-b border-slate-100 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Clinical Icon */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Activity className="w-5 h-5 text-emerald-600" />
                <div className="absolute inset-0 rounded-xl border border-emerald-500/30 animate-ping opacity-20 pointer-events-none" />
              </div>
              <span className="text-2xl font-bold tracking-wider font-display bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent">
                DURAUP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[14px] font-bold transition-all duration-300 py-2 ${
                    isActive
                      ? "text-emerald-600 font-extrabold"
                      : "text-slate-900 hover:text-emerald-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Cart Icon in circular border */}
            <Link
              href="/shop"
              className="p-2.5 rounded-full text-slate-800 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-emerald-600 transition-all duration-300 flex items-center justify-center relative"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-emerald-500 text-[9px] font-black text-white flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Premium Green Get Started button */}
            <Link
              href="/auth"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/shop"
              className="p-2.5 rounded-full text-slate-800 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 flex items-center justify-center relative"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-emerald-500 text-[9px] font-black text-white flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-8 space-y-2.5 absolute w-full top-20 left-0 shadow-xl animate-in slide-in-from-top duration-300">
          {NAV_ITEMS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "text-slate-800 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 px-2">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center shadow-lg transition-all duration-300"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
