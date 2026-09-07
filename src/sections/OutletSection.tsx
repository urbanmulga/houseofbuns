import { MapPin, Navigation, Phone, Clock, Sparkles, MessageSquare } from "lucide-react";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function OutletSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-hob-brown text-hob-cream rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-hob-caramel/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hob-caramel/20 border border-hob-caramel/30 text-hob-caramel text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Flagship Destination
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white uppercase">
              ONE HOUSE.<br />
              ONE CITY.<br />
              <span className="text-hob-caramel">INDORE.</span>
            </h2>

            <p className="text-sm sm:text-base text-hob-cream/80 max-w-xl leading-relaxed">
              We don’t do corporate chains. We pour our hearts into a single flagship outlet in Vijay Nagar, ensuring every smashed burger and every shake meets our exacting standard.
            </p>

            {/* Outlet Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-hob-caramel mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">Vijay Nagar Address</h4>
                  <p className="text-xs text-hob-cream/70 mt-0.5 leading-relaxed">
                    {RESTAURANT_CONFIG.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-hob-caramel mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">Open Daily</h4>
                  <p className="text-xs text-hob-cream/70 mt-0.5">
                    {RESTAURANT_CONFIG.location.hours}
                  </p>
                  <p className="text-[11px] text-hob-caramel font-semibold">
                    Dine-in • Takeaway • Late Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={RESTAURANT_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-full bg-hob-caramel hover:bg-hob-caramel/90 text-white font-display font-extrabold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-lg inline-flex items-center gap-2"
                aria-label="Directions to Vijay Nagar Flagship"
              >
                <Navigation className="w-4 h-4" />
                Get Directions to Outlet
              </a>

              <a
                href={`tel:${RESTAURANT_CONFIG.location.phone}`}
                className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white font-display font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 border border-white/15"
              >
                <Phone className="w-4 h-4 text-hob-caramel" />
                Call: {RESTAURANT_CONFIG.location.phone}
              </a>

              <a
                href={RESTAURANT_CONFIG.location.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-bold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp: {RESTAURANT_CONFIG.location.phone}
              </a>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] lg:aspect-square">
            <img
              src="/images/outlet-flagship.jpg"
              alt="House of Buns Vijay Nagar Indore Flagship Outlet"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-bold text-hob-caramel uppercase tracking-widest">
                PU-4 Commercial Zone
              </span>
              <p className="font-display font-bold text-base text-white">
                Near Vijay Nagar Square, Indore
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
