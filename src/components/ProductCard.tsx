import { useState } from "react";
import { Plus, Minus, Heart, Sparkles, Zap, ShieldCheck } from "lucide-react";
import type { MenuItem } from "../data/menuData";
import { useCartOrder } from "../context/CartOrderContext";

interface ProductCardProps {
  item: MenuItem;
  layout?: "vertical" | "horizontal" | "quick-commerce";
}

export function ProductCard({ item, layout = "quick-commerce" }: ProductCardProps) {
  const { cartItems, addToCart, updateQuantity, openProductDetail } = useCartOrder();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find if this item is in the cart
  const cartItem = cartItems.find((ci) => ci.item.id === item.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  // =========================================================================
  // 1. HORIZONTAL COMPACT CARD (Used in Carousels & Hero Drops)
  // =========================================================================
  if (layout === "horizontal") {
    return (
      <div
        onClick={() => openProductDetail(item)}
        className="group relative flex-shrink-0 w-56 xs:w-64 bg-white hover:bg-hob-surface border border-hob-brown/10 rounded-3xl p-3.5 xs:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="relative w-full h-36 mb-3 flex items-center justify-center overflow-hidden rounded-2xl bg-hob-surface/50">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {/* 100% Veg Symbol */}
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs border border-green-600/30 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block ring-1 ring-green-600 ring-offset-1" />
            </div>

            {item.isBestSeller && (
              <span className="absolute top-2 right-2 bg-hob-brown text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-hob-caramel" />
                Hot
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            {item.isJainCertified && (
              <span className="text-[9px] font-extrabold text-[#006241] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                Jain Certified
              </span>
            )}
            <span className="text-[10px] font-bold text-hob-muted">
              {item.servingSize || "1 Portion"}
            </span>
          </div>

          <h4 className="font-display font-bold text-sm text-hob-brown line-clamp-1 group-hover:text-hob-brown-dark transition-colors">
            {item.name}
          </h4>
          <p className="text-[11px] text-hob-muted mt-0.5 line-clamp-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-hob-brown/10">
          <div>
            <span className="font-display font-black text-base text-hob-brown">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-hob-muted line-through ml-1.5 font-medium">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {qtyInCart > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#006241] text-white rounded-full px-2 py-1 shadow-xs"
            >
              <button
                onClick={() => updateQuantity(cartItem!.id, -1)}
                className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold w-4 text-center">{qtyInCart}</span>
              <button
                onClick={() => updateQuantity(cartItem!.id, 1)}
                className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item, 1);
              }}
              type="button"
              className="px-3 py-1 rounded-full bg-white hover:bg-green-50 text-[#006241] font-bold text-xs border border-[#006241] shadow-xs active:scale-95 transition-all"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. QUICK-COMMERCE CARD (Reference Blinkit/Zepto Style Layout for MenuPage)
  // =========================================================================
  return (
    <div
      onClick={() => openProductDetail(item)}
      className="group bg-white hover:bg-hob-surface/50 border border-hob-brown/10 rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Product Visual Container */}
        <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3 bg-hob-surface/60 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Left: 100% Veg Symbol */}
          <div className="absolute top-1.5 xs:top-2 left-1.5 xs:left-2 bg-white/95 backdrop-blur-xs p-0.5 xs:p-1 rounded-md shadow-xs border border-green-600/30 flex items-center justify-center">
            <span className="w-2 xs:w-2.5 h-2 xs:h-2.5 rounded-full bg-green-600 inline-block ring-1 ring-green-600 ring-offset-1" />
          </div>

          {/* Top Right: Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            type="button"
            className="absolute top-1.5 xs:top-2 right-1.5 xs:right-2 p-1 xs:p-1.5 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-hob-muted hover:text-red-500 shadow-xs transition-all cursor-pointer"
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-3 xs:w-3.5 h-3 xs:h-3.5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-hob-muted"
              }`}
            />
          </button>

          {/* Floating ADD Button over bottom-right of image (Matching Reference!) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-1.5 xs:bottom-2 right-1.5 xs:right-2 z-10"
          >
            {qtyInCart > 0 ? (
              <div className="flex items-center bg-[#006241] text-white rounded-lg sm:rounded-xl px-1.5 xs:px-2.5 py-0.5 sm:py-1.5 shadow-md">
                <button
                  onClick={() => updateQuantity(cartItem!.id, -1)}
                  className="p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-[11px] sm:text-xs font-black w-4 xs:w-5 text-center">{qtyInCart}</span>
                <button
                  onClick={() => updateQuantity(cartItem!.id, 1)}
                  className="p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item, 1);
                }}
                type="button"
                className="px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-green-50 text-[#006241] font-display font-black text-[10px] xs:text-xs tracking-wider border-2 border-[#006241] shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer uppercase flex items-center gap-1"
              >
                <span>ADD</span>
              </button>
            )}
          </div>
        </div>

        {/* Portion / Weight Pill (Reference Match: "1 piece (300-400 g)") */}
        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-bold text-hob-brown bg-hob-surface px-2 py-0.5 rounded-md border border-hob-brown/10">
            {item.servingSize || "1 Portion"}
          </span>

          {item.isJainCertified && (
            <span className="text-[9px] font-black text-[#006241] bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-[#006241]" />
              Jain Certified
            </span>
          )}

          {!item.isJainCertified && item.jainOptionAvailable && (
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50/70 px-1.5 py-0.5 rounded-md">
              Jain Avail.
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-display font-extrabold text-xs xs:text-sm sm:text-base text-hob-brown leading-snug line-clamp-2 group-hover:text-[#006241] transition-colors">
          {item.name}
        </h3>

        {/* Prep Time Badge (Reference Match: "⚡ 10 MINS") */}
        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700">
          <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" />
          <span>{item.prepTime || "10 MINS"}</span>
        </div>
      </div>

      {/* Pricing & Discount Footer */}
      <div className="mt-2.5 pt-2 border-t border-hob-brown/10 flex items-baseline justify-between">
        <div>
          {discountPercent && discountPercent > 0 && (
            <span className="text-[10px] font-black text-blue-600 block leading-tight">
              {discountPercent}% OFF
            </span>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-sm sm:text-base text-hob-brown">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-[11px] text-hob-muted line-through font-medium">
                MRP ₹{item.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
