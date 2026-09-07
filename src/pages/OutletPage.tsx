import { Navigation, Phone, Clock, MessageSquare, Car, Utensils, CheckCircle2 } from "lucide-react";
import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function OutletPage() {
  const amenities = [
    { icon: Utensils, title: "Dine-In Seating", desc: "45 air-conditioned indoor seats with open flat-top griddle kitchen views." },
    { icon: Car, title: "Valet & Dedicated Parking", desc: "Spacious front parking on PU-4 Commercial lane." },
    { icon: Clock, title: "Late Night Window", desc: "Takeaway & delivery active until 11:30 PM seven days a week." },
    { icon: CheckCircle2, title: "Hygiene Certified", desc: "Open kitchen with daily sanitized flat tops and allergen-segregated prep stations." },
  ];

  const faqs = [
    {
      q: "Where exactly is the outlet located?",
      a: `We are at ${RESTAURANT_CONFIG.location.address}, ${RESTAURANT_CONFIG.location.landmark}, Indore.`,
    },
    {
      q: "Do you offer vegetarian options?",
      a: "Yes! We have a dedicated Truffle & Forest Mushroom Veg Burger, Crispy Cottage Cheese Smash, Loaded Fries, and artisanal bakery items prepared with dedicated utensils.",
    },
    {
      q: "Can I order online for delivery?",
      a: "Absolutely. We are available on Zomato and Swiggy across Indore with specialized thermal foil insulated packaging that keeps your buns warm and fries crispy.",
    },
    {
      q: "Can I reserve a table for group dining?",
      a: `While walk-ins are always welcomed, you can call us directly at ${RESTAURANT_CONFIG.location.phone} or message on WhatsApp for tables of 6 or more.`,
    },
  ];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-hob-caramel font-display block">
          Visit Us In Person
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-hob-brown tracking-tight">
          VIJAY NAGAR FLAGSHIP
        </h1>
        <p className="text-sm text-hob-muted leading-relaxed">
          The birthplace of House of Buns. Experience the sights, sizzle, and aroma of flat-top smashed burgers in Indore.
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="bg-hob-surface rounded-3xl p-6 sm:p-10 border border-hob-brown/10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Image */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-hob-bg">
            <img
              src="/images/outlet-flagship.jpg"
              alt="House of Buns Vijay Nagar Indore Storefront"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md ring-2 ring-hob-brown/10 shrink-0 flex items-center justify-center">
                  <img
                    src="/images/brand-logo.png"
                    alt="House of Buns Seal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-hob-caramel uppercase tracking-widest font-display block">
                    GOOD BUNS • GREAT TIMES.
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-hob-brown leading-tight">
                    House of Buns Indore
                  </h2>
                </div>
              </div>
              <p className="text-sm text-hob-muted mt-2 leading-relaxed">
                {RESTAURANT_CONFIG.location.address}
              </p>
              <p className="text-xs font-semibold text-hob-caramel mt-1">
                Landmark: {RESTAURANT_CONFIG.location.landmark} (Pincode: {RESTAURANT_CONFIG.location.pincode})
              </p>
            </div>

            <div className="space-y-2 text-sm text-hob-brown">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-hob-caramel" />
                <span className="font-semibold">{RESTAURANT_CONFIG.location.hours}</span>
                <span className="text-xs text-hob-muted">({RESTAURANT_CONFIG.location.days})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-hob-caramel" />
                <a href={`tel:${RESTAURANT_CONFIG.location.phone}`} className="font-semibold hover:underline">
                  {RESTAURANT_CONFIG.location.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={RESTAURANT_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-full bg-hob-brown-dark hover:bg-hob-brown text-hob-cream font-display font-bold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4 text-hob-caramel" />
                Open In Google Maps
              </a>

              <a
                href={RESTAURANT_CONFIG.location.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-bold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp: {RESTAURANT_CONFIG.location.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet Amenities Grid */}
      <div>
        <h3 className="font-display font-bold text-xl text-hob-brown mb-6 text-center">
          Outlet Amenities & Experience
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-hob-surface border border-hob-brown/10 shadow-sm"
              >
                <div className="w-10 h-10 rounded-2xl bg-hob-brown text-hob-cream flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-hob-caramel" />
                </div>
                <h4 className="font-display font-bold text-base text-hob-brown mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-hob-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="font-display font-bold text-2xl text-hob-brown text-center mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-hob-surface border border-hob-brown/10 shadow-sm"
            >
              <h4 className="font-display font-bold text-sm sm:text-base text-hob-brown mb-2">
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-hob-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
