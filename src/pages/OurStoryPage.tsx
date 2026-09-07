import { Clock, Flame, MapPin } from "lucide-react";

export function OurStoryPage() {
  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Hero */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-white p-3 shadow-xl ring-4 ring-hob-brown/10 mb-2 flex items-center justify-center">
          <img
            src="/images/brand-logo.png"
            alt="House of Buns Seal"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-hob-caramel font-display block">
          Our Philosophy • Good Buns. Great Times.
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-hob-brown tracking-tight leading-tight">
          THE INDORE BRIOCHE REVOLUTION.
        </h1>
        <p className="text-sm sm:text-base text-hob-muted leading-relaxed">
          Indore is celebrated as India’s culinary epicenter. But when it came to burgers, the city was flooded with mass-produced fast food chains and stale industrial buns. We set out to change that forever.
        </p>
      </div>

      {/* Chapter 1: The Bun */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-hob-brown/10 aspect-[4/3]">
          <img
            src="/images/brioche-buns.jpg"
            alt="Handmade Brioche Buns"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Clock className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter I • The 5:00 AM Dawn Bake
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-hob-brown">
            The Bun is Not an Afterthought. It is the Foundation.
          </h2>
          <p className="text-sm text-hob-muted leading-relaxed">
            Most commercial burger places buy dry sandwich buns packed with chemical emulsifiers that last weeks on a shelf. At House of Buns, our micro-bakery ovens in Vijay Nagar fire up at 5:00 AM every single morning.
          </p>
          <p className="text-sm text-hob-muted leading-relaxed">
            We employ the Japanese Yudane method — pre-gelatinizing flour with simmering water before incorporating slow-churned cultured table butter and pure honey for 100% eggless artisanal brioche. The result? A cloud-soft golden brioche with a tender crumb that absorbs rich sauces without collapsing.
          </p>
        </div>
      </div>

      {/* Chapter 2: The Smash */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4 lg:order-1 order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hob-caramel/20 text-hob-brown text-xs font-bold font-display">
            <Flame className="w-3.5 h-3.5 text-hob-caramel" />
            Chapter II • The Physics of The Pure Veg Smash
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-hob-brown">
            High Heat. Heavy Steel. Lacey Edges.
          </h2>
          <p className="text-sm text-hob-muted leading-relaxed">
            A real smash burger is not a pre-formed patty gently flipped over a grill. It starts as a chilled sphere of seasoned spiced potato, melting cheese, and garden vegetables placed onto a 400°F polished chrome griddle.
          </p>
          <p className="text-sm text-hob-muted leading-relaxed">
            With custom 10-pound cast-iron presses, we smash the patty until its outer circumference splays paper-thin against the griddle. That blistering contact catalyzes caramelization into a crunchy, umami-dense skirt that seals all the savory flavors within.
          </p>
        </div>

        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-hob-brown/10 aspect-[4/3] lg:order-2 order-1">
          <img
            src="/images/hero-burger.jpg"
            alt="Smashed Patty Perfection"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Chapter 3: Single Outlet Pride */}
      <div className="bg-hob-surface rounded-3xl p-8 sm:p-12 border border-hob-brown/10 text-center max-w-4xl mx-auto space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-md mx-auto ring-2 ring-hob-brown/15 flex items-center justify-center">
          <img
            src="/images/brand-logo.png"
            alt="House of Buns Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-hob-brown">
          Why We Refuse to Franchise
        </h3>
        <p className="text-sm text-hob-muted leading-relaxed max-w-2xl mx-auto">
          We believe real gastronomy loses its soul when scaled blindly. We don't want 50 mediocre locations across India; we want ONE phenomenal, uncompromising flagship in Indore where every customer tastes the exact standard our chef intended.
        </p>
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-hob-brown">
          <MapPin className="w-4 h-4 text-hob-caramel" />
          <span>Flagship: PU-4 Commercial, Vijay Nagar, Indore</span>
        </div>
      </div>

    </div>
  );
}
