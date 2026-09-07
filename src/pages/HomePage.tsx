import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import { HeroSection } from "../sections/HeroSection";
import { AnimatedImageDrawer } from "../sections/AnimatedImageDrawer";
import { MadeAtTheHouse } from "../sections/MadeAtTheHouse";
import { OutletSection } from "../sections/OutletSection";
import { ProductCard } from "../components/ProductCard";
import { MENU_ITEMS, CATEGORIES, type CategoryType } from "../data/menuData";

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");

  const filteredItems = selectedCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const reviews = [
    {
      name: "Aman Sharma",
      area: "Vijay Nagar, Indore",
      comment: "Hands down the best smashed burger in Madhya Pradesh. That brioche bun literally melts in your mouth and the crispy patty skirt is insane!",
      rating: 5,
    },
    {
      name: "Pooja Verma",
      area: "Palasia, Indore",
      comment: "The Truffle Mushroom veg burger is gourmet standard! Finally a burger spot in Indore that takes vegetarian flavor seriously.",
      rating: 5,
    },
    {
      name: "Dr. Rohit Jain",
      area: "Saket, Indore",
      comment: "Peri-peri loaded fries + Salted caramel thick shake is my Friday night ritual. Unbeatable consistency and packaging!",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-12">
      {/* 1. Hero Section (Reference Composition) */}
      <HeroSection />

      {/* 2. Interactive Animated Image Drawer Showcase */}
      <AnimatedImageDrawer />

      {/* 3. Artisanal Craft & Brioche Baking Story */}
      <MadeAtTheHouse />

      {/* 3. Interactive Menu Grid Preview */}
      <section className="py-10 sm:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block ring-1 ring-green-600 ring-offset-1" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#006241] font-display">
                100% Pure Veg • Eggless • Jain Certified
              </span>
            </div>
            <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-hob-brown tracking-tight">
              THE HOUSE MENU
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-hob-brown text-hob-cream shadow-sm"
                    : "bg-hob-surface hover:bg-hob-surface/80 text-hob-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 2 columns on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3.5 sm:gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 py-4 px-8 rounded-full bg-hob-brown hover:bg-hob-brown-dark text-hob-cream font-display font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>View Full Menu & Add-ons</span>
            <ArrowRight className="w-4 h-4 text-hob-caramel" />
          </Link>
        </div>
      </section>

      {/* 4. Vijay Nagar Indore Flagship Outlet */}
      <OutletSection />

      {/* 5. Indore Customer Praise / Testimonials */}
      <section className="py-16 bg-hob-surface/40 border-t border-hob-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-hob-caramel font-display block mb-2">
              Indore Foodies Love Us
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-hob-brown tracking-tight">
              FROM THE COMMUNITY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-hob-bg rounded-3xl p-6 border border-hob-brown/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-hob-caramel/20 mb-2" />
                  <p className="text-xs sm:text-sm text-hob-text/90 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-hob-brown/10">
                  <p className="font-display font-bold text-sm text-hob-brown">
                    {rev.name}
                  </p>
                  <p className="text-[11px] text-hob-muted">{rev.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
