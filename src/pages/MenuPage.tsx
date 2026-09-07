import { useState } from "react";
import { 
  Search, 
  ArrowUpDown, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Check, 
  X,
  XCircle
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { 
  MENU_ITEMS, 
  CATEGORIES, 
  CATEGORY_METAS, 
  type CategoryType 
} from "../data/menuData";

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("Burgers");
  const [searchQuery, setSearchQuery] = useState("");
  const [jainOnly, setJainOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [underPrice, setUnderPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesJain = !jainOnly || item.isJainCertified || item.jainOptionAvailable;
    const matchesBestseller = !bestsellerOnly || item.isBestSeller;
    const matchesUnderPrice = !underPrice || item.price <= underPrice;

    return matchesCategory && matchesSearch && matchesJain && matchesBestseller && matchesUnderPrice;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const activeCategoryMeta = CATEGORY_METAS[selectedCategory] || CATEGORY_METAS.All;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-hob-text pb-24 md:pb-12">
      
      {/* ========================================================================= */}
      {/* FILTER & SEARCH CHIPS BAR (Compact & Flush under Navbar)                  */}
      {/* ========================================================================= */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-hob-brown/10 shadow-xs py-2.5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            
            {/* Compact Search Input */}
            <div className="relative shrink-0 w-40 xs:w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-hob-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search menu...'
                className="w-full bg-hob-surface pl-8 pr-7 py-1.5 rounded-full text-xs text-hob-text placeholder:text-hob-muted focus:outline-none focus:ring-1 focus:ring-[#006241] border border-hob-brown/15 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-hob-muted hover:text-hob-text"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown Chip */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  sortBy !== "featured"
                    ? "bg-[#006241] text-white border-[#006241]"
                    : "bg-white hover:bg-hob-surface text-hob-brown border-hob-brown/15"
                }`}
              >
                <ArrowUpDown className="w-3 h-3" />
                <span>Sort</span>
                <span className="text-[10px] opacity-80">▾</span>
              </button>

              {isSortOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-hob-brown/15 py-1 z-50">
                  {[
                    { label: "Featured", value: "featured" },
                    { label: "Price: Low to High", value: "price-asc" },
                    { label: "Price: High to Low", value: "price-desc" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as any);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-hob-brown hover:bg-hob-surface flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && <Check className="w-3.5 h-3.5 text-[#006241]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Jain Certified Filter Chip */}
            <button
              onClick={() => setJainOnly(!jainOnly)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                jainOnly
                  ? "bg-[#006241] text-white border-[#006241]"
                  : "bg-white hover:bg-green-50 text-emerald-800 border-emerald-300"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Jain Certified</span>
            </button>

            {/* Bestsellers Filter Chip */}
            <button
              onClick={() => setBestsellerOnly(!bestsellerOnly)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                bestsellerOnly
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white hover:bg-amber-50 text-amber-900 border-amber-300"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Bestsellers</span>
            </button>

            {/* Under ₹199 Filter Chip */}
            <button
              onClick={() => setUnderPrice(underPrice === 199 ? null : 199)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                underPrice === 199
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-blue-50 text-blue-900 border-blue-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Under ₹199</span>
            </button>

            {/* Clear Filters (if active) */}
            {(jainOnly || bestsellerOnly || underPrice || sortBy !== "featured" || searchQuery) && (
              <button
                onClick={() => {
                  setJainOnly(false);
                  setBestsellerOnly(false);
                  setUnderPrice(null);
                  setSortBy("featured");
                  setSearchQuery("");
                }}
                type="button"
                className="px-3 py-1.5 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN QUICK-COMMERCE SPLIT VIEW (Sidebar on Left + Product Grid on Right)  */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 mt-3 sm:mt-6">
        <div className="flex gap-2 sm:gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT VERTICAL CATEGORY RAIL                                           */}
          {/* ===================================================================== */}
          <aside className="w-20 xs:w-24 sm:w-56 shrink-0 sticky top-36 sm:top-40 bg-white rounded-2xl sm:rounded-3xl border border-hob-brown/10 shadow-xs py-2 sm:py-3 overflow-hidden">
            <div className="flex flex-col space-y-1 sm:space-y-1.5">
              {CATEGORIES.map((cat) => {
                const meta = CATEGORY_METAS[cat];
                const isActive = selectedCategory === cat;
                const count = cat === "All" 
                  ? MENU_ITEMS.length 
                  : MENU_ITEMS.filter((m) => m.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                    className={`relative w-full text-center sm:text-left py-2.5 px-1.5 sm:px-4 transition-all flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 cursor-pointer group ${
                      isActive
                        ? "bg-green-50/80 text-[#006241] font-black"
                        : "hover:bg-hob-surface/70 text-hob-muted hover:text-hob-text font-bold"
                    }`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-8 sm:h-10 bg-[#006241] rounded-r-full" />
                    )}

                    {/* Circular Icon Container */}
                    <div
                      className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-base shrink-0 transition-transform group-hover:scale-105 shadow-xs ${
                        isActive
                          ? "bg-[#006241] text-white ring-2 ring-[#006241]/20"
                          : "bg-hob-surface border border-hob-brown/10"
                      }`}
                    >
                      <span>{meta.icon}</span>
                    </div>

                    {/* Category Label */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] xs:text-xs sm:text-sm leading-tight block truncate">
                        {meta.name}
                      </span>
                      <span className="hidden sm:block text-[10px] opacity-70 font-normal">
                        {count} items
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ===================================================================== */}
          {/* RIGHT PRODUCT GRID AREA                                               */}
          {/* ===================================================================== */}
          <main className="flex-1 min-w-0">
            
            {/* Category Promotional Hero Banner */}
            <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 overflow-hidden bg-gradient-to-r from-[#FFF1DE] via-[#FFE5C7] to-[#FED6A4] border border-[#F2C18D]/40 shadow-xs">
              <div className="flex items-center justify-between relative z-10 gap-4">
                <div className="max-w-md">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#9E520A] bg-white/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5 shadow-xs">
                    100% Pure Veg • Artisanal Griddle
                  </span>
                  <h2 className="font-display font-black text-base xs:text-lg sm:text-2xl text-hob-brown tracking-tight leading-snug">
                    {activeCategoryMeta.name}
                  </h2>
                  <p className="text-xs text-hob-brown/80 mt-1 leading-relaxed hidden xs:block">
                    {activeCategoryMeta.description}
                  </p>
                </div>

                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
                  <img
                    src={activeCategoryMeta.image}
                    alt={activeCategoryMeta.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Results Count & Active Category Subheader */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-extrabold text-hob-brown">
                Showing {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ⚡ Freshly Prepared in 10 Mins
              </span>
            </div>

            {/* 2-Column Quick-Commerce Product Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} item={item} layout="quick-commerce" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-hob-brown/10 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-hob-surface flex items-center justify-center mx-auto mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="font-display font-black text-lg text-hob-brown">
                  No Pure Veg Items Found
                </h3>
                <p className="text-xs text-hob-muted mt-1 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any products matching your filters. Try clearing your search or switching categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setJainOnly(false);
                    setBestsellerOnly(false);
                    setUnderPrice(null);
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-[#006241] text-white text-xs font-bold tracking-wider uppercase shadow-sm cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}
