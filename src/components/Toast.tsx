import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function Toast() {
  const { toastMessage } = useCartOrder();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-hob-brown-dark text-hob-cream px-5 py-3.5 rounded-2xl shadow-2xl border border-hob-caramel/30 flex items-center gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-hob-caramel/20 flex items-center justify-center text-hob-caramel">
            <CheckCircle2 className="w-4 h-4 text-hob-caramel" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
