import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ExternalLink, Heart, MessageSquare } from "lucide-react";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function Footer() {
  return (
    <footer className="bg-hob-brown-dark text-hob-cream/90 pt-16 pb-24 md:pb-16 border-t border-hob-caramel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-lg shrink-0 flex items-center justify-center">
                <img
                  src="/images/brand-logo.png"
                  alt="House of Buns Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white tracking-tight block leading-tight">
                  HOUSE <span className="font-cursive italic font-bold text-hob-caramel text-3xl lowercase px-0.5 inline-block -translate-y-0.5">of</span> BUNS
                </span>
                <span className="text-[11px] font-extrabold tracking-widest text-hob-caramel uppercase block mt-0.5">
                  GOOD BUNS • GREAT TIMES.
                </span>
              </div>
            </div>
            <p className="text-sm text-hob-cream/70 leading-relaxed font-normal">
              Indore’s premier artisanal smashed burger craft. Baked fresh at 5 AM daily in our Vijay Nagar kitchen. Never frozen, relentlessly perfected.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hob-brown/80 border border-hob-caramel/30 text-xs font-semibold text-hob-caramel">
              <MapPin className="w-3.5 h-3.5" />
              One House. One City. Vijay Nagar, Indore.
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-display tracking-wide uppercase text-xs">
              Explore The House
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-hob-caramel transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-hob-caramel transition-colors">Artisanal Menu</Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-hob-caramel transition-colors">Our 5 AM Baking Story</Link>
              </li>
              <li>
                <Link to="/outlet" className="hover:text-hob-caramel transition-colors">Vijay Nagar Flagship Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Delivery */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-display tracking-wide uppercase text-xs">
              Direct Kitchen & Ordering
            </h3>
            <div className="space-y-2 text-sm text-hob-cream/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-hob-caramel mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">{RESTAURANT_CONFIG.location.hours}</p>
                  <p className="text-xs text-hob-cream/60">{RESTAURANT_CONFIG.location.days}</p>
                </div>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={RESTAURANT_CONFIG.location.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Order: {RESTAURANT_CONFIG.location.phone}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={RESTAURANT_CONFIG.deliveryPartners.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-xl bg-hob-brown/60 hover:bg-hob-brown border border-hob-cream/10 text-xs font-semibold text-white transition-colors"
                >
                  <span>Order on Zomato</span>
                  <ExternalLink className="w-3.5 h-3.5 text-hob-caramel" />
                </a>
                <a
                  href={RESTAURANT_CONFIG.deliveryPartners.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-xl bg-hob-brown/60 hover:bg-hob-brown border border-hob-cream/10 text-xs font-semibold text-white transition-colors"
                >
                  <span>Order on Swiggy</span>
                  <ExternalLink className="w-3.5 h-3.5 text-hob-caramel" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Hotline */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-display tracking-wide uppercase text-xs">
              Visit The House
            </h3>
            <p className="text-xs text-hob-cream/75 leading-relaxed">
              {RESTAURANT_CONFIG.location.address}, {RESTAURANT_CONFIG.location.landmark}, {RESTAURANT_CONFIG.location.pincode}
            </p>
            <div className="space-y-2 text-xs text-hob-cream/80">
              <a
                href={`tel:${RESTAURANT_CONFIG.location.phone}`}
                className="flex items-center gap-2 font-bold text-white hover:text-hob-caramel transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-hob-caramel" />
                <span>Call: {RESTAURANT_CONFIG.location.phone}</span>
              </a>
              <a
                href={RESTAURANT_CONFIG.location.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {RESTAURANT_CONFIG.location.phone}</span>
              </a>
              <a
                href={`mailto:${RESTAURANT_CONFIG.location.email}`}
                className="flex items-center gap-2 hover:text-hob-caramel transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-hob-caramel" />
                {RESTAURANT_CONFIG.location.email}
              </a>
            </div>
            <a
              href={RESTAURANT_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-hob-caramel hover:underline pt-1"
            >
              Get Directions via Google Maps &rarr;
            </a>
          </div>
        </div>

        {/* Bottom copyright & pride statement */}
        <div className="pt-8 border-t border-hob-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hob-cream/60">
          <p>© {new Date().getFullYear()} House of Buns Indore. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Indore burger connoisseurs.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
