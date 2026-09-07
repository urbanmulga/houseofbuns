import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function Navbar() {
  const location = useLocation();
  const { openMenuDrawer, openOrderModal, user } = useCartOrder();
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
          {/* RIGHT: Actions (Order Now CTA + Menu Drawer Trigger)     */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
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
              {user && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-hob-caramel rounded-full ring-2 ring-[#071E15]" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
