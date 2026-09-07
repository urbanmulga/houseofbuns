import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Clock,
  MessageSquare,
  CheckCircle2,
  Heart,
  Star,
  Flame,
  Sparkles,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";
import { MENU_ITEMS } from "../data/menuData";

const EMPTY_BAG_SUGGESTIONS = [
  {
    type: "most-picked",
    badge: "Most Picked Item",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    icon: Flame,
    tagline: "Ordered 1,400+ times this month • Indore's #1 Pick",
    item: MENU_ITEMS.find((m) => m.id === "chipotle-aloo-tikki") || MENU_ITEMS[0],
  },
  {
    type: "most-liked",
    badge: "Most Liked Craving",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
    icon: Heart,
    tagline: "99% Customer Love Score • Double Melted Cheddar",
    item: MENU_ITEMS.find((m) => m.id === "cheese-chilli-aloo-tikki") || MENU_ITEMS[1],
  },
  {
    type: "greatest-reviews",
    badge: "Greatest Reviews",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    icon: Star,
    tagline: "4.9 ★ Rating (420+ Verified Foodie Reviews)",
    item: MENU_ITEMS.find((m) => m.id === "tex-mex-burger") || MENU_ITEMS[2],
  },
];

export function OrderModal() {
  const {
    isOrderModalOpen,
    closeOrderModal,
    cartItems,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openProductDetail,
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

  const getWhatsAppOrderUrl = () => {
    const phone = RESTAURANT_CONFIG.location.phone.replace(/[^0-9]/g, "");

    const itemsSummary = cartItems
      .map((ci) => {
        const addonsText =
          ci.selectedAddons && ci.selectedAddons.length > 0
            ? ` (with ${ci.selectedAddons.map((a) => a.name).join(", ")})`
            : "";
        return `• ${ci.quantity}x ${ci.item.name}${addonsText} at ₹${ci.totalItemPrice}`;
      })
      .join("\n");

    const message = `Hello House of Buns! 👋\n\nI want to purchase:\n${itemsSummary}\n\nTotal Price: ₹${cartTotal}\n\nPlease confirm my order and share delivery/pickup details!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

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
                  className="w-10 h-10 rounded-full bg-hob-bg hover:bg-hob-surface text-hob-brown shadow-sm active:scale-90 transition-all flex items-center justify-center border border-hob-brown/10 cursor-pointer"
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
                    Direct Kitchen Dispatch • Vijay Nagar, Indore
                  </p>
                </div>
              </div>

              {/* Action: Clear cart & Desktop close */}
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    type="button"
                    className="p-2 rounded-full text-hob-muted hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    title="Clear order bag"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}

                <button
                  onClick={handleBack}
                  type="button"
                  className="hidden sm:flex w-9 h-9 rounded-full bg-hob-bg hover:bg-hob-surface text-hob-brown items-center justify-center border border-hob-brown/10 transition-colors cursor-pointer"
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
              
              {/* Empty Bag State with Curated Suggestions */}
              {cartItems.length === 0 ? (
                <div className="space-y-5 my-1">
                  {/* Empty Bag Greeting Card */}
                  <div className="p-6 sm:p-8 text-center bg-white rounded-3xl border border-hob-brown/10 shadow-xs space-y-3">
                    <div className="w-14 h-14 rounded-full bg-hob-bg text-hob-brown mx-auto flex items-center justify-center border border-hob-brown/10 shadow-inner">
                      <ShoppingBag className="w-7 h-7 text-hob-brown/60" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xl text-hob-brown tracking-tight">
                        Your Order Bag is Empty
                      </h3>
                      <p className="text-xs text-hob-muted max-w-sm mx-auto mt-1 leading-relaxed">
                        Start your order with Indore’s most-loved artisanal smash creations below or browse our full menu.
                      </p>
                    </div>
                    <button
                      onClick={handleBack}
                      type="button"
                      className="py-2.5 px-6 rounded-full bg-hob-brown hover:bg-hob-brown-dark text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Browse Full Menu
                    </button>
                  </div>

                  {/* Suggestions Section: Most Picked, Most Liked, Greatest Reviews */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-black uppercase tracking-wider text-hob-brown font-display flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
                        <span>Recommended Suggestions</span>
                      </span>
                      <span className="text-[11px] font-semibold text-hob-muted">
                        Tap + to add
                      </span>
                    </div>

                    <div className="space-y-3">
                      {EMPTY_BAG_SUGGESTIONS.map((suggestion) => {
                        const Icon = suggestion.icon;
                        const item = suggestion.item;
                        if (!item) return null;

                        return (
                          <div
                            key={suggestion.type}
                            className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border border-hob-brown/10 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              {/* Food Image */}
                              <div
                                onClick={() => openProductDetail(item)}
                                className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 bg-hob-surface cursor-pointer group border border-hob-brown/10"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute top-1 left-1 bg-white/95 p-0.5 rounded-md border border-green-600/30">
                                  <span className="w-2 h-2 rounded-full bg-green-600 block" />
                                </div>
                              </div>

                              {/* Details */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border shadow-2xs ${suggestion.badgeColor}`}
                                  >
                                    <Icon className="w-2.5 h-2.5" />
                                    <span>{suggestion.badge}</span>
                                  </span>
                                </div>

                                <h4
                                  onClick={() => openProductDetail(item)}
                                  className="font-display font-bold text-sm text-hob-brown leading-tight truncate cursor-pointer hover:text-emerald-700 transition-colors"
                                >
                                  {item.name}
                                </h4>

                                <p className="text-[11px] text-hob-muted truncate mt-0.5">
                                  {suggestion.tagline}
                                </p>

                                <div className="flex items-baseline gap-1.5 mt-1">
                                  <span className="font-display font-black text-sm sm:text-base text-hob-brown">
                                    ₹{item.price}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="text-xs text-hob-muted line-through">
                                      ₹{item.originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                              onClick={() => addToCart(item, 1)}
                              type="button"
                              className="px-3.5 py-1.5 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-white font-display font-black text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1 cursor-pointer shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
                                className="w-6 h-6 rounded-full bg-white hover:bg-hob-brown hover:text-white text-hob-brown transition-colors flex items-center justify-center shadow-xs cursor-pointer"
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
                                className="w-6 h-6 rounded-full bg-hob-brown text-white hover:bg-hob-brown-dark transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(ci.id)}
                              type="button"
                              className="p-1.5 text-hob-muted hover:text-red-500 transition-colors cursor-pointer"
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

                  {/* Direct WhatsApp Ordering Information Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B2E21] to-[#04160F] text-white shadow-md space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4" />
                      <span>Order Directly via WhatsApp</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h4 className="font-display font-black text-base sm:text-lg text-white">
                        Instant Kitchen Confirmation
                      </h4>
                      <span className="text-[11px] font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full">
                        {RESTAURANT_CONFIG.location.phone}
                      </span>
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">
                      Clicking <strong>"Proceed to Order"</strong> opens your WhatsApp with your items and prices pre-filled:
                    </p>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-[11px] font-mono text-emerald-200/90 whitespace-pre-line leading-relaxed">
                      {`Hello House of Buns! 👋\nI want to purchase:\n${cartItems
                        .map(
                          (ci) =>
                            `• ${ci.quantity}x ${ci.item.name} at ₹${ci.totalItemPrice}`
                        )
                        .join("\n")}\nTotal Price: ₹${cartTotal}`}
                    </div>

                    <div className="space-y-1 pt-1 text-[11px] text-white/70">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Instant receipt & confirmation by our kitchen manager</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Share your address or takeaway time directly in the chat</span>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Proceed to Order on WhatsApp ({RESTAURANT_CONFIG.location.phone})</span>
                    </a>
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
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl active:scale-95 flex items-center gap-2 text-center cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Proceed to Order</span>
                </a>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
