import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, BookOpen, Search, ShoppingBag } from "lucide-react";
import { useCartOrder } from "../context/CartOrderContext";

export function MobileBottomNav() {
  const location = useLocation();
  const { cartCount, openOrderModal, openSearchModal, isSearchModalOpen } = useCartOrder();

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openSearchModal();
  };

  const items = [
    { label: "Home", path: "/", icon: Home },
    { label: "Menu", path: "/menu", icon: UtensilsCrossed },
    { label: "Story", path: "/story", icon: BookOpen },
    { label: "Search", path: "#search", icon: Search, onClick: handleSearchClick },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-hob-surface/95 backdrop-blur-lg border-t border-hob-brown/10 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      {items.map((item) => {
        const Icon = item.icon;
        const isSearch = item.label === "Search";
        const isActive = isSearch
          ? isSearchModalOpen
          : location.pathname === item.path && !isSearchModalOpen;

        return (
          <Link
            key={item.label}
            to={item.path}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
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
        className="relative flex flex-col items-center gap-1 py-1 px-3 bg-[#006241] text-white rounded-2xl shadow-md active:scale-95 transition-transform cursor-pointer"
        aria-label="Open Order Bag"
      >
        <div className="relative p-1">
          <ShoppingBag className="w-5 h-5 text-white stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-white text-[#006241] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-white">Order</span>
      </button>
    </nav>
  );
}
