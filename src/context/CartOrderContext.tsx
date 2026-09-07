import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem } from "../data/menuData";

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedAddons?: { name: string; price: number }[];
  totalItemPrice: number;
}

interface CartOrderContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: MenuItem, quantity?: number, addons?: { name: string; price: number }[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isOrderModalOpen: boolean;
  openOrderModal: (initialItem?: MenuItem) => void;
  closeOrderModal: () => void;
  selectedProduct: MenuItem | null;
  openProductDetail: (product: MenuItem) => void;
  closeProductDetail: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;

  // Navigation Drawer
  isMenuDrawerOpen: boolean;
  openMenuDrawer: () => void;
  closeMenuDrawer: () => void;

  // Contact Us Modal
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  // Search Modal
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

const CartOrderContext = createContext<CartOrderContextType | null>(null);

export function CartOrderProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Navigation States
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    addons: { name: string; price: number }[] = []
  ) => {
    const addonsPrice = addons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = item.price + addonsPrice;
    const cartItemId = `${item.id}-${addons.map((a) => a.name).sort().join("|")}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId
            ? {
                ...ci,
                quantity: ci.quantity + quantity,
                totalItemPrice: (ci.quantity + quantity) * unitPrice,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          quantity,
          selectedAddons: addons,
          totalItemPrice: unitPrice * quantity,
        },
      ];
    });

    showToast(`Added ${item.name} to your order!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const nextQty = ci.quantity + delta;
            if (nextQty <= 0) return null;
            const unitPrice = ci.totalItemPrice / ci.quantity;
            return {
              ...ci,
              quantity: nextQty,
              totalItemPrice: nextQty * unitPrice,
            };
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openOrderModal = (initialItem?: MenuItem) => {
    if (initialItem) {
      addToCart(initialItem, 1);
    }
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const openProductDetail = (product: MenuItem) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Menu Drawer
  const openMenuDrawer = () => setIsMenuDrawerOpen(true);
  const closeMenuDrawer = () => setIsMenuDrawerOpen(false);

  // Contact Modal
  const openContactModal = () => {
    setIsMenuDrawerOpen(false);
    setIsContactModalOpen(true);
  };
  const closeContactModal = () => setIsContactModalOpen(false);

  // Search Modal
  const openSearchModal = () => {
    setIsMenuDrawerOpen(false);
    setIsSearchModalOpen(true);
  };
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotal = cartItems.reduce((sum, ci) => sum + ci.totalItemPrice, 0);

  return (
    <CartOrderContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        toastMessage,
        showToast,

        isMenuDrawerOpen,
        openMenuDrawer,
        closeMenuDrawer,

        isContactModalOpen,
        openContactModal,
        closeContactModal,

        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
      }}
    >
      {children}
    </CartOrderContext.Provider>
  );
}

export function useCartOrder() {
  const context = useContext(CartOrderContext);
  if (!context) {
    throw new Error("useCartOrder must be used within a CartOrderProvider");
  }
  return context;
}
