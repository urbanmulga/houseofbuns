import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Users,
  Utensils,
  Clock,
  Compass,
  ArrowRight,
  Quote,
  Flame,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function OurStoryPage() {
  const { openOrderModal } = useCartOrder();

  const philosophyPillars = [
    {
      title: "Keep it fresh",
      tagline: "Never stale, never compromised",
      desc: "From our freshly baked artisanal buns to crisp daily produce, every element begins with true freshness.",
      icon: Clock,
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-700",
    },
    {
      title: "Keep it delicious",
      tagline: "Flavour in every single layer",
      desc: "Finding the sweet spot between fluffy buns, savoury fillings, and signature sauces that dance on your palate.",
      icon: Flame,
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-700",
    },
    {
      title: "Keep it honest",
      tagline: "Pure heart & clean preparation",
      desc: "Food prepared with pride, 100% vegetarian integrity, and genuine respect for every guest who walks through our doors.",
      icon: CheckCircle2,
      color: "from-green-500/10 to-emerald-500/10",
      accent: "text-green-700",
    },
    {
      title: "Something to return for",
      tagline: "A reason to crave tomorrow",
      desc: "Every visit, every table, and every first bite is designed to leave you with that warm thought: 'I want another one.'",
      icon: Heart,
      color: "from-rose-500/10 to-pink-500/10",
      accent: "text-rose-700",
    },
  ];

  const fourHouses = [
    {
      title: "A House of Flavours",
      desc: "Where every bite is crafted with personality, depth, and artisanal balance.",
      icon: Utensils,
    },
    {
      title: "A House of Cravings",
      desc: "Where evening conversations and midnight cravings find their true comfort.",
      icon: Flame,
    },
    {
      title: "A House of Conversations",
      desc: "Where friends gather, families laugh, and memories are quietly forged.",
      icon: Users,
    },
    {
      title: "A House of Memories",
      desc: "Where simple moments around warm food become unforgettable stories.",
      icon: Heart,
    },
  ];

  const journeySteps = [
    { label: "Another Customer", desc: "Welcomed like family", icon: Users },
    { label: "Another Table", desc: "Filled with warmth", icon: Coffee },
    { label: "Another First Bite", desc: "Eyes lighting up with joy", icon: Utensils },
    { label: "Another Smile", desc: "A feeling of true belonging", icon: Heart },
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO                                                         */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center space-y-5"
      >
        {/* Brand Seal */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-white p-3 shadow-xl ring-4 ring-hob-brown/10 mb-3 flex items-center justify-center group">
          <img
            src="/images/brand-logo.png"
            alt="House of Buns Seal"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-hob-caramel/15 text-hob-brown text-xs font-black uppercase tracking-widest font-display">
          <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
          The Story of House of Buns
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-hob-brown tracking-tight leading-tight">
          WHERE A SIMPLE BUN BECAME A REASON TO{" "}
          <span className="text-hob-caramel underline decoration-hob-mint underline-offset-8">
            COME TOGETHER.
          </span>
        </h1>

        <p className="font-cursive text-2xl sm:text-3xl text-hob-caramel font-semibold">
          Where a simple bun became a reason to come together.
        </p>

        <p className="text-base sm:text-lg text-hob-muted leading-relaxed max-w-2xl mx-auto">
          Every great food story begins with something simple. For{" "}
          <strong className="text-hob-brown font-bold">House of Buns</strong>, that
          something was a belief — that a humble bun could be more than just food.
          It could be warm, indulgent, memorable, and made with enough heart to
          bring people together.
        </p>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. FOUNDER SPOTLIGHT: MAHAVIR JAIN                                        */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-hob-brown/15 shadow-xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
          
          {/* Left: Founder Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-hob-caramel/25 bg-hob-surface">
              <img
                src="/images/mahavir-jain.png"
                alt="Mahavir Jain - Founder of House of Buns"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hob-brown-dark/85 via-hob-brown-dark/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  Founder & Visionary
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  Mahavir Jain
                </h3>
                <p className="text-xs text-hob-cream/90 mt-0.5">
                  Founder, House of Buns
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-hob-bg text-hob-brown text-xs font-bold border border-hob-brown/10">
                <Heart className="w-3.5 h-3.5 text-hob-caramel" />
                Crafted With Heart • Served With Passion
              </span>
            </div>
          </div>

          {/* Right: The Origin Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
              <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
              The Genesis • Jabalpur
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-hob-brown leading-tight">
              In the heart of Jabalpur, Mahaveer Jain set out to turn that belief into reality.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-hob-muted leading-relaxed">
              <p>
                What began as an idea slowly became a passion: to create a place
                where people could enjoy delicious, freshly prepared food without
                losing the warmth and familiarity of home.
              </p>
              <p className="font-medium text-hob-brown">
                And so, <span className="font-bold text-hob-caramel">House of Buns</span> was born.
              </p>
            </div>

            {/* Founder Quote Card */}
            <div className="relative rounded-2xl bg-hob-cream/80 border-l-4 border-hob-caramel p-5 sm:p-6 shadow-sm">
              <Quote className="w-8 h-8 text-hob-caramel/20 absolute top-4 right-4" />
              <p className="text-hob-brown font-semibold italic text-base sm:text-lg leading-relaxed">
                “Good food has the power to bring people together. House of Buns is
                more than a place to eat. It is a place to belong.”
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-hob-brown/10">
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-hob-brown">
                    Mahavir Jain
                  </span>
                  <span className="text-[11px] text-hob-muted font-medium">
                    Founder, House of Buns
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. CHAPTER I: A HOUSE BUILT AROUND TASTE                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Visual: Artisanal Buns */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-hob-brown/10 aspect-[4/3] relative group">
          <img
            src="/images/brioche-buns.jpg"
            alt="Handmade Brioche Buns"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hob-brown-dark/70 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-bold text-hob-mint uppercase tracking-widest">
              Crafted Fresh • Baked With Heart
            </span>
          </div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Clock className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter I • The Craft
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-hob-brown leading-tight">
            A House Built Around Taste
          </h2>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            Mahaveer Jain envisioned more than another food outlet.
          </p>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            He wanted to create a <strong className="text-hob-brown font-bold">house of flavours</strong> — a
            place where every bite felt carefully crafted, every bun carried its own
            character, and every visit gave people a reason to return.
          </p>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            The journey was never just about putting ingredients between two halves
            of a bun. It was about finding the right balance.
          </p>

          {/* Three sensory touchpoints */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-hob-brown/10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-hob-caramel shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-hob-brown">
                The softness of freshly baked buns.
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-hob-brown/10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-hob-caramel shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-hob-brown">
                The richness of perfectly prepared fillings.
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-hob-brown/10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-hob-caramel shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-hob-brown">
                The crunch, the sauces, the spices.
              </span>
            </div>
          </div>

          {/* The pause quote */}
          <div className="p-4 sm:p-5 rounded-2xl bg-hob-surface border-2 border-dashed border-hob-caramel/40">
            <p className="text-xs sm:text-sm text-hob-muted">
              And that final bite that makes you pause and think,
            </p>
            <p className="font-display font-black text-xl sm:text-2xl text-hob-brown mt-1">
              “I want another one.”
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. CHAPTER II: FROM JABALPUR, WITH LOVE                                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Narrative (Left on desktop) */}
        <div className="lg:col-span-6 space-y-5 lg:order-1 order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Heart className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter II • Community & Heart
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-hob-brown leading-tight">
            From Jabalpur, With Love
          </h2>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            Jabalpur is a city with its own rhythm — warm, welcoming, and full of
            people who know good food.
          </p>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            House of Buns grew with that spirit.
          </p>

          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            It became a place for quick lunches, evening cravings, conversations
            with friends, family outings, celebrations, and those spontaneous
            moments when all you really need is something delicious.
          </p>

          {/* Community highlight card */}
          <div className="rounded-2xl bg-gradient-to-br from-hob-brown via-hob-brown to-hob-brown-dark p-6 text-white shadow-lg space-y-3">
            <p className="text-sm sm:text-base text-hob-cream/95 leading-relaxed font-medium">
              “For Mahaveer Jain, every customer was never just another order. They
              were part of the story.”
            </p>
            <div className="pt-2 border-t border-white/20">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-300 block">
                Because a food brand isn't built only in a kitchen.
              </span>
              <span className="font-display font-black text-lg sm:text-xl text-white block mt-0.5">
                It's built around a community.
              </span>
            </div>
          </div>
        </div>

        {/* Visual: Spread & Good Times */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-hob-brown/10 aspect-[4/3] relative group lg:order-2 order-1">
          <img
            src="/images/combo-spread.jpg"
            alt="Delicious House of Buns Spread"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hob-brown-dark/70 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-bold text-hob-mint uppercase tracking-widest">
              Brought Together By Good Food
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. CHAPTER III: MORE THAN A BUN (PHILOSOPHY & 4 HOUSES)                   */}
      {/* ========================================================================= */}
      <div className="space-y-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter III • Founding Philosophy
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-hob-brown">
            More Than a Bun
          </h2>
          <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
            Over time, House of Buns became a reflection of its founding philosophy:
          </p>
        </div>

        {/* 4 Founding Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`rounded-3xl p-6 sm:p-7 bg-gradient-to-b ${p.color} bg-white border border-hob-brown/10 shadow-md flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 ring-1 ring-hob-brown/10 ${p.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-hob-brown capitalize">
                    {p.title}
                  </h3>
                  <span className={`text-[11px] font-bold uppercase tracking-wider block mt-1 ${p.accent}`}>
                    {p.tagline}
                  </span>
                  <p className="text-xs sm:text-sm text-hob-muted mt-3 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Intention statement */}
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-sm sm:text-base text-hob-muted italic leading-relaxed">
            “Every recipe, every preparation, and every plate carries the same
            intention — to make everyday food feel a little more special.”
          </p>
        </div>

        {/* The 4 Houses Banner */}
        <div className="bg-hob-surface rounded-3xl p-6 sm:p-10 border border-hob-brown/10 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-hob-caramel font-display block">
              The Identity
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-hob-brown">
              The name says House of Buns. But the idea is much bigger.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fourHouses.map((h, i) => {
              const HIcon = h.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-hob-brown/10 shadow-xs hover:border-hob-caramel/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-hob-bg flex items-center justify-center text-hob-caramel mb-3">
                    <HIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-hob-brown">
                    {h.title}
                  </h4>
                  <p className="text-xs text-hob-muted mt-1 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 6. CHAPTER IV: THE JOURNEY CONTINUES                                     */}
      {/* ========================================================================= */}
      <div className="space-y-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Compass className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter IV • The Horizon
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-hob-brown">
            The Journey Continues
          </h2>
          <p className="text-sm sm:text-base text-hob-muted leading-relaxed max-w-2xl mx-auto">
            From a vision in Jabalpur to a growing food identity, the journey of
            House of Buns is still being written. And perhaps that's the most
            exciting part.
          </p>
        </div>

        {/* Steps sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {journeySteps.map((step, sIdx) => {
            const SIcon = step.icon;
            return (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-white border border-hob-brown/10 shadow-sm flex flex-col items-center text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-hob-caramel/10 flex items-center justify-center text-hob-caramel mb-3">
                  <SIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-hob-caramel mb-1">
                  Tomorrow Brings
                </span>
                <h4 className="font-display font-black text-base text-hob-brown">
                  {step.label}
                </h4>
                <p className="text-xs text-hob-muted mt-1">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Thought */}
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-hob-caramel">
            And another chapter in a story that started with one simple thought:
          </p>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-hob-brown">
            “Good food has the power to bring people together.”
          </h3>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 7. GRAND FINALE: FOUNDER'S SIGNATURE & BELONGING SEAL                    */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-hob-brown-dark via-hob-brown to-[#0B402B] p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative background blur glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-hob-caramel/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          <div className="w-20 h-20 rounded-2xl bg-white p-2.5 shadow-xl mx-auto ring-4 ring-white/20 flex items-center justify-center">
            <img
              src="/images/brand-logo.png"
              alt="House of Buns Seal"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300 font-display block">
              Founded by Mahavir Jain
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              HOUSE OF BUNS
            </h2>
            <p className="font-cursive text-2xl sm:text-3xl text-emerald-200">
              Is more than a place to eat. It is a place to belong.
            </p>
          </div>

          <div className="inline-block py-2.5 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <p className="font-display font-extrabold text-sm sm:text-base text-white tracking-wide">
              Born in Jabalpur. Made with passion. Served with love.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-hob-caramel hover:bg-emerald-600 text-white font-display font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openOrderModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-hob-brown hover:bg-hob-cream font-display font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              Taste The Story
            </button>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
