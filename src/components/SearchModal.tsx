import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  XCircle,
  Sparkles,
  Plus,
  Check,
  ChevronLeft,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { MENU_ITEMS, CATEGORIES, type CategoryType } from "../data/menuData";

const TRENDING_SEARCHES = [
  "Aloo Tikki",
  "Cheese Coins",
  "Cold Coffee",
  "Peri-Peri Fries",
  "Truffle Veg",
  "Chipotle Burger",
  "Lemon Mint Cooler",
];

export function SearchModal() {
  const {
    isSearchModalOpen,
    closeSearchModal,
    openProductDetail,
    addToCart,
    cartItems,
  } = useCartOrder();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      setQuery("");
      setSelectedCategory("All");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isSearchModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchModalOpen) {
        closeSearchModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, closeSearchModal]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchModalOpen]);

  // Filter items
  const results = MENU_ITEMS.filter((item) => {
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return matchesCat;

    const matchesName = item.name.toLowerCase().includes(trimmed);
    const matchesDesc = item.description.toLowerCase().includes(trimmed);
    const matchesIng = item.ingredients.some((ing) =>
      ing.toLowerCase().includes(trimmed)
    );
    const matchesCategoryName = item.category.toLowerCase().includes(trimmed);

    return matchesCat && (matchesName || matchesDesc || matchesIng || matchesCategoryName);
  });

  if (!isSearchModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-center sm:justify-start items-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearchModal}
          className="fixed inset-0 bg-hob-brown-dark/70 backdrop-blur-md hidden sm:block"
        />

        {/* Search Modal Panel (Full screen on mobile, floating modal card on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full h-full sm:h-auto sm:max-h-[88vh] sm:max-w-2xl bg-white shadow-2xl rounded-none sm:rounded-3xl sm:my-8 flex flex-col overflow-hidden border-0 sm:border sm:border-hob-brown/15"
        >
          {/* Top Search Bar */}
          <div className="p-3.5 sm:p-5 border-b border-hob-brown/10 bg-white sticky top-0 z-10 shadow-xs">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={closeSearchModal}
                type="button"
                className="p-1.5 -ml-1 sm:hidden text-hob-brown hover:bg-hob-bg rounded-xl transition-colors cursor-pointer shrink-0"
                aria-label="Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-hob-caramel/15 text-hob-caramel flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search "Aloo Tikki", "Cheese Coins", "Cold Coffee"...'
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-hob-brown placeholder:text-hob-muted placeholder:font-normal focus:outline-none pr-8 py-1"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-hob-muted hover:text-hob-brown p-1"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Desktop Close button */}
              <button
                onClick={closeSearchModal}
                type="button"
                className="hidden sm:flex p-2 rounded-xl text-hob-muted hover:text-hob-brown hover:bg-hob-bg transition-colors cursor-pointer shrink-0"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 -mb-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                    className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "bg-hob-caramel text-white shadow-xs"
                        : "bg-white text-hob-muted hover:text-hob-brown hover:bg-hob-bg border border-hob-brown/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 sm:pb-6 space-y-5 no-scrollbar">
            
            {/* When search query is empty: Show Trending Chips */}
            {!query && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-hob-muted">
                  <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
                  <span>Popular & Trending Cravings</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      type="button"
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-hob-surface hover:bg-hob-cream text-hob-brown border border-hob-brown/15 transition-all active:scale-95 cursor-pointer shadow-2xs"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between text-xs font-bold text-hob-muted">
              <span>
                {query
                  ? `Found ${results.length} item${results.length === 1 ? "" : "s"}`
                  : `${selectedCategory === "All" ? "All" : selectedCategory} Menu (${results.length})`}
              </span>
              <span className="text-[10px] text-hob-caramel uppercase font-black tracking-widest">
                100% Pure Veg • Artisanal
              </span>
            </div>

            {/* Results List */}
            {results.length > 0 ? (
              <div className="divide-y divide-hob-brown/10">
                {results.map((item) => {
                  const inCartCount = cartItems
                    .filter((ci) => ci.item.id === item.id)
                    .reduce((sum, ci) => sum + ci.quantity, 0);

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        closeSearchModal();
                        openProductDetail(item);
                      }}
                      className="py-3.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-hob-cream/50 -mx-2 px-2 rounded-2xl transition-colors"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-hob-surface border border-hob-brown/10 shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.isBestSeller && (
                            <span className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] font-black uppercase px-1 py-0.2 rounded-md">
                              Star
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block shrink-0" />
                            <h4 className="font-display font-black text-sm text-hob-brown truncate group-hover:text-hob-caramel transition-colors">
                              {item.name}
                            </h4>
                          </div>

                          <p className="text-xs text-hob-muted line-clamp-1">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-display font-black text-xs sm:text-sm text-hob-brown">
                              ₹{item.price}
                            </span>
                            <span className="text-[10px] text-hob-muted px-1.5 py-0.2 rounded-md bg-hob-surface border border-hob-brown/10">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Add Action */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item, 1);
                          }}
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-hob-surface hover:bg-hob-caramel text-hob-brown hover:text-white border border-hob-brown/15 hover:border-transparent text-xs font-bold transition-all shadow-2xs flex items-center gap-1 active:scale-95 cursor-pointer"
                        >
                          {inCartCount > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{inCartCount} in bag</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-hob-surface mx-auto flex items-center justify-center text-hob-muted border border-hob-brown/10 shadow-xs">
                  <Search className="w-6 h-6 text-hob-muted" />
                </div>
                <h4 className="font-display font-black text-base text-hob-brown">
                  No dishes found for "{query}"
                </h4>
                <p className="text-xs text-hob-muted max-w-xs mx-auto">
                  Try searching for keywords like "tikki", "brioche", "fries", or
                  "shake".
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                  }}
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-hob-caramel hover:underline cursor-pointer pt-1"
                >
                  View full menu
                </button>
              </div>
            )}

          </div>

          {/* Modal Footer - Desktop only */}
          <div className="hidden sm:flex p-3.5 px-5 bg-hob-surface border-t border-hob-brown/10 items-center justify-between text-xs text-hob-muted">
            <span className="text-[11px]">
              Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-hob-brown/20 font-mono text-[10px]">ESC</kbd> to exit
            </span>
            <span className="font-display font-black text-[11px] text-hob-brown">
              House of Buns Menu
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
