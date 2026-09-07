import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  User,
} from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, showToast } = useCartOrder();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");

  // Native mobile back button handling
  useEffect(() => {
    if (!isAuthModalOpen) return;

    window.history.pushState({ modal: "auth" }, "");
    const handlePopState = () => {
      closeAuthModal();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  const handleBack = () => {
    closeAuthModal();
    if (window.history.state?.modal === "auth") {
      window.history.back();
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep("otp");
    showToast("OTP sent: Use 1234 to verify");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234" && otp !== "0000" && otp.length < 4) {
      showToast("Please enter OTP 1234 to sign in");
      return;
    }
    login({
      name: name || "Aman Sharma",
      phone: `+91 ${phone || "98260 12345"}`,
      bunBucks: isRegister ? 100 : 250,
    });
    setStep("phone");
    setPhone("");
    setOtp("");
    setName("");
  };

  const handleQuickDemoLogin = () => {
    login({
      name: "Aman Sharma",
      phone: "+91 98260 12345",
      bunBucks: 250,
    });
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Desktop Backdrop */}
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
              className="w-full sm:max-w-md min-h-screen sm:min-h-0 sm:max-h-[90vh] bg-hob-bg sm:bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-hob-brown/15 overflow-hidden flex flex-col pointer-events-auto relative"
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
                      House of Buns Indore
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white">
                      {isRegister ? "Join Buns Club" : "Sign In to Account"}
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
              <div className="p-4 sm:p-6 space-y-5 flex-1 overflow-y-auto">
                {/* Quick Demo Login Option */}
                <div className="p-4 rounded-2xl bg-white border border-hob-brown/15 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold text-hob-muted uppercase tracking-wider block">
                      Instant Testing
                    </span>
                    <span className="text-xs font-bold text-hob-brown block">
                      Sign in as Aman Sharma (Gold)
                    </span>
                  </div>
                  <button
                    onClick={handleQuickDemoLogin}
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-hob-cream text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-hob-caramel" />
                    <span>1-Click Sign In</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-hob-muted before:flex-1 before:h-px before:bg-hob-brown/15 after:flex-1 after:h-px after:bg-hob-brown/15">
                  <span>or sign in with mobile</span>
                </div>

                {step === "phone" ? (
                  <form onSubmit={handleSendOtp} className="p-4 rounded-2xl bg-white border border-hob-brown/10 space-y-4 shadow-xs">
                    {isRegister && (
                      <div>
                        <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-hob-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Aman Sharma"
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] font-bold uppercase text-hob-muted block mb-1">
                        10-Digit Mobile Number
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-hob-brown/15 bg-hob-bg text-hob-muted font-bold text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="98260 12345"
                          required
                          className="w-full px-3.5 py-2.5 rounded-r-xl bg-hob-bg border border-hob-brown/15 text-xs text-hob-text focus:outline-none focus:ring-2 focus:ring-hob-brown/30 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-hob-cream font-display font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Verification OTP</span>
                      <ArrowRight className="w-3.5 h-3.5 text-hob-caramel" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="p-4 rounded-2xl bg-white border border-hob-brown/10 space-y-4 shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold uppercase text-hob-muted">
                          Enter 4-Digit OTP
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep("phone")}
                          className="text-[10px] font-bold text-hob-caramel hover:underline"
                        >
                          Change Number
                        </button>
                      </div>

                      <input
                        type="text"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 1234"
                        required
                        autoFocus
                        className="w-full px-4 py-3 rounded-xl bg-hob-bg border border-hob-brown/20 text-center font-mono text-xl tracking-widest text-hob-brown focus:outline-none focus:ring-2 focus:ring-hob-brown/30"
                      />
                      <span className="text-[10px] text-hob-muted text-center block mt-1">
                        Demo OTP is <strong className="text-hob-brown font-mono">1234</strong>
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-hob-brown hover:bg-hob-brown-dark text-hob-cream font-display font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-hob-caramel" />
                      <span>Verify & Continue</span>
                    </button>
                  </form>
                )}

                {/* Switch between Login and Register */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-xs text-hob-muted hover:text-hob-brown font-medium cursor-pointer"
                  >
                    {isRegister
                      ? "Already have an account? Sign In"
                      : "New to House of Buns? Create an Account"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
