import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Flame,
  Phone,
  MessageSquare,
  Bike,
  ChevronLeft,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function OrderTrackingModal() {
  const { isOrderTrackingOpen, closeOrderTracking } = useCartOrder();

  // Native mobile app back button handling
  useEffect(() => {
    if (!isOrderTrackingOpen) return;

    window.history.pushState({ modal: "order-tracking" }, "");
    const handlePopState = () => {
      closeOrderTracking();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOrderTrackingOpen, closeOrderTracking]);

  const handleBack = () => {
    closeOrderTracking();
    if (window.history.state?.modal === "order-tracking") {
      window.history.back();
    }
  };

  const trackingSteps = [
    {
      id: 1,
      title: "Order Placed & Confirmed",
      time: "10:15 PM",
      desc: "Kitchen in Vijay Nagar received your artisanal order.",
      status: "completed",
    },
    {
      id: 2,
      title: "5 AM Brioche Toasting",
      time: "10:18 PM",
      desc: "Morning baked buns sliced and butter-seared on chrome.",
      status: "completed",
    },
    {
      id: 3,
      title: "Patties Sizzling on 400°F Steel",
      time: "10:22 PM",
      desc: "Lacey caramelized skirt forming with melted vintage cheddar.",
      status: "current",
    },
    {
      id: 4,
      title: "Thermal Insulation Packaging",
      time: "Est. 10:27 PM",
      desc: "Sealing in moisture and heat with tamper-evident box.",
      status: "upcoming",
    },
    {
      id: 5,
      title: "Out for Delivery / Pickup",
      time: "Est. 10:35 PM",
      desc: "Rider navigating to Scheme 54, Vijay Nagar.",
      status: "upcoming",
    },
  ];

  return (
    <AnimatePresence>
      {isOrderTrackingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Desktop Backdrop (hidden on mobile for native full-screen feel) */}
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
                      Live Kitchen Status
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white">
                      Order #HOB-8492
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-hob-caramel/30 border border-hob-caramel/40 text-hob-mint text-xs font-bold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>14 Mins</span>
                  </div>

                  <button
                    onClick={handleBack}
                    type="button"
                    className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
                {/* ETA Highlight Card */}
                <div className="p-4 rounded-2xl bg-white sm:bg-gradient-to-br sm:from-[#EFF5F1] sm:to-[#DCECE3] border border-hob-brown/15 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold text-hob-muted uppercase tracking-wider block">
                      Estimated Delivery
                    </span>
                    <span className="font-display font-black text-2xl text-hob-brown">
                      10:35 PM
                    </span>
                    <p className="text-xs text-hob-muted mt-0.5">
                      Delivering to Scheme 54, Vijay Nagar, Indore
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-hob-brown text-white flex items-center justify-center shadow-md">
                    <Bike className="w-6 h-6 text-hob-caramel" />
                  </div>
                </div>

                {/* Live Timeline Steps */}
                <div className="bg-white p-4 rounded-2xl border border-hob-brown/10 shadow-xs">
                  <h4 className="font-display font-black text-sm text-hob-brown uppercase tracking-wider mb-4">
                    Live Kitchen Progress
                  </h4>

                  <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-hob-brown/15">
                    {trackingSteps.map((step) => {
                      const isDone = step.status === "completed";
                      const isCurrent = step.status === "current";

                      return (
                        <div key={step.id} className="relative group">
                          {/* Node Dot */}
                          <div
                            className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                              isDone
                                ? "bg-hob-brown text-white"
                                : isCurrent
                                ? "bg-orange-500 text-white animate-pulse"
                                : "bg-hob-bg text-hob-muted border border-hob-brown/20"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : isCurrent ? (
                              <Flame className="w-3 h-3 text-white fill-white" />
                            ) : (
                              step.id
                            )}
                          </div>

                          {/* Text */}
                          <div className="flex items-baseline justify-between gap-2">
                            <h5
                              className={`font-display font-extrabold text-xs sm:text-sm ${
                                isCurrent
                                  ? "text-orange-600 font-black"
                                  : isDone
                                  ? "text-hob-text"
                                  : "text-hob-muted/70"
                              }`}
                            >
                              {step.title}
                            </h5>
                            <span className="text-[10px] font-mono font-semibold text-hob-muted shrink-0">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-hob-muted mt-0.5 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/10 space-y-2 shadow-xs">
                  <span className="text-[10px] font-bold text-hob-muted uppercase tracking-wider block">
                    Items in this order:
                  </span>
                  <div className="text-xs text-hob-text space-y-1">
                    <div className="flex justify-between">
                      <span className="font-semibold">1x The House Double Smash</span>
                      <span className="font-mono text-hob-muted">₹349</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">1x Peri-Peri Loaded Fries</span>
                      <span className="font-mono text-hob-muted">₹189</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">1x Belgian Caramel Thick Shake</span>
                      <span className="font-mono text-hob-muted">₹199</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Contact Actions */}
              <div className="p-4 border-t border-hob-brown/10 bg-white grid grid-cols-2 gap-3 shrink-0">
                <a
                  href="tel:+919826055555"
                  className="py-3 px-3 rounded-xl bg-hob-bg hover:bg-hob-mint/30 border border-hob-brown/20 text-hob-brown font-display font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-hob-caramel" />
                  <span>Call Kitchen</span>
                </a>

                <a
                  href="https://wa.me/919826055555?text=Hi%20House%20of%20Buns,%20tracking%20my%20order%20%23HOB-8492"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-3 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-white font-display font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-hob-mint" />
                  <span>WhatsApp Rider</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
