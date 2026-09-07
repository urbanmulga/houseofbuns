import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  Phone,
  Navigation,
  ShoppingBag,
  Sparkles,
  Clock,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function OrderModal() {
  const {
    isOrderModalOpen,
    closeOrderModal,
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartOrder();

  // Support hardware/browser back button on mobile devices
  useEffect(() => {
    if (!isOrderModalOpen) return;

    window.history.pushState({ modal: "order-modal" }, "");
    const handlePopState = () => {
      closeOrderModal();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOrderModalOpen, closeOrderModal]);

  if (!isOrderModalOpen) return null;

  const handleBack = () => {
    closeOrderModal();
    if (window.history.state?.modal === "order-modal") {
      window.history.back();
    }
  };

  const totalItemsCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Desktop Backdrop (Hidden on mobile for native full-screen app feel) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBack}
          className="hidden sm:block fixed inset-0 bg-black/65 backdrop-blur-sm z-40"
        />

        {/* Modal Container: Full-screen on mobile, centered modal dialog on desktop */}
        <div className="min-h-full flex items-start sm:items-center justify-center p-0 sm:p-6 z-50 relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="w-full sm:max-w-2xl min-h-screen sm:min-h-0 sm:max-h-[90vh] bg-hob-bg sm:bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-hob-brown/15 overflow-hidden flex flex-col pointer-events-auto relative text-hob-text"
          >
            {/* ======================================================== */}
            {/* TOP APP BAR: Mobile Back Button & Header */}
            {/* ======================================================== */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 border-b border-hob-brown/10 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  type="button"
                  className="w-10 h-10 rounded-full bg-hob-bg hover:bg-hob-surface text-hob-brown shadow-sm active:scale-90 transition-all flex items-center justify-center border border-hob-brown/10"
                  aria-label="Go back to menu"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <div>
                  <h2 className="font-display font-black text-lg sm:text-2xl text-hob-brown tracking-tight leading-tight flex items-center gap-2">
                    <span>Your Order Bag</span>
                    {totalItemsCount > 0 && (
                      <span className="text-xs bg-hob-brown text-white font-bold px-2 py-0.5 rounded-full">
                        {totalItemsCount}
                      </span>
                    )}
                  </h2>
                  <p className="text-[11px] text-hob-muted hidden xs:block">
                    Vijay Nagar Flagship, Indore
                  </p>
                </div>
              </div>

              {/* Action: Clear cart & Desktop close */}
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    type="button"
                    className="p-2 rounded-full text-hob-muted hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Clear order bag"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}

                <button
                  onClick={handleBack}
                  type="button"
                  className="hidden sm:flex w-9 h-9 rounded-full bg-hob-bg hover:bg-hob-surface text-hob-brown items-center justify-center border border-hob-brown/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SCROLLABLE CART CONTENT */}
            {/* ======================================================== */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 pb-32 sm:pb-8 space-y-6">
              
              {/* Empty Bag State */}
              {cartItems.length === 0 ? (
                <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-dashed border-hob-brown/20 space-y-4 my-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-hob-bg text-hob-muted mx-auto flex items-center justify-center border border-hob-brown/10">
                    <ShoppingBag className="w-8 h-8 text-hob-brown/50" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-hob-brown">
                      Your Order Bag is Empty
                    </h3>
                    <p className="text-xs text-hob-muted max-w-xs mx-auto mt-1 leading-relaxed">
                      Explore our handcrafted smashed burgers, crispy sides, and thick shakes to start your order.
                    </p>
                  </div>
                  <button
                    onClick={handleBack}
                    type="button"
                    className="py-3 px-6 rounded-full bg-hob-brown text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-hob-brown-dark transition-all active:scale-95"
                  >
                    Browse Fresh Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected Items List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-hob-brown font-display">
                        Items Ordered ({cartItems.length})
                      </span>
                      <span className="text-[11px] font-semibold text-hob-muted">
                        Fresh Prep at Vijay Nagar
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {cartItems.map((ci) => (
                        <div
                          key={ci.id}
                          className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-hob-brown/10 shadow-xs"
                        >
                          {/* Item Thumbnail & Name */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img
                              src={ci.item.image}
                              alt={ci.item.name}
                              className="w-14 h-14 object-cover rounded-xl shrink-0 border border-hob-brown/10"
                            />
                            <div className="min-w-0">
                              <p className="font-display font-bold text-sm text-hob-brown truncate leading-tight">
                                {ci.item.name}
                              </p>
                              {ci.selectedAddons && ci.selectedAddons.length > 0 && (
                                <p className="text-[11px] text-hob-muted truncate mt-0.5">
                                  + {ci.selectedAddons.map((a) => a.name).join(", ")}
                                </p>
                              )}
                              <p className="text-xs font-black text-hob-brown mt-1">
                                ₹{ci.totalItemPrice}
                              </p>
                            </div>
                          </div>

                          {/* Stepper & Trash */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 bg-hob-bg rounded-full p-1 border border-hob-brown/15 shadow-inner">
                              <button
                                onClick={() => updateQuantity(ci.id, -1)}
                                type="button"
                                className="w-6 h-6 rounded-full bg-white hover:bg-hob-brown hover:text-white text-hob-brown transition-colors flex items-center justify-center shadow-xs"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black w-5 text-center text-hob-brown">
                                {ci.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(ci.id, 1)}
                                type="button"
                                className="w-6 h-6 rounded-full bg-hob-brown text-white hover:bg-hob-brown-dark transition-colors flex items-center justify-center shadow-xs"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(ci.id)}
                              type="button"
                              className="p-1.5 text-hob-muted hover:text-red-500 transition-colors"
                              aria-label={`Remove ${ci.item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bill Summary */}
                  <div className="p-4 rounded-2xl bg-white border border-hob-brown/10 shadow-xs space-y-2 text-xs">
                    <div className="flex justify-between items-center text-hob-muted">
                      <span>Item Total</span>
                      <span className="font-semibold text-hob-text">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-hob-muted">
                      <span>Kitchen Packaging</span>
                      <span className="font-semibold text-green-700">Free (Artisanal Foil Insulated)</span>
                    </div>
                    <div className="pt-2 border-t border-hob-brown/10 flex justify-between items-center font-display">
                      <span className="font-bold text-sm text-hob-brown">To Pay</span>
                      <span className="font-black text-xl text-hob-brown">₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Fulfillment Options */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-hob-brown font-display">
                      Fulfillment Method
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Option 1: Delivery */}
                      <div className="p-4 rounded-2xl bg-white border border-hob-brown/15 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm text-hob-brown">Doorstep Delivery</span>
                            <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                              Hot & Fresh
                            </span>
                          </div>
                          <p className="text-xs text-hob-muted mb-3 leading-relaxed">
                            Insulated thermal delivery across Indore via official partners.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <a
                            href={RESTAURANT_CONFIG.deliveryPartners.zomatoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#E23744] text-white font-bold text-xs tracking-wide hover:brightness-105 transition-all shadow-xs active:scale-95"
                          >
                            <span>Order via Zomato</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={RESTAURANT_CONFIG.deliveryPartners.swiggyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#FC8019] text-white font-bold text-xs tracking-wide hover:brightness-105 transition-all shadow-xs active:scale-95"
                          >
                            <span>Order via Swiggy</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Option 2: Dine In / Takeaway */}
                      <div className="p-4 rounded-2xl bg-white border border-hob-brown/15 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm text-hob-brown">Dine In / Takeaway</span>
                            <span className="text-[10px] bg-hob-mint text-hob-brown font-bold px-2 py-0.5 rounded-full">
                              Vijay Nagar
                            </span>
                          </div>
                          <p className="text-xs text-hob-muted mb-3 leading-relaxed">
                            Straight off the flat-top griddle at our flagship kitchen.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <a
                            href={RESTAURANT_CONFIG.location.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-hob-brown hover:bg-hob-brown-dark text-white font-bold text-xs tracking-wide transition-all shadow-xs active:scale-95"
                          >
                            <Navigation className="w-3.5 h-3.5 text-hob-mint" />
                            <span>Navigate to Outlet</span>
                          </a>
                          <a
                            href={`tel:${RESTAURANT_CONFIG.location.phone}`}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-hob-bg border border-hob-brown/15 text-hob-brown font-bold text-xs tracking-wide hover:bg-hob-surface transition-all active:scale-95"
                          >
                            <Phone className="w-3.5 h-3.5 text-hob-caramel" />
                            <span>Call Kitchen: {RESTAURANT_CONFIG.location.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Note */}
                  <div className="p-3 rounded-2xl bg-hob-bg border border-hob-brown/10 text-center text-xs text-hob-muted flex items-center justify-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-hob-caramel shrink-0" />
                    <span>Kitchen active daily 11:00 AM – 11:30 PM • Vijay Nagar, Indore</span>
                  </div>
                </>
              )}
            </div>

            {/* ======================================================== */}
            {/* FIXED BOTTOM ACTION BAR ON MOBILE */}
            {/* ======================================================== */}
            {cartItems.length > 0 && (
              <div className="fixed sm:static bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-hob-brown/10 z-30 flex items-center justify-between gap-4 shadow-lg sm:shadow-none">
                <div>
                  <span className="text-[10px] uppercase font-bold text-hob-muted block">
                    Total Amount
                  </span>
                  <span className="font-display font-black text-2xl text-hob-brown">
                    ₹{cartTotal}
                  </span>
                </div>

                <a
                  href={RESTAURANT_CONFIG.deliveryPartners.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-full bg-hob-brown hover:bg-hob-brown-dark text-white font-display font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center gap-2 text-center"
                >
                  <Sparkles className="w-4 h-4 text-hob-mint" />
                  <span>Proceed to Delivery</span>
                </a>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
