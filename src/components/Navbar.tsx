import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles, Search, Phone, MessageSquare } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function Navbar() {
  const location = useLocation();
  const { openMenuDrawer, openOrderModal, openSearchModal } = useCartOrder();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Our Story", path: "/story" },
    { name: "Vijay Nagar Outlet", path: "/outlet" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-[#071E15] text-white transition-all duration-200 ${
        isScrolled
          ? "border-b border-white/10 backdrop-blur-md shadow-md"
          : "border-b-0 shadow-none"
      }`}
    >
      {/* Universal Top Contact & WhatsApp Order Strip */}
      <div className="bg-[#03140D] text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white/90">Vijay Nagar, Indore</span>
            <span className="text-white/40 hidden xs:inline">•</span>
            <span className="text-emerald-300/90 hidden xs:inline">11:00 AM – 11:30 PM Daily</span>
          </div>

          <div className="flex items-center gap-2 xs:gap-3">
            <span className="text-white/70 hidden sm:inline">Call & WhatsApp Order:</span>
            <a
              href={`tel:${RESTAURANT_CONFIG.location.phone}`}
              className="font-bold text-white hover:text-emerald-300 flex items-center gap-1 transition-colors"
              title="Call Kitchen"
            >
              <Phone className="w-3 h-3 text-hob-caramel" />
              <span>{RESTAURANT_CONFIG.location.phone}</span>
            </a>
            <span className="text-white/30 hidden xs:inline">|</span>
            <a
              href={RESTAURANT_CONFIG.location.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs:inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              title="WhatsApp Order"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ========================================================= */}
          {/* LEFT: Brand Logo & Pure Veg Seal                          */}
          {/* ========================================================= */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md group-hover:shadow-lg transition-all ring-2 ring-white/20 shrink-0 flex items-center justify-center">
              <img
                src="/images/brand-logo.png"
                alt="House of Buns Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-lg xs:text-xl sm:text-2xl text-white tracking-tight block leading-tight whitespace-nowrap">
                HOUSE <span className="font-cursive italic font-bold text-hob-caramel text-xl xs:text-2xl sm:text-3xl lowercase px-0.5 inline-block -translate-y-0.5">of</span> BUNS
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] xs:text-[10px] font-extrabold tracking-wider text-hob-mint uppercase whitespace-nowrap">
                  GOOD BUNS • GREAT TIMES
                </span>
                <span className="text-white/40 text-[10px]">•</span>
                <span className="flex items-center gap-1 text-[9px] xs:text-[10px] font-bold text-emerald-300 uppercase whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  100% PURE VEG
                </span>
              </div>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* CENTER: Desktop Navigation Links                          */}
          {/* ========================================================= */}
          <nav className="hidden md:flex items-center gap-1 bg-white/10 p-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-hob-caramel text-white shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ========================================================= */}
          {/* RIGHT: Actions (Search, Order Now CTA + Menu Drawer)      */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger Button (Desktop only - hidden on mobile/tablet as bottom nav has Search) */}
            <button
              onClick={() => openSearchModal()}
              type="button"
              className="hidden lg:flex p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 shadow-sm items-center justify-center cursor-pointer group"
              aria-label="Search Menu"
              title="Search Menu"
            >
              <Search className="w-5 h-5 text-white group-hover:text-hob-mint transition-colors" />
            </button>

            <button
              onClick={() => openOrderModal()}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-hob-caramel hover:bg-[#009054] text-white text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              ORDER NOW
            </button>

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => openMenuDrawer()}
              type="button"
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 shadow-sm flex items-center justify-center cursor-pointer group"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-white group-hover:text-hob-mint transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
