import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  Clock,
  MapPin,
  UtensilsCrossed,
  BookOpen,
  Phone,
  ChevronRight,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function NavigationDrawer() {
  const {
    isMenuDrawerOpen,
    closeMenuDrawer,
    openContactModal,
    openOrderModal,
    cartCount,
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
          {/* Desktop Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleBack}
            className="hidden md:block fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Screen: Full-Screen on Mobile, Slide-Over Sheet on Desktop */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full md:max-w-md bg-hob-bg md:bg-hob-surface text-hob-text shadow-2xl flex flex-col h-full min-h-screen z-10 overflow-y-auto"
          >
            {/* Header */}
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
                      Vijay Nagar Flagship
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
              {/* DIRECT WHATSAPP ORDER CARD */}
              {/* ==================================================== */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#071E15] via-[#006241] to-[#04100B] text-white shadow-lg relative overflow-hidden space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </div>
                <div>
                  <h4 className="font-display font-black text-lg text-white">
                    Add to Cart & Send to Kitchen
                  </h4>
                  <p className="text-xs text-hob-cream/80 mt-1 leading-relaxed">
                    Build your craving list from our artisanal menu and submit your order directly to our kitchen WhatsApp for fast prep!
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-lg">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>WhatsApp: {RESTAURANT_CONFIG.location.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      closeMenuDrawer();
                      openOrderModal();
                    }}
                    type="button"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-hob-caramel hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>View Order Bag ({cartCount})</span>
                  </button>

                  <a
                    href={RESTAURANT_CONFIG.location.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
                    title="Direct WhatsApp Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </a>
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
                        From Jabalpur to Indore • The House of Buns story
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
                <Phone className="w-3.5 h-3.5 text-hob-caramel" />
                <a href={`tel:${RESTAURANT_CONFIG.location.phone}`} className="font-bold text-hob-brown hover:underline">
                  Call / WhatsApp: {RESTAURANT_CONFIG.location.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-hob-caramel" />
                <span>Open Daily: 11:00 AM – 11:30 PM</span>
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
