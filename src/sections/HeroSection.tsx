import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, Flame, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";
import { MENU_ITEMS } from "../data/menuData";
import { ProductCard } from "../components/ProductCard";

const HERO_SLIDES = [
  {
    id: "brioche-bun",
    name: "5 AM Fresh Brioche Bun",
    bgWord: "BUN",
    fontClass: "text-[11.5rem] xs:text-[13.8rem] sm:text-[17rem] lg:text-[21rem]",
    tracking: "tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.22em]",
    scaleClass: "scale-y-[1.92] scale-x-[0.92]",
    tag: "100% PURE VEG • EGGLESS BRIOCHE",
    headlineSubtitle: "Indore’s gold-standard 100% Pure Veg artisanal smashed patties grilled over blistering steel, stacked in fresh daily 5 AM eggless butter brioche buns. Certified Jain Friendly.",
    price: 219,
    image: "/images/hero-brioche-bun.png",
    alt: "Artisanal Eggless Brioche Bun",
    menuItemId: "cheese-chilli-aloo-tikki",
  },
  {
    id: "salted-fries",
    name: "Classic Salted Fries",
    bgWord: "FRIES",
    fontClass: "text-[10.5rem] xs:text-[12.8rem] sm:text-[15.8rem] lg:text-[19.5rem]",
    tracking: "tracking-tight",
    scaleClass: "scale-y-[1.92] scale-x-[0.84]",
    tag: "CRISPY & GOLDEN • ZERO TRANS FAT",
    headlineSubtitle: "Farm-fresh golden potatoes double-fried to crunchy perfection, lightly tossed in Himalayan sea salt. Served piping hot.",
    price: 129,
    image: "/images/hero-fries.png",
    alt: "Golden Crispy Fries",
    menuItemId: "salted-fries",
  },
  {
    id: "cold-coffee",
    name: "Artisanal Cold Coffee",
    bgWord: "SHAKES",
    fontClass: "text-[8.5rem] xs:text-[10.2rem] sm:text-[13rem] lg:text-[16.5rem]",
    tracking: "tracking-tighter",
    scaleClass: "scale-y-[1.8] scale-x-[0.78]",
    tag: "SLOW-BREWED • ROASTED BEANS",
    headlineSubtitle: "Velvety South Indian Arabica cold brew blended with chilled cream, crowned with rich foam and roasted espresso beans.",
    price: 149,
    image: "/images/hero-cold-coffee.png",
    alt: "House Signature Cold Coffee",
    menuItemId: "house-cold-coffee",
  },
  {
    id: "mint-cooler",
    name: "Lemon Mint Cooler",
    bgWord: "DRINKS",
    fontClass: "text-[8.5rem] xs:text-[10.2rem] sm:text-[13rem] lg:text-[16.5rem]",
    tracking: "tracking-tight",
    scaleClass: "scale-y-[1.8] scale-x-[0.78]",
    tag: "CHILLED REFRESHER • ALL NATURAL",
    headlineSubtitle: "Sparkling iced brew loaded with hand-plucked garden mint, freshly squeezed Meyer lemons, and cooling effervescence.",
    price: 119,
    image: "/images/hero-mint-cooler.png",
    alt: "Zesty Lemon Mint Cooler",
    menuItemId: "lemon-mint-iced-tea",
  },
];

