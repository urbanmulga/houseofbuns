import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  ChevronLeft,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

import { RESTAURANT_CONFIG } from "../data/restaurantConfig";

export function ContactUsModal() {
  const { isContactModalOpen, closeContactModal, showToast } = useCartOrder();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("General Query");
  const [message, setMessage] = useState("");

  // Native mobile back button handling
  useEffect(() => {
    if (!isContactModalOpen) return;

    window.history.pushState({ modal: "contact-us" }, "");
    const handlePopState = () => {
      closeContactModal();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isContactModalOpen, closeContactModal]);

  const handleBack = () => {
    closeContactModal();
    if (window.history.state?.modal === "contact-us") {
      window.history.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please provide your name and phone number");
      return;
    }
    showToast("Message sent! Our Vijay Nagar team will reach out shortly.");
    setName("");
    setPhone("");
    setMessage("");
    handleBack();
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Desktop Backdrop (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBack}
            className="hidden sm:block fixed inset-0 bg-black/65 backdrop-blur-sm z-40"
          />

          {/* Screen Container: 100% full-screen on mobile, centered modal dialog on desktop */}
          <div className="min-h-full flex items-start sm:items-center justify-center p-0 sm:p-6 z-50 relative pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full sm:max-w-lg min-h-screen sm:min-h-0 sm:max-h-[90vh] bg-hob-bg sm:bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-hob-brown/15 overflow-hidden flex flex-col pointer-events-auto relative"
            >
              {/* Native App Top Header */}
              <div className="sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-5 border-b border-hob-brown/10 bg-gradient-to-r from-[#0E422F] to-[#071E15] text-white flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  {/* Circular Back Button */}
                  <button
                    onClick={handleBack}
                    type="button"
                    className="w-10 h-10 rounded-full bg-white/95 text-hob-brown shadow-sm flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-hob-mint font-display block">
                      We'd Love To Hear From You
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white">
                      Contact House of Buns
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleBack}
                  type="button"
                  className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
                {/* Direct Touch Channels */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${RESTAURANT_CONFIG.location.phone}`}
                    className="p-3.5 rounded-2xl bg-white hover:bg-hob-mint/30 border border-hob-brown/15 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-hob-brown/10 text-hob-brown flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 text-hob-brown" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-hob-muted block">Direct Call</span>
                    <span className="text-xs font-bold text-hob-brown">{RESTAURANT_CONFIG.location.phone}</span>
                  </a>

                  <a
                    href={RESTAURANT_CONFIG.location.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-[#07251A] text-white hover:bg-[#0A3324] border border-hob-caramel/30 transition-all text-left group shadow-xs cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-hob-mint block">WhatsApp</span>
                    <span className="text-xs font-bold text-white">{RESTAURANT_CONFIG.location.phone}</span>
                  </a>
                </div>

                {/* Outlet Info */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/10 space-y-2 text-xs text-hob-text shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-hob-caramel shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Vijay Nagar Flagship:</span>
                      <span className="text-hob-muted text-[11px]">
                        Plot 42, PU-4 Commercial, Near C21 Mall, AB Road, Indore
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <Clock className="w-4 h-4 text-hob-caramel shrink-0" />
                    <span className="text-hob-muted text-[11px]">
                      Open Daily: 11:00 AM – 02:00 AM (Dine-in, Takeaway & Late-Night Delivery)
                    </span>
                  </div>
                </div>

                {/* Inquiry Form */}
                <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-white border border-hob-brown/10 space-y-3.5 shadow-xs">
                  <h4 className="font-display font-black text-sm text-hob-brown uppercase tracking-wider">
                    Send A Message or Catering Inquiry
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aman Sharma"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 88273..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30"
                    >
                      <option value="General Query">General Kitchen Query</option>
                      <option value="Bulk Catering">Bulk Catering / Birthday Party Order</option>
                      <option value="Franchise">Franchise & Business Opportunity</option>
                      <option value="Feedback">Feedback & Compliments</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can make your experience legendary..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-hob-cream font-display font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-hob-caramel" />
                    <span>Send Message To Team</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
