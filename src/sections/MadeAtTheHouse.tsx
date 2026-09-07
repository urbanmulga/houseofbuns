import { Sparkles, Flame, Clock, Award } from "lucide-react";

export function MadeAtTheHouse() {
  const pillars = [
    {
      icon: Clock,
      title: "5:00 AM Daily Bake",
      desc: "Every single brioche bun is baked from scratch every dawn in our Vijay Nagar kitchen using French cultured butter and Japanese Yudane dough technique.",
    },
    {
      icon: Flame,
      title: "Lacy Smashed Skirt",
      desc: "Pressed flat with 10-pound steel presses against screaming hot chrome griddles to forge the iconic caramelized Maillard crunch.",
    },
    {
      icon: Award,
      title: "100% Pure Veg & Jain",
      desc: "No chemical shelf-extenders, no frozen patties. 100% Pure Veg farm-fresh ingredients, eggless brioche, and certified Jain recipes.",
    },
    {
      icon: Sparkles,
      title: "Signature House Relish",
      desc: "Slow-simmered onion jam, dill brine, and smoked paprika emulsions formulated exclusively by our founding chef.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-hob-surface/60 border-y border-hob-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-hob-caramel font-display block mb-2">
            The Craft Behind The Bun
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-hob-brown tracking-tight">
            NOT JUST ANOTHER BURGER JOINT.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-hob-muted leading-relaxed">
            We started House of Buns in Indore with one obsession: treat the bun not as a delivery vehicle, but as the hero of the burger experience.
          </p>
        </div>

        {/* Feature Grid with Food Photography Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden shadow-xl border border-hob-brown/10 bg-hob-bg aspect-[4/3] group">
            <img
              src="/images/brioche-buns.jpg"
              alt="Artisanal Golden Brioche Buns baked in House of Buns"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hob-brown-dark/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs font-bold text-hob-caramel uppercase tracking-widest">
                Our Micro-Bakery
              </span>
              <h3 className="font-display font-extrabold text-2xl mt-1">
                Golden Brioche Cloud Pillows
              </h3>
              <p className="text-xs text-hob-cream/80 mt-1 max-w-md">
                Glazed with cultured butter glaze and toasted white sesame seeds for a delicate, 100% eggless pillowy bite.
              </p>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-hob-bg border border-hob-brown/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-2xl bg-hob-brown text-hob-cream flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5 text-hob-caramel" />
                  </div>
                  <h4 className="font-display font-bold text-base text-hob-brown mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-hob-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
