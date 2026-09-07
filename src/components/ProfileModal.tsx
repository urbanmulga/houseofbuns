import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Award,
  LogOut,
  Heart,
  ChevronLeft,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function ProfileModal() {
  const { isProfileModalOpen, closeProfileModal, user, logout } = useCartOrder();

  // Native mobile back button handling
  useEffect(() => {
    if (!isProfileModalOpen) return;

    window.history.pushState({ modal: "profile" }, "");
    const handlePopState = () => {
      closeProfileModal();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isProfileModalOpen, closeProfileModal]);

  const handleBack = () => {
    closeProfileModal();
    if (window.history.state?.modal === "profile") {
      window.history.back();
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Desktop Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBack}
            className="hidden sm:block fixed inset-0 bg-black/65 backdrop-blur-sm z-40"
          />

          {/* Screen Container: 100% full-screen on mobile, centered modal dialog on desktop */}
          <div className="min-h-full flex items-start sm:items-center justify-center p-0 sm:p-6 z-50 relative pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full sm:max-w-lg min-h-screen sm:min-h-0 sm:max-h-[90vh] bg-hob-bg sm:bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-hob-brown/15 overflow-hidden flex flex-col pointer-events-auto relative"
            >
              {/* Native App Top Header */}
              <div className="sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-5 border-b border-hob-brown/10 bg-gradient-to-r from-[#0E422F] to-[#071E15] text-white flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  {/* Circular Back Button */}
                  <button
                    onClick={handleBack}
                    type="button"
                    className="w-10 h-10 rounded-full bg-white/95 text-hob-brown shadow-sm flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-hob-mint font-display block">
                      Buns Club Member
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white">
                      My Account & Profile
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleBack}
                  type="button"
                  className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
                {/* Profile Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#006241] to-[#071E15] text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-hob-caramel text-white font-display font-black text-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-lg text-white">
                        {user.name}
                      </h4>
                      <span className="text-xs text-hob-mint block font-mono">
                        {user.phone}
                      </span>
                      <span className="text-[11px] text-white/70 block">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-hob-mint text-xs font-bold font-display border border-white/15">
                      <Award className="w-3.5 h-3.5 text-hob-caramel" />
                      <span>Gold Tier</span>
                    </div>
                  </div>
                </div>

                {/* Bun Bucks Wallet */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/15 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold text-hob-muted uppercase tracking-wider block">
                      Available Bun Bucks
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-display font-black text-2xl text-hob-brown">
                        {user.bunBucks} 🪙
                      </span>
                      <span className="text-xs text-hob-muted font-medium">
                        (₹{Math.floor(user.bunBucks / 2)} value)
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-hob-brown bg-hob-bg px-3 py-1.5 rounded-xl border border-hob-brown/10">
                    Earn 10% on every smash
                  </span>
                </div>

                {/* Saved Addresses */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/10 shadow-xs space-y-3">
                  <h5 className="font-display font-black text-sm text-hob-brown uppercase tracking-wider">
                    Saved Addresses in Indore
                  </h5>

                  <div className="space-y-2.5">
                    {user.addresses?.map((addr, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-hob-bg border border-hob-brown/10 flex items-start gap-3"
                      >
                        <MapPin className="w-4 h-4 text-hob-caramel shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-xs text-hob-text block">
                            {addr.label}
                          </span>
                          <span className="text-[11px] text-hob-muted leading-relaxed">
                            {addr.address}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Favorites */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-hob-brown">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>Favorite Order:</span>
                  </div>
                  <p className="text-xs text-hob-text font-medium">
                    The House Double Smash (Medium-Rare Sear) + Peri-Peri Loaded Fries
                  </p>
                </div>
              </div>

              {/* Footer with Log Out */}
              <div className="p-4 border-t border-hob-brown/10 bg-white flex items-center justify-between shrink-0">
                <span className="text-[11px] text-hob-muted">
                  Member since 2024
                </span>

                <button
                  onClick={logout}
                  type="button"
                  className="py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-display font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