const SPECIAL_OFFERS = [
  {
    id: "feast-combo",
    discountBadge: "Save ₹90",
    discountAmount: "₹90",
    headlineLine1: "Feasts that make",
    headlineLine2: "heads turn.",
    subtext: "Cheese Chilli Tikki + Peri-Peri Fries + Cold Coffee",
    price: 399,
    originalPrice: 489,
    ctaText: "Save in-store with vouchers",
    image: "/images/combo-spread.jpg",
    overlayGradient: "from-[#20050D]/95 via-[#541022]/40 to-transparent",
    buttonBorder: "border-yellow-400/90 text-yellow-300 bg-rose-950/50 hover:bg-rose-950/70",
    activeIndicator: "bg-[#E11D48]",
    comboItem: {
      id: "house-veg-feast-combo",
      name: "House Pure Veg Feast Combo",
      category: "Burgers" as const,
      price: 399,
      originalPrice: 489,
      description: "Cheese Chilli Aloo Tikki + House Peri-Peri Cheesy Fries + Chilled Cold Coffee.",
      image: "/images/hero-burger.jpg",
      isVeg: true as const,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 310,
      bunType: "100% Eggless Butter Brioche",
      servingSize: "Full Feast Box",
      prepTime: "12 MINS",
      ingredients: ["Cheese Chilli Tikki Burger", "Peri-Peri Cheesy Fries", "House Cold Coffee (350ml)"],
    },
  },
  {
    id: "smashed-duo",
    discountBadge: "Save ₹70",
    discountAmount: "₹70",
    headlineLine1: "Burgers that make",
    headlineLine2: "cravings roar.",
    subtext: "2x Classic Smashed Aloo Tikki Burgers + Salted Fries",
    price: 299,
    originalPrice: 369,
    ctaText: "Save in-store with vouchers",
    image: "/images/hero-burger.jpg",
    overlayGradient: "from-[#240A02]/95 via-[#5A1C07]/40 to-transparent",
    buttonBorder: "border-amber-400/90 text-amber-300 bg-amber-950/50 hover:bg-amber-950/70",
    activeIndicator: "bg-amber-500",
    comboItem: {
      id: "midnight-smashed-duo",
      name: "Midnight Smashed Duo Deal",
      category: "Burgers" as const,
      price: 299,
      originalPrice: 369,
      description: "2x Classic Smashed Aloo Tikki Burgers + Golden Salted Fries.",
      image: "/images/hero-burger.jpg",
      isVeg: true as const,
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 220,
      bunType: "100% Eggless Butter Brioche",
      servingSize: "2 Burgers + Fries",
      prepTime: "12 MINS",
      ingredients: ["2x Smashed Aloo Tikki", "Salted Fries (150g)"],
    },
  },
  {
    id: "nachos-coolers",
    discountBadge: "Save ₹80",
    discountAmount: "₹80",
    headlineLine1: "Loaded bites that",
    headlineLine2: "spark pure joy.",
    subtext: "Overloaded Cheesy Nachos + 2 Chilled Iced Coolers",
    price: 279,
    originalPrice: 359,
    ctaText: "Save in-store with vouchers",
    image: "/images/loaded-nachos.jpg",
    overlayGradient: "from-[#140324]/95 via-[#450F73]/40 to-transparent",
    buttonBorder: "border-fuchsia-300/90 text-fuchsia-200 bg-purple-950/50 hover:bg-purple-950/70",
    activeIndicator: "bg-purple-500",
    comboItem: {
      id: "loaded-crunch-sip-combo",
      name: "Loaded Crunch & Sip Combo",
      category: "Sides" as const,
      price: 279,
      originalPrice: 359,
      description: "Overloaded Cheesy Nachos + 2 Chilled Lemon Mint Iced Teas.",
      image: "/images/loaded-nachos.jpg",
      isVeg: true as const,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 195,
      bunType: "Nachos Feast",
      servingSize: "Sharing Platter",
      prepTime: "8 MINS",
      ingredients: ["Tortilla Chips", "Molten Queso", "2x Iced Coolers"],
    },
  },
  {
    id: "toastie-coffee",
    discountBadge: "Save ₹60",
    discountAmount: "₹60",
    headlineLine1: "Golden melts that",
    headlineLine2: "hit the spot.",
    subtext: "Cheese Chilli Garlic Toastie + Thick Arabica Cold Coffee",
    price: 249,
    originalPrice: 309,
    ctaText: "Save in-store with vouchers",
    image: "/images/garlic-toasties.jpg",
    overlayGradient: "from-[#03150D]/95 via-[#083E26]/40 to-transparent",
    buttonBorder: "border-emerald-400/90 text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950/70",
    activeIndicator: "bg-emerald-600",
    comboItem: {
      id: "toastie-coffee-break",
      name: "Toastie & Cold Coffee Break",
      category: "Garlic Bread Toasties" as const,
      price: 249,
      originalPrice: 309,
      description: "Cheese Chilli Garlic Toastie + Thick Arabica Cold Coffee.",
      image: "/images/garlic-toasties.jpg",
      isVeg: true as const,
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 240,
      bunType: "Artisanal Toastie",
      servingSize: "Toastie + Coffee",
      prepTime: "10 MINS",
      ingredients: ["Brioche Toastie", "Cheese Chilli", "Cold Coffee"],
    },
  },
];

