import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, BookOpen, MapPin, ShoppingBag } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function MobileBottomNav() {
  const location = useLocation();
  const { cartCount, openOrderModal } = useCartOrder();

  const items = [
    { label: "Home", path: "/", icon: Home },
    { label: "Menu", path: "/menu", icon: UtensilsCrossed },
    { label: "Story", path: "/story", icon: BookOpen },
    { label: "Indore", path: "/outlet", icon: MapPin },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-hob-surface/95 backdrop-blur-lg border-t border-hob-brown/10 px-4 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-xs font-semibold transition-colors ${
              isActive ? "text-hob-brown font-bold" : "text-hob-muted hover:text-hob-brown"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${isActive ? "bg-hob-brown/10 text-hob-brown" : ""}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={() => openOrderModal()}
        type="button"
        className="relative flex flex-col items-center gap-1 py-1 px-3 bg-hob-brown text-hob-cream rounded-2xl shadow-md active:scale-95 transition-transform"
      >
        <div className="relative p-1">
          <ShoppingBag className="w-5 h-5 text-hob-caramel" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-hob-caramel text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase">Order</span>
      </button>
    </nav>
  );
}
