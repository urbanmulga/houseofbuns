import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent
} from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Flame,
  Utensils,
  Wheat,
  Layers,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { MENU_ITEMS } from "../data/menuData";

export function AnimatedImageDrawer() {
  const { openProductDetail, openOrderModal } = useCartOrder();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);

  const smashBurgerItem =
    MENU_ITEMS.find((m) => m.id === "cheese-chilli-aloo-tikki") || MENU_ITEMS[0];

  const feastComboItem = {
    id: "house-veg-feast-combo",
    name: "House Pure Veg Feast Combo",
    category: "Burgers" as const,
    price: 399,
    originalPrice: 489,
    description: "Cheese Chilli Aloo Tikki + Peri-Peri Cheesy Fries + Chilled Cold Coffee.",
    image: "/images/hero-burger.jpg",
    isVeg: true as const,
    rating: 4.9,
    reviewCount: 310,
    bunType: "100% Eggless Brioche",
    servingSize: "Full Feast Box",
    prepTime: "12 MINS",
    ingredients: ["Cheese Chilli Tikki", "Peri-Peri Fries", "Cold Coffee (350ml)"],
  };

  // -------------------------------------------------------------
  // Scroll-driven stacking transforms
  // -------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track scroll progress to update active layer tab
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.38) {
      setActiveLayer(0);
    } else if (latest < 0.72) {
      setActiveLayer(1);
    } else {
      setActiveLayer(2);
    }
  });

  // Card 1 transforms (Foundation)
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.30, 0.42, 0.65, 0.78],
    [0, 0, -12, -12, -24]
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.30, 0.42, 0.65, 0.78],
    [1, 1, 0.96, 0.96, 0.92]
  );
  const card1Filter = useTransform(
    scrollYProgress,
    [0, 0.30, 0.42, 0.65, 0.78],
    [
      "brightness(100%)",
      "brightness(100%)",
      "brightness(85%)",
      "brightness(85%)",
      "brightness(70%)",
    ]
  );

  // Card 2 transforms (Smashed Patty) - Slides up fully opaque like a physical card
  const card2Y = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.65, 0.78],
    ["105%", "0%", "0%", "-12px"]
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.65, 0.78],
    [1, 1, 1, 0.96]
  );
  const card2Filter = useTransform(
    scrollYProgress,
    [0.42, 0.65, 0.78],
    ["brightness(100%)", "brightness(100%)", "brightness(85%)"]
  );

  // Card 3 transforms (The Ultimate Feast) - Slides up fully opaque like a physical card
  const card3Y = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    ["105%", "0%"]
  );
  const card3Scale = useTransform(scrollYProgress, [0.55, 0.75], [1, 1]);

  // Smooth click scroll to layer
  const scrollToLayer = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollableRange = container.offsetHeight - window.innerHeight;

    // Target positions: 0.1 for layer 0, 0.52 for layer 1, 0.88 for layer 2
    const targetRatio = index === 0 ? 0.08 : index === 1 ? 0.52 : 0.88;
    const targetScrollY = containerTop + scrollableRange * targetRatio;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const TABS = [
    { id: 0, label: "The Bun", num: "01" },
    { id: 1, label: "The Patty", num: "02" },
    { id: 2, label: "The Feast", num: "03" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh] sm:h-[300vh] bg-transparent"
    >
      {/* ======================================================== */}
      {/* STICKY VIEWPORT CONTAINER                                  */}
      {/* Constrained to available height between top & bottom nav   */}
      {/* ======================================================== */}
      <div className="sticky top-[80px] sm:top-[88px] h-[calc(100dvh-155px)] max-h-[700px] w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-1 sm:py-3 z-20 select-none">
        
        {/* SECTION HEADER & TABS */}
        <div className="text-center w-full max-w-2xl mx-auto mb-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-brown/10 text-hob-brown text-[11px] sm:text-xs font-extrabold uppercase tracking-widest font-display mb-1.5">
            <Layers className="w-3.5 h-3.5 text-hob-caramel" />
            <span>Scroll-Driven Craft Experience</span>
          </div>

          <h2 className="font-display font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-hob-brown tracking-tight leading-tight">
            THE ARTISANAL STACK
          </h2>

          <p className="text-[11px] sm:text-xs text-hob-muted max-w-md mx-auto hidden xs:block mt-0.5">
            Scroll down to watch our morning bake meet the blistering chrome griddle — crafted fresh to order.
          </p>

          {/* CARD SWITCHER TABS */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">
            {TABS.map((tab) => {
              const isActive = activeLayer === tab.id;
              const isCompleted = activeLayer > tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToLayer(tab.id)}
                  type="button"
                  className={`px-3 xs:px-4 py-1.5 sm:py-2 rounded-full font-display text-[11px] sm:text-xs font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-[#062419] text-white shadow-md border-[#006241]/40 scale-102"
                      : isCompleted
                      ? "bg-emerald-900/10 text-emerald-900 border-emerald-800/20 hover:bg-emerald-900/15"
                      : "bg-white text-hob-brown/80 border-hob-brown/15 hover:bg-hob-surface"
                  }`}
                >
                  <span
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black ${
                      isActive
                        ? "bg-hob-caramel text-white"
                        : isCompleted
                        ? "bg-emerald-700 text-white"
                        : "bg-hob-brown/10 text-hob-brown"
                    }`}
                  >
                    {isCompleted ? "✓" : tab.num}
                  </span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3D SCROLL-DRIVEN CARD DECK FRAME                          */}
        {/* ======================================================== */}
        <div className="relative w-full flex-1 min-h-[380px] xs:min-h-[420px] sm:min-h-[460px] my-1 sm:my-2">
          
          {/* ====================================================== */}
          {/* CARD 1: THE FOUNDATION (01 / 03) */}
          {/* ====================================================== */}
          <motion.div
            style={{
              y: card1Y,
              scale: card1Scale,
              filter: card1Filter,
            }}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.75rem] p-4 xs:p-5 sm:p-8 md:p-9 bg-[#062419] text-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden z-10"
          >
            {/* Background Image with Cinematic Directional Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src="/images/brioche-buns.jpg"
                alt="Artisanal Brioche Buns"
                className="w-full h-full object-cover object-center md:object-[80%_center] opacity-60 sm:opacity-75 filter saturate-[1.25] brightness-95 scale-105 transition-transform duration-700"
              />
              {/* Left-to-right gradient: dark where text is, transparent on right to reveal golden buns */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#062419] via-[#062419]/90 md:via-[#062419]/70 to-[#062419]/30" />
              {/* Subtle top and bottom vignettes to keep badges and footer buttons ultra-crisp */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04140D] via-transparent to-[#062419]/85" />
            </div>

            {/* Ambient glow */}
            <div className="absolute right-0 top-0 w-64 h-64 sm:w-80 sm:h-80 bg-hob-caramel/20 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-hob-caramel text-white font-display font-black text-xs flex items-center justify-center shadow-xs">
                  01
                </span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-hob-mint font-display">
                  The Foundation
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-hob-mint text-[10px] sm:text-xs font-bold font-display">
                <Sparkles className="w-3 h-3 text-hob-mint" />
                <span>100% Eggless • Baked Fresh 5 AM</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="py-2.5 sm:py-6 relative z-10 max-w-2xl space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-hob-mint/90 uppercase tracking-wider">
                <Wheat className="w-3.5 h-3.5 text-hob-caramel" />
                <span>French Butter Enriched Dough (Eggless)</span>
              </div>

              <h3 className="font-display font-black text-xl xs:text-2xl sm:text-4xl text-white tracking-tight leading-[1.15]">
                The Golden Cloud{" "}
                <span className="text-hob-mint font-cursive lowercase italic text-2xl xs:text-3xl sm:text-5xl">
                  brioche
                </span>{" "}
                Foundation.
              </h3>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl">
                Before our patties touch blistering chrome, our micro-bakery proofs flour with pure French butter, cultured cream, and raw honey for a 100% eggless pillowy bun that compresses softly and springs back.
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  48-Hr Cold Ferment
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  100% Eggless Brioche
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Stone-Hearth Baked
                </span>
              </div>
            </div>

            {/* Bottom Bar: High-contrast emerald button, no "Step 1 of 3", no "Layer 02" */}
            <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-white/80 text-xs relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-hob-mint font-bold uppercase tracking-wider">
                  Foundation Ready
                </span>
              </div>
              <button
                onClick={() => scrollToLayer(1)}
                type="button"
                className="py-2 px-4 sm:px-5 rounded-full bg-[#00A862] hover:bg-[#009054] text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg border border-white/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next: Smashed Patty</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* CARD 2: THE SIZZLE (02 / 03) */}
          {/* ====================================================== */}
          <motion.div
            style={{
              y: card2Y,
              scale: card2Scale,
              filter: card2Filter,
            }}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.75rem] p-4 xs:p-5 sm:p-8 md:p-9 bg-[#0A2218] text-white border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col justify-between overflow-hidden z-20"
          >
            {/* Background Image with Cinematic Directional Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src="/images/hero-burger.jpg"
                alt="Cheese Chilli Aloo Tikki"
                className="w-full h-full object-cover object-center md:object-[80%_center] opacity-60 sm:opacity-75 filter saturate-[1.25] brightness-95 scale-105 transition-transform duration-700"
              />
              {/* Left-to-right gradient: dark where text is, transparent on right to reveal juicy burger */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A2218] via-[#0A2218]/90 md:via-[#0A2218]/70 to-[#0A2218]/30" />
              {/* Subtle top and bottom vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-transparent to-[#0A2218]/85" />
            </div>

            {/* Ambient glow */}
            <div className="absolute left-0 bottom-0 w-64 h-64 sm:w-80 sm:h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-display font-black text-xs flex items-center justify-center shadow-xs">
                  02
                </span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-orange-300 font-display">
                  The High-Heat Smash
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-orange-500/15 backdrop-blur-md border border-orange-400/25 text-orange-200 text-[10px] sm:text-xs font-bold font-display">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                <span>400°F Flat-Top Sear</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="py-2.5 sm:py-6 relative z-10 max-w-2xl space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-orange-300/90 uppercase tracking-wider">
                <span>100% Pure Veg • Smashed Cheese Patty</span>
              </div>

              <h3 className="font-display font-black text-xl xs:text-2xl sm:text-4xl text-white tracking-tight leading-[1.15]">
                Cheese Chilli{" "}
                <span className="text-hob-mint font-cursive lowercase italic text-2xl xs:text-3xl sm:text-5xl">
                  smashed
                </span>{" "}
                Aloo Tikki
              </h3>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl">
                Molten mozzarella & cheddar core spiced potato patty smashed paper-thin against seasoned chrome griddles to lock in flavor with a crispy lace skirt, green chilli relish, and secret house spread.
              </p>

              {/* Price & Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="font-display font-black text-xl sm:text-3xl text-white mr-1">
                  ₹219
                </span>
                <button
                  onClick={() => openProductDetail(smashBurgerItem)}
                  type="button"
                  className="py-1.5 px-3.5 sm:px-4 rounded-full bg-[#B9442C] hover:bg-[#D14D32] text-white font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => openOrderModal(smashBurgerItem)}
                  type="button"
                  className="py-1.5 px-3.5 sm:px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-white/20 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <Utensils className="w-3 h-3 text-hob-mint" />
                  <span>Order Now</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Lacey Maillard Skirt
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Melted Mozzarella
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Secret Green Relish
                </span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-white/80 text-xs relative z-10">
              <button
                onClick={() => scrollToLayer(0)}
                type="button"
                className="py-1.5 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-display font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-all cursor-pointer border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: The Foundation</span>
              </button>
              <button
                onClick={() => scrollToLayer(2)}
                type="button"
                className="py-2 px-4 sm:px-5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                <span>Next: The Ultimate Feast</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* CARD 3: THE FEAST (03 / 03) */}
          {/* ====================================================== */}
          <motion.div
            style={{
              y: card3Y,
              scale: card3Scale,
            }}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.75rem] p-4 xs:p-5 sm:p-8 md:p-9 bg-[#051710] text-white border border-hob-caramel/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden z-30"
          >
            {/* Background Image with Cinematic Directional Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src="/images/combo-spread.jpg"
                alt="The Ultimate Feast Combo"
                className="w-full h-full object-cover object-center md:object-[80%_center] opacity-60 sm:opacity-75 filter saturate-[1.25] brightness-95 scale-105 transition-transform duration-700"
              />
              {/* Left-to-right gradient: dark where text is, transparent on right to reveal feast spread */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#051710] via-[#051710]/90 md:via-[#051710]/70 to-[#051710]/30" />
              {/* Subtle top and bottom vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030E09] via-transparent to-[#051710]/85" />
            </div>

            {/* Ambient glow */}
            <div className="absolute right-0 bottom-0 w-64 h-64 sm:w-80 sm:h-80 bg-hob-mint/15 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-hob-caramel text-white font-display font-black text-xs flex items-center justify-center shadow-xs">
                  03
                </span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-hob-mint font-display">
                  The Ultimate Feast
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-hob-caramel/20 backdrop-blur-md border border-hob-caramel/30 text-hob-mint text-[10px] sm:text-xs font-bold font-display">
                <Sparkles className="w-3 h-3 text-hob-caramel" />
                <span>Save ₹90 • 100% Pure Veg Box</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="py-2.5 sm:py-6 relative z-10 max-w-2xl space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-hob-mint/90 uppercase tracking-wider">
                <span>The Complete House Ritual • 100% Pure Veg</span>
              </div>

              <h3 className="font-display font-black text-xl xs:text-2xl sm:text-4xl text-white tracking-tight leading-[1.15]">
                The Pure Veg{" "}
                <span className="text-hob-mint font-cursive lowercase italic text-2xl xs:text-3xl sm:text-5xl">
                  artisanal
                </span>{" "}
                Feast Combo
              </h3>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl">
                Cheese Chilli Aloo Tikki Burger paired with House Peri-Peri Cheesy Fries and chilled Signature Cold Coffee. 100% Pure Veg, eggless brioche, delivered hot or savored at Vijay Nagar.
              </p>

              {/* Price & Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <div className="flex items-baseline gap-1 mr-1">
                  <span className="font-display font-black text-xl sm:text-3xl text-white">
                    ₹399
                  </span>
                  <span className="text-xs text-white/50 line-through">
                    ₹489
                  </span>
                </div>
                <button
                  onClick={() => openProductDetail(feastComboItem)}
                  type="button"
                  className="py-1.5 px-3.5 sm:px-4 rounded-full bg-[#B9442C] hover:bg-[#D14D32] text-white font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => openOrderModal(feastComboItem)}
                  type="button"
                  className="py-1.5 px-3.5 sm:px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-white/20 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <Utensils className="w-3 h-3 text-hob-mint" />
                  <span>Order Now</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Burger: Cheese Chilli
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Sides: Peri-Peri Fries
                </span>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/15 shadow-xs">
                  Drink: Cold Coffee
                </span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-white/80 text-xs relative z-10">
              <button
                onClick={() => scrollToLayer(1)}
                type="button"
                className="py-1.5 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-display font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-all cursor-pointer border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Smashed Patty</span>
              </button>
              <button
                onClick={() => openOrderModal(feastComboItem)}
                type="button"
                className="py-2 px-4 sm:px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>The Stack is Complete • Order Feast</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