export function HeroSection() {
  const { openOrderModal } = useCartOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [isOfferHovered, setIsOfferHovered] = useState(false);

  const currentSlide = ((page % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
  const prevSlideIndex = (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  const nextSlideIndex = (currentSlide + 1) % HERO_SLIDES.length;

  const prevOfferIndex = (activeOfferIndex - 1 + SPECIAL_OFFERS.length) % SPECIAL_OFFERS.length;
  const nextOfferIndex = (activeOfferIndex + 1) % SPECIAL_OFFERS.length;

  const activeOffer = SPECIAL_OFFERS[activeOfferIndex];
  const prevOffer = SPECIAL_OFFERS[prevOfferIndex];
  const nextOffer = SPECIAL_OFFERS[nextOfferIndex];

  const handlePrevOffer = () => {
    setActiveOfferIndex((prev) => (prev - 1 + SPECIAL_OFFERS.length) % SPECIAL_OFFERS.length);
  };

  const handleNextOffer = () => {
    setActiveOfferIndex((prev) => (prev + 1) % SPECIAL_OFFERS.length);
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-shuffle hero transparent showcase every 5 seconds (paused when user hovers or interacts)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, page]);

  // Auto-shuffle special offers carousel every 5.5 seconds (paused when user hovers)
  useEffect(() => {
    if (isOfferHovered) return;
    const timer = setInterval(() => {
      handleNextOffer();
    }, 5500);
    return () => clearInterval(timer);
  }, [isOfferHovered, activeOfferIndex]);

  const activeSlide = HERO_SLIDES[currentSlide];
  const prevSlide = HERO_SLIDES[prevSlideIndex];
  const nextSlide = HERO_SLIDES[nextSlideIndex];
  const activeMenuItem = MENU_ITEMS.find((m) => m.id === activeSlide.menuItemId) || MENU_ITEMS[0];
  const newMenuRow = MENU_ITEMS.filter((m) => m.category === "Burgers");

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. TOP GREEN CANOPY (Starts from Top y=0, Ends precisely below Order Now) */}
      {/* ========================================================================= */}
      <section className="w-full bg-gradient-to-b from-[#071E15] via-[#006241] to-[#062419] text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-2xl relative overflow-hidden pt-2 sm:pt-5 pb-7 sm:pb-12">
        {/* Ambient decorative glow orbs */}
        <div className="absolute right-0 top-0 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-hob-caramel/15 blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#04140D] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Flagship Pill & Est. 2024 */}
          <div className="flex items-center justify-between mb-2 sm:mb-5">
            <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-hob-mint border border-white/15 flex items-center gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-hob-caramel fill-hob-caramel" />
              <span>100% Pure Veg • Vijay Nagar Flagship • Indore</span>
            </span>

            <span className="text-[10px] font-bold uppercase tracking-widest text-hob-mint/80 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              Jain Certified
            </span>
          </div>

          {/* Hero Content Grid: Left Text CTA (Order-2 on mobile, 1 on desktop), Right 3D Showcase (Order-1 on mobile, 2 on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* ================================================================= */}
            {/* 3D FOOD SHOWCASE: PREVIOUS PRODUCT • MAIN PRODUCT • NEXT PRODUCT  */}
            {/* ================================================================= */}
            <div 
              className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 py-1 sm:py-2 relative -mx-4 sm:-mx-6 lg:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-full overflow-hidden lg:overflow-visible"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full flex items-center justify-center py-2 min-h-[300px] xs:min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]">
                
                {/* 0. TOWERING BACKGROUND TYPOGRAPHY (Behind ALL products: Previous, Active, and Next) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={`bgword-${page}`}
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? 100 : -100,
                          opacity: 0,
                          scale: 0.85,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 28 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                          },
                        },
                        exit: (direction: number) => ({
                          x: direction < 0 ? 100 : -100,
                          opacity: 0,
                          scale: 0.85,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 28 },
                            opacity: { duration: 0.22 },
                            scale: { duration: 0.22 },
                          },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <span
                        className={`font-ultra-tall select-none pointer-events-none text-center transform origin-center ${activeSlide.scaleClass} ${activeSlide.tracking} text-white/55 sm:text-white/65 drop-shadow-[0_6px_32px_rgba(0,0,0,0.6)] ${activeSlide.fontClass}`}
                      >
                        {activeSlide.bgWord}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 1. PREVIOUS PRODUCT PREVIEW (In front of giant text: z-20) */}
                <motion.button
                  onClick={() => paginate(-1)}
                  type="button"
                  aria-label={`Previous product: ${prevSlide.name}`}
                  className="absolute left-0 -translate-x-1/2 lg:translate-x-0 lg:left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 group focus:outline-none"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-44 lg:h-44 xl:w-52 xl:h-52 flex items-center justify-center pointer-events-none">
                    <img
                      src={prevSlide.image}
                      alt={prevSlide.alt}
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] select-none transition-transform"
                    />
                  </div>
                </motion.button>

                {/* 2. MAIN ACTIVE PRODUCT (Massive 1.5x - 2x bigger, in center with ambient glow: z-30) */}
                <div className="relative z-30 flex items-center justify-center w-full max-w-[280px] xs:max-w-[340px] sm:max-w-md lg:max-w-lg h-72 xs:h-80 sm:h-96 lg:h-[440px] xl:h-[480px]">
                  {/* Glowing backlight */}
                  <div className="absolute inset-0 bg-hob-caramel/25 rounded-full blur-3xl scale-90 pointer-events-none" />
                  <div className="absolute inset-4 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={page}
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? 180 : -180,
                          opacity: 0,
                          scale: 0.75,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 28 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                          },
                        },
                        exit: (direction: number) => ({
                          x: direction < 0 ? 180 : -180,
                          opacity: 0,
                          scale: 0.75,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 28 },
                            opacity: { duration: 0.22 },
                            scale: { duration: 0.22 },
                          },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        if (swipe < -6000 || offset.x < -45) {
                          paginate(1);
                        } else if (swipe > 6000 || offset.x > 45) {
                          paginate(-1);
                        }
                      }}
                      className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2 cursor-grab active:cursor-grabbing"
                    >
                      <motion.img
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                        src={activeSlide.image}
                        alt={activeSlide.alt}
                        className="w-full h-full object-contain filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.75)] select-none pointer-events-none hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 3. NEXT PRODUCT PREVIEW (In front of giant text: z-20) */}
                <motion.button
                  onClick={() => paginate(1)}
                  type="button"
                  aria-label={`Next product: ${nextSlide.name}`}
                  className="absolute right-0 translate-x-1/2 lg:translate-x-0 lg:right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 group focus:outline-none"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-44 lg:h-44 xl:w-52 xl:h-52 flex items-center justify-center pointer-events-none">
                    <img
                      src={nextSlide.image}
                      alt={nextSlide.alt}
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] select-none transition-transform"
                    />
                  </div>
                </motion.button>

                {/* 4. OUT-OF-CONTEXT PREVIOUS & NEXT CONTROLS (Positioned completely outside the food images at outer edges: z-40) */}
                <button
                  onClick={() => paginate(-1)}
                  type="button"
                  className="hidden sm:flex absolute -left-4 lg:-left-10 xl:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white border border-white/20 transition-all backdrop-blur-md shadow-xl hover:scale-110 active:scale-95 z-40 cursor-pointer items-center justify-center group"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  type="button"
                  className="hidden sm:flex absolute -right-4 lg:-right-10 xl:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white border border-white/20 transition-all backdrop-blur-md shadow-xl hover:scale-110 active:scale-95 z-40 cursor-pointer items-center justify-center group"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>
            </div>

            {/* ================================================================= */}
            {/* HEADLINE & GREEN ORDER NOW CTA BUTTON (No description, No dots)   */}
            {/* ================================================================= */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-5 order-2 lg:order-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block ring-1 ring-green-300 ring-offset-1 ring-offset-[#071E15]" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 font-display">
                  {activeSlide.tag}
                </span>
              </div>

              <h1 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight uppercase text-white">
                AMAZING TASTE.<br />
                <span className="text-hob-mint font-cursive lowercase italic text-3xl xs:text-4xl sm:text-5xl">made for</span> YOU.
              </h1>

              {/* Order Row: Green button like top bar + Clean bold price (no description text) */}
              <div className="pt-1 flex items-center gap-3 max-w-md">
                <button
                  onClick={() => openOrderModal(activeMenuItem)}
                  type="button"
                  className="flex-1 py-3.5 px-6 rounded-full bg-hob-caramel hover:bg-[#009054] text-white font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <div className="px-3 flex items-center shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-white font-display whitespace-nowrap">
                    ₹{activeSlide.price}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUTSIDE THE GREEN CANOPY (On light background: Search, New Menu & Deals) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8 space-y-6 sm:space-y-8">
        
        {/* Search & New Menu Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-hob-brown/10">
          
          {/* Search Row with Brand Logo Tile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-11 h-11 rounded-2xl bg-hob-surface border border-hob-brown/15 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="/images/brand-logo.png"
                alt="House Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-hob-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search "Aloo Tikki", "Cheese Coins", "Cold Coffee"...'
                className="w-full bg-hob-surface/80 pl-10 pr-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm text-hob-text placeholder:text-hob-muted focus:outline-none focus:ring-2 focus:ring-hob-caramel transition-all border border-hob-brown/10 shadow-xs"
              />
            </div>
          </div>

          {/* New Menu / Fresh Drops Heading */}
          <div className="flex items-center justify-between mt-5 mb-3">
            <h2 className="font-display font-black text-lg sm:text-xl text-hob-brown tracking-tight">
              New Menu
            </h2>
            <span className="text-xs font-bold text-hob-caramel tracking-wider uppercase">
              Fresh Drops
            </span>
          </div>

          {/* Horizontal Product Cards Carousel */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar w-full max-w-full">
            {newMenuRow
              .filter(
                (item) =>
                  !searchQuery ||
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <ProductCard key={item.id} item={item} layout="horizontal" />
              ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Special Offers & Combos Carousel (Lifestyle Magazine-style)        */}
        {/* ================================================================= */}
        <section className="pt-2 sm:pt-6 pb-2 w-full relative">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 px-1 sm:px-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-hob-caramel" />
              <h2 className="font-display font-black text-lg sm:text-xl text-hob-brown tracking-tight">
                Special For You
              </h2>
            </div>
            <span className="text-xs font-bold text-hob-caramel bg-hob-caramel/10 px-3 py-1 rounded-full border border-hob-caramel/20">
              Save up to ₹90 today
            </span>
          </div>

          {/* Carousel Track with Left & Right Card Peek */}
          <div
            className="relative w-full -mx-4 sm:-mx-6 lg:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-full overflow-hidden py-3 select-none"
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}
          >
            <div className="flex items-center justify-center relative min-h-[420px] xs:min-h-[460px] sm:min-h-[500px]">
              
              {/* Previous Offer Card (Peeking in on the left) */}
              <div
                onClick={handlePrevOffer}
                aria-label={`Previous offer: ${prevOffer.headlineLine1}`}
                className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+148px)] xs:right-[calc(50%+164px)] sm:right-[calc(50%+185px)] md:right-[calc(50%+198px)] z-10 w-[275px] xs:w-[305px] sm:w-[345px] md:w-[365px] h-[400px] xs:h-[440px] sm:h-[480px] rounded-[2.2rem] overflow-hidden opacity-55 hover:opacity-85 origin-right scale-[0.92] transition-all duration-300 cursor-pointer shadow-lg"
              >
                <img
                  src={prevOffer.image}
                  alt={prevOffer.headlineLine1}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${prevOffer.overlayGradient}`} />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Top Bar Preview */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-display font-black text-white text-sm tracking-tight drop-shadow-md">
                    HOUSE <span className="font-cursive italic text-hob-caramel text-base lowercase">of</span> BUNS
                  </span>
                  <div className="border border-white/60 rounded-xl px-2.5 py-1 bg-white/10 backdrop-blur-md text-right leading-none shadow-xs">
                    <span className="block text-[9px] font-semibold text-white/90 uppercase">Save</span>
                    <span className="block text-xs font-black text-amber-300 font-display mt-0.5">
                      {prevOffer.discountAmount}
                    </span>
                  </div>
                </div>

                {/* Bottom Text & Pill Button Preview */}
                <div className="absolute bottom-5 left-4 right-4 z-10">
                  <h3 className="font-display font-extrabold text-xl text-white leading-tight drop-shadow-md">
                    {prevOffer.headlineLine1}
                  </h3>
                  <div className={`mt-3 py-2.5 px-4 rounded-full border backdrop-blur-md text-xs font-bold flex items-center justify-between shadow-xs ${prevOffer.buttonBorder}`}>
                    <span className="truncate">{prevOffer.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Active Center Offer Card (Matching Reference Design) */}
              <motion.div
                key={activeOffer.id}
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -4000 || offset.x < -35) {
                    handleNextOffer();
                  } else if (swipe > 4000 || offset.x > 35) {
                    handlePrevOffer();
                  }
                }}
                className="relative z-20 w-[275px] xs:w-[305px] sm:w-[345px] md:w-[365px] h-[400px] xs:h-[440px] sm:h-[480px] rounded-[2.2rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-white/25"
              >
                <img
                  src={activeOffer.image}
                  alt={activeOffer.headlineLine1}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeOffer.overlayGradient}`} />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                {/* Top Section: Brand + Discount Badge in bordered frosted box */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1">
                    <span className="font-display font-black text-white text-base sm:text-lg tracking-tight drop-shadow-md">
                      HOUSE <span className="font-cursive italic text-hob-mint text-lg sm:text-xl lowercase inline-block">of</span> BUNS
                    </span>
                  </div>
                  <div className="border border-white/60 rounded-2xl px-3.5 py-1.5 bg-white/10 backdrop-blur-md text-right leading-none shadow-sm">
                    <span className="block text-[10px] sm:text-[11px] font-medium text-white/90 uppercase tracking-wide">
                      Save
                    </span>
                    <span className="block text-base sm:text-lg font-black text-yellow-300 font-display tracking-tight leading-none mt-1">
                      {activeOffer.discountAmount}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Headline, Subtitle, and Pill CTA Button */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="font-display font-extrabold text-2xl xs:text-[26px] sm:text-3xl text-white leading-tight drop-shadow-md">
                    {activeOffer.headlineLine1}<br />
                    <span className="text-white/95">{activeOffer.headlineLine2}</span>
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-1 font-medium">
                    {activeOffer.subtext}
                  </p>

                  {/* Pill Button matching reference: border, background, arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openOrderModal(activeOffer.comboItem);
                    }}
                    type="button"
                    className={`w-full mt-3.5 py-3 px-5 rounded-full border backdrop-blur-md font-display font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-between cursor-pointer group ${activeOffer.buttonBorder}`}
                  >
                    <span>{activeOffer.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Next Offer Card (Peeking in on the right) */}
              <div
                onClick={handleNextOffer}
                aria-label={`Next offer: ${nextOffer.headlineLine1}`}
                className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+148px)] xs:left-[calc(50%+164px)] sm:left-[calc(50%+185px)] md:left-[calc(50%+198px)] z-10 w-[275px] xs:w-[305px] sm:w-[345px] md:w-[365px] h-[400px] xs:h-[440px] sm:h-[480px] rounded-[2.2rem] overflow-hidden opacity-55 hover:opacity-85 origin-left scale-[0.92] transition-all duration-300 cursor-pointer shadow-lg"
              >
                <img
                  src={nextOffer.image}
                  alt={nextOffer.headlineLine1}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${nextOffer.overlayGradient}`} />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Top Bar Preview */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-display font-black text-white text-sm tracking-tight drop-shadow-md">
                    HOUSE <span className="font-cursive italic text-hob-caramel text-base lowercase">of</span> BUNS
                  </span>
                  <div className="border border-white/60 rounded-xl px-2.5 py-1 bg-white/10 backdrop-blur-md text-right leading-none shadow-xs">
                    <span className="block text-[9px] font-semibold text-white/90 uppercase">Save</span>
                    <span className="block text-xs font-black text-amber-300 font-display mt-0.5">
                      {nextOffer.discountAmount}
                    </span>
                  </div>
                </div>

                {/* Bottom Text & Pill Button Preview */}
                <div className="absolute bottom-5 left-4 right-4 z-10">
                  <h3 className="font-display font-extrabold text-xl text-white leading-tight drop-shadow-md">
                    {nextOffer.headlineLine1}
                  </h3>
                  <div className={`mt-3 py-2.5 px-4 rounded-full border backdrop-blur-md text-xs font-bold flex items-center justify-between shadow-xs ${nextOffer.buttonBorder}`}>
                    <span className="truncate">{nextOffer.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              </div>

            </div>

            {/* Segmented Pill Indicator Bar (matching reference image) */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {SPECIAL_OFFERS.map((offer, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveOfferIndex(idx)}
                  aria-label={`Go to special offer ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeOfferIndex === idx
                      ? `w-8 ${offer.activeIndicator} shadow-xs`
                      : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
