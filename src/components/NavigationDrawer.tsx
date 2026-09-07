import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  User,
  LogIn,
  LogOut,
  Clock,
  MapPin,
  UtensilsCrossed,
  BookOpen,
  Phone,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function NavigationDrawer() {
  const {
    isMenuDrawerOpen,
    closeMenuDrawer,
    user,
    logout,
    openAuthModal,
    openOrderTracking,
    openContactModal,
    openProfileModal,
  } = useCartOrder();

  // Native mobile app back button handling
  useEffect(() => {
    if (!isMenuDrawerOpen) return;

    window.history.pushState({ drawer: "menu" }, "");
    const handlePopState = () => {
      closeMenuDrawer();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMenuDrawerOpen, closeMenuDrawer]);

  const handleBack = () => {
    closeMenuDrawer();
    if (window.history.state?.drawer === "menu") {
      window.history.back();
    }
  };

  return (
    <AnimatePresence>
      {isMenuDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Desktop Backdrop Blur (hidden on mobile for native full-screen app view) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleBack}
            className="hidden md:block fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Screen: 100% Full-Screen on Mobile, Slide-Over Sheet on Desktop */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full md:max-w-md bg-hob-bg md:bg-hob-surface text-hob-text shadow-2xl flex flex-col h-full min-h-screen z-10 overflow-y-auto"
          >
            {/* Native Mobile App Header */}
            <div className="sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-4 border-b border-hob-brown/10 bg-hob-surface/95 backdrop-blur-md flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                {/* Circular Native App Back Button */}
                <button
                  onClick={handleBack}
                  type="button"
                  className="w-10 h-10 rounded-full bg-hob-bg hover:bg-hob-mint/30 text-hob-brown border border-hob-brown/15 shadow-sm flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                  aria-label="Back to House of Buns"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-sm ring-1 ring-hob-brown/10 flex items-center justify-center">
                    <img
                      src="/images/brand-logo.png"
                      alt="House of Buns Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-display font-black text-base sm:text-lg text-hob-brown tracking-tight block leading-tight">
                      HOUSE <span className="font-cursive italic font-bold text-hob-caramel text-lg sm:text-xl lowercase px-0.5 inline-block -translate-y-0.5">of</span> BUNS
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-hob-caramel block">
                      Menu & Account
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Close Icon */}
              <button
                onClick={handleBack}
                type="button"
                className="hidden md:inline-flex p-2 rounded-full hover:bg-hob-brown/10 text-hob-muted hover:text-hob-text transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 flex-1">
              {/* ==================================================== */}
              {/* PROFILE & AUTHENTICATION SECTION */}
              {/* ==================================================== */}
              {user ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#006241] to-[#071E15] text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-hob-caramel/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-hob-caramel text-white font-display font-black text-lg flex items-center justify-center shadow-md ring-2 ring-white/20">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-display font-black text-base text-white leading-tight">
                          {user.name}
                        </h4>
                        <span className="text-xs text-hob-mint font-medium">
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/15 text-xs relative z-10 gap-2">
                    <div className="flex items-center gap-1.5 text-hob-mint font-bold text-[11px]">
                      <Award className="w-3.5 h-3.5 text-hob-caramel shrink-0" />
                      <span>{user.bunBucks} Bun Bucks 🪙</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={openProfileModal}
                        type="button"
                        className="text-[11px] font-bold text-white/90 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        Profile
                      </button>
                      <button
                        onClick={logout}
                        type="button"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-200 hover:text-white px-2.5 py-1 rounded-lg bg-red-500/25 hover:bg-red-500/35 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/15 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-hob-brown/10 text-hob-brown flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm text-hob-brown leading-tight">
                        Welcome to House of Buns! 👋
                      </h4>
                      <p className="text-[11px] text-hob-muted mt-0.5">
                        Sign in to earn 50 Bun Bucks & track orders live
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      openAuthModal();
                    }}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-hob-cream font-display font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-hob-caramel" />
                    <span>Login / Sign In</span>
                  </button>
                </div>
              )}

              {/* ==================================================== */}
              {/* "WHERE IS MY ORDER?" QUICK TRACKER CARD */}
              {/* ==================================================== */}
              <div
                onClick={openOrderTracking}
                className="p-4 rounded-2xl bg-gradient-to-br from-[#071E15] to-[#04100B] text-white cursor-pointer hover:shadow-lg transition-all border border-hob-caramel/25 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-[10px] font-bold">
                    <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                    <span>LIVE TRACKER</span>
                  </div>
                  <span className="text-[11px] font-mono text-hob-mint font-bold">
                    #HOB-8492
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-black text-sm text-white flex items-center gap-1.5">
                      <span>Where Is My Order?</span>
                      <ChevronRight className="w-4 h-4 text-hob-caramel group-hover:translate-x-1 transition-transform" />
                    </h5>
                    <p className="text-[11px] text-white/75 mt-0.5">
                      Double Smash & Fries • Sizzling at 400°F (14 min)
                    </p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                </div>
              </div>

              {/* ==================================================== */}
              {/* NAVIGATION & EXPLORE LINKS */}
              {/* ==================================================== */}
              <div className="space-y-1 bg-white p-2 rounded-2xl border border-hob-brown/10 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-hob-muted font-display px-3 py-1 block">
                  Explore The House
                </span>

                <Link
                  to="/menu"
                  onClick={closeMenuDrawer}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-hob-bg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-hob-brown/10 text-hob-brown flex items-center justify-center">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-hob-text block">
                        Our Artisanal Menu
                      </span>
                      <span className="text-[11px] text-hob-muted">
                        Smashed burgers, loaded sides & thick shakes
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hob-muted group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/story"
                  onClick={closeMenuDrawer}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-hob-bg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-hob-brown/10 text-hob-brown flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-hob-text block">
                        About Us / Our Story
                      </span>
                      <span className="text-[11px] text-hob-muted">
                        The 5:00 AM brioche bakery & Maillard smash philosophy
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hob-muted group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/outlet"
                  onClick={closeMenuDrawer}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-hob-bg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-hob-brown/10 text-hob-brown flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-hob-text block">
                        Vijay Nagar Flagship Outlet
                      </span>
                      <span className="text-[11px] text-hob-muted">
                        Scheme 54, PU-4 Commercial, Indore • Dine-In & Takeaway
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hob-muted group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={user ? openProfileModal : openAuthModal}
                  type="button"
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-hob-bg transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-hob-brown/10 text-hob-brown flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-hob-text block">
                        Profile & Saved Addresses
                      </span>
                      <span className="text-[11px] text-hob-muted">
                        {user ? "Manage addresses & Bun Bucks" : "Sign in to view your profile"}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hob-muted group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={openContactModal}
                  type="button"
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-hob-bg transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-hob-brown/10 text-hob-brown flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-hob-text block">
                        Contact Us & Catering
                      </span>
                      <span className="text-[11px] text-hob-muted">
                        Direct call, WhatsApp support & party orders
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hob-muted group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Details */}
            <div className="p-4 sm:p-5 border-t border-hob-brown/10 bg-white/70 space-y-2 text-xs text-hob-muted mt-auto">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-hob-caramel" />
                <span>Open Daily: 11:00 AM – 02:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-hob-caramel" />
                <span>Scheme 54, PU-4, Vijay Nagar, Indore</span>
              </div>
              <div className="pt-2 text-[10px] text-hob-muted/80 border-t border-hob-brown/10 flex items-center justify-between">
                <span>© House of Buns • Indore</span>
                <span className="font-bold text-hob-brown">FSSAI Certified</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
