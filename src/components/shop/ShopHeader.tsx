"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import Link from "next/link";

interface ShopHeaderProps {
  cartCount?: number;
}

export default function ShopHeader({ cartCount = 0 }: ShopHeaderProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { label: "Femme", href: "/catalogue?category=PARFUMS_FEMME" },
    { label: "Homme", href: "/catalogue?category=PARFUMS_HOMME" },
    { label: "Mixte", href: "/catalogue?category=PARFUMS_MIXTE" },
    { label: "Collection", href: "/catalogue" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,1)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Gold top line */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#F5EFE6]"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center md:items-start">
            <span
              className="text-xs tracking-[0.5em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              PNV
            </span>
            <span
              className="text-xl tracking-[0.3em] uppercase font-light"
              style={{
                color: "#F5EFE6",
                fontFamily: "Georgia, Times New Roman, serif",
              }}
            >
              La maison du Parfum
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:tracking-[0.35em]"
                style={{
                  color: "#D4D0CC",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="transition-colors duration-300"
              style={{ color: "#D4D0CC" }}
            >
              <User className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/cart"
              className="relative transition-colors duration-300"
              style={{ color: "#D4D0CC" }}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-light"
                  style={{ background: "#6B1A2A", color: "#F5EFE6" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div
          className="md:hidden px-6 py-6 space-y-4"
          style={{
            background: "#0D0D0D",
            borderTop: "1px solid rgba(201,169,110,0.15)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-xs tracking-[0.25em] uppercase py-2"
              style={{
                color: "#D4D0CC",
                borderBottom: "1px solid rgba(201,169,110,0.1)",
              }}
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Gold bottom line */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
        }}
      />
    </header>
  );
}