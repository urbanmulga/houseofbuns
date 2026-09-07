import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  Plus,
  Minus,
  Check,
  Sparkles,
  Flame,
  Star,
  Share2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function ProductDetailModal() {
  const { selectedProduct, closeProductDetail, addToCart, showToast } = useCartOrder();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [activeTab, setActiveTab] = useState<"details" | "addons" | "reviews">("details");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setSelectedAddons([]);
    setActiveTab("details");
    setIsExpanded(false);
  }, [selectedProduct]);

  // Support hardware/browser back button on mobile devices
  useEffect(() => {
    if (!selectedProduct) return;

    window.history.pushState({ modal: "product-detail" }, "");
    const handlePopState = () => {
      closeProductDetail();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedProduct, closeProductDetail]);

  if (!selectedProduct) return null;

  const handleBack = () => {
    closeProductDetail();
    if (window.history.state?.modal === "product-detail") {
      window.history.back();
    }
  };

  const toggleAddon = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons((prev) => prev.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons((prev) => [...prev, addon]);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedProduct.name} - House of Buns`,
        text: `Check out ${selectedProduct.name} at House of Buns Indore!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const finalUnitPrice = selectedProduct.price + addonsTotal;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddAndClose = () => {
    addToCart(selectedProduct, quantity, selectedAddons);
    handleBack();
  };

  const sampleReviews = [
    {
      author: "Aditya Verma",
      location: "Vijay Nagar, Indore",
      rating: 5,
      comment: "The crust and caramelization on this smashed patty is world class. You can genuinely taste the fresh morning bake!",
    },
    {
      author: "Shreya Joshi",
      location: "Old Palasia, Indore",
      rating: 5,
      comment: "Super buttery brioche that holds all the sauces without getting soggy. Indore's best burger by far.",
    },
  ];

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
            className="w-full sm:max-w-lg min-h-screen sm:min-h-0 sm:max-h-[90vh] bg-hob-bg sm:bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-hob-brown/15 overflow-hidden flex flex-col pointer-events-auto relative"
          >
            {/* ======================================================== */}
            {/* TOP HERO IMAGE BANNER: Full-Bleed Filled Till Edges       */}
            {/* ======================================================== */}
            <div className="relative w-full h-72 xs:h-80 sm:h-88 overflow-hidden shrink-0 bg-hob-surface">
              {/* Full-bleed Food Image filled till edges */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient Overlays for contrast and crisp controls */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/60 pointer-events-none" />

              {/* Floating Top Navigation Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 sm:p-5 z-20 flex items-center justify-between">
                {/* Mobile & Desktop Back Button */}
                <button
                  onClick={handleBack}
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-hob-brown shadow-lg active:scale-90 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer border border-white/30"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Center Badge / Category */}
                <div className="px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-center shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 font-display block">
                    House of Buns Indore
                  </span>
                  <span className="text-[11px] font-bold text-white/95">
                    {selectedProduct.bunType}
                  </span>
                </div>

                {/* Right Action: Share & Desktop Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    type="button"
                    className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-hob-brown shadow-lg active:scale-90 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer border border-white/30"
                    aria-label="Share item"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleBack}
                    type="button"
                    className="hidden sm:flex w-10 h-10 rounded-full bg-white/90 hover:bg-white text-hob-brown shadow-lg active:scale-90 transition-all items-center justify-center backdrop-blur-md cursor-pointer border border-white/30"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Floating Badges at Bottom of Image */}
              <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-md ${
                      selectedProduct.isVeg
                        ? "bg-emerald-600/95 text-white border border-emerald-400/40"
                        : "bg-red-600/95 text-white border border-red-400/40"
                    }`}
                  >
                    {selectedProduct.isVeg ? "100% Pure Veg" : "Non-Veg"}
                  </span>

                  {selectedProduct.isBestSeller && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-hob-brown/95 text-white flex items-center gap-1 shadow-md backdrop-blur-md border border-hob-caramel/40">
                      <Sparkles className="w-3 h-3 text-hob-caramel" />
                      Best Seller
                    </span>
                  )}
                </div>

                {selectedProduct.isJainCertified && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#006241] shadow-md backdrop-blur-md font-display border border-emerald-200">
                    Jain Certified
                  </span>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* CONTENT BODY: Title, Segmented Tabs, and Information */}
            {/* ======================================================== */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 pt-5 pb-28 space-y-5 bg-white">
              {/* Title & Price Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-hob-brown tracking-tight leading-tight">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-xs font-bold text-hob-muted uppercase tracking-wider mt-1">
                    {selectedProduct.category} • Fresh Dawn Bake
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display font-black text-2xl sm:text-3xl text-hob-brown block">
                    ₹{finalUnitPrice}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xs text-hob-muted line-through font-semibold">
                      ₹{selectedProduct.originalPrice + addonsTotal}
                    </span>
                  )}
                </div>
              </div>

              {/* Segmented Pill Tabs (Details / Add-ons / Reviews) */}
              <div className="flex items-center gap-1.5 p-1 bg-hob-bg rounded-full border border-hob-brown/10">
                <button
                  onClick={() => setActiveTab("details")}
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold tracking-wide transition-all ${
                    activeTab === "details"
                      ? "bg-hob-brown text-white shadow-sm"
                      : "text-hob-muted hover:text-hob-brown"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("addons")}
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold tracking-wide transition-all relative ${
                    activeTab === "addons"
                      ? "bg-hob-brown text-white shadow-sm"
                      : "text-hob-muted hover:text-hob-brown"
                  }`}
                >
                  <span>Add-ons</span>
                  {selectedAddons.length > 0 && (
                    <span className="ml-1 bg-hob-caramel text-white text-[10px] px-1.5 py-0.2 rounded-full">
                      {selectedAddons.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold tracking-wide transition-all ${
                    activeTab === "reviews"
                      ? "bg-hob-brown text-white shadow-sm"
                      : "text-hob-muted hover:text-hob-brown"
                  }`}
                >
                  Reviews (4.9 ★)
                </button>
              </div>

              {/* Tab 1: Details */}
              {activeTab === "details" && (
                <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
                  {/* Description with "See more" */}
                  <div>
                    <p className="text-sm text-hob-muted leading-relaxed">
                      {isExpanded
                        ? selectedProduct.description
                        : `${selectedProduct.description.slice(0, 110)}...`}
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        type="button"
                        className="ml-1 font-bold text-hob-brown hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Show less" : "See more."}
                      </button>
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-hob-bg border border-hob-brown/10">
                      <Clock className="w-4 h-4 text-hob-caramel shrink-0" />
                      <div>
                        <span className="text-[10px] text-hob-muted font-bold block uppercase">Fresh Bake</span>
                        <span className="text-xs font-bold text-hob-brown">5:00 AM Daily</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-hob-bg border border-hob-brown/10">
                      <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-hob-muted font-bold block uppercase">Energy</span>
                        <span className="text-xs font-bold text-hob-brown">{selectedProduct.calories || "580 kcal"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-hob-bg border border-hob-brown/10">
                      <ShieldCheck className="w-4 h-4 text-hob-caramel shrink-0" />
                      <div>
                        <span className="text-[10px] text-hob-muted font-bold block uppercase">Standard</span>
                        <span className="text-xs font-bold text-hob-brown">Zero Preservatives</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-hob-bg border border-hob-brown/10">
                      <Sparkles className="w-4 h-4 text-hob-caramel shrink-0" />
                      <div>
                        <span className="text-[10px] text-hob-muted font-bold block uppercase">Bun Craft</span>
                        <span className="text-xs font-bold text-hob-brown">{selectedProduct.bunType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Chips */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-hob-brown mb-2 font-display">
                      House Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-hob-bg text-hob-text/80 px-3 py-1 rounded-full border border-hob-brown/10 font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Custom Add-ons */}
              {activeTab === "addons" && (
                <div className="space-y-3 animate-fadeIn">
                  <p className="text-xs text-hob-muted">
                    Customize your burger with artisanal additions crafted in our kitchen:
                  </p>
                  {selectedProduct.addons && selectedProduct.addons.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProduct.addons.map((addon) => {
                        const isChecked = selectedAddons.some((a) => a.name === addon.name);
                        return (
                          <button
                            key={addon.name}
                            onClick={() => toggleAddon(addon)}
                            type="button"
                            className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                              isChecked
                                ? "bg-hob-brown/10 border-hob-brown text-hob-brown shadow-sm"
                                : "bg-hob-bg border-hob-brown/10 text-hob-text hover:border-hob-brown/30"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                                  isChecked
                                    ? "bg-hob-brown border-hob-brown text-white"
                                    : "border-hob-muted/50 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className="text-xs font-bold">{addon.name}</span>
                            </div>
                            <span className="text-hob-caramel font-black">+₹{addon.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-hob-muted py-4 text-center bg-hob-bg rounded-2xl">
                      Standard chef specification. No extra add-ons required.
                    </p>
                  )}
                </div>
              )}

              {/* Tab 3: Customer Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-hob-bg border border-hob-brown/10 flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-xl text-hob-brown block">4.9 / 5.0</span>
                      <span className="text-[11px] text-hob-muted">Based on 280+ Indore foodie ratings</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                  </div>

                  {sampleReviews.map((rev, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-hob-bg border border-hob-brown/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs text-hob-brown">{rev.author}</span>
                        <span className="text-[10px] text-hob-muted">{rev.location}</span>
                      </div>
                      <p className="text-xs text-hob-text/90 italic leading-relaxed">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* FIXED BOTTOM ACTION BAR matching Reference Mockup */}
            {/* ======================================================== */}
            <div className="fixed sm:static bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-hob-brown/10 z-30 flex items-center gap-3 sm:gap-4 shadow-lg sm:shadow-none">
              {/* Quantity Stepper (Pill with + and - matching reference mockup) */}
              <div className="flex items-center gap-2 bg-hob-bg rounded-full p-1.5 border border-hob-brown/15 shrink-0 shadow-inner">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  type="button"
                  className="w-8 h-8 rounded-full bg-white hover:bg-hob-brown hover:text-white text-hob-brown transition-colors flex items-center justify-center shadow-sm"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-black w-6 text-center text-hob-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  type="button"
                  className="w-8 h-8 rounded-full bg-hob-brown text-white hover:bg-hob-brown-dark transition-colors flex items-center justify-center shadow-sm"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Big Prominent Add to Cart Button */}
              <button
                onClick={handleAddAndClose}
                type="button"
                className="flex-1 py-4 px-6 rounded-full bg-hob-brown hover:bg-hob-brown-dark text-white font-display font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <span>Add to cart</span>
                <span className="text-white/60">•</span>
                <span className="font-black text-hob-mint">₹{totalPrice}</span>
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
