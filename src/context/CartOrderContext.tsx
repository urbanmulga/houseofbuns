import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem } from "../data/menuData";

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedAddons?: { name: string; price: number }[];
  totalItemPrice: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  bunBucks: number;
  addresses?: { label: string; address: string }[];
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
  
  // User & Auth State
  user: UserProfile | null;
  login: (profile?: Partial<UserProfile>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Navigation Drawer
  isMenuDrawerOpen: boolean;
  openMenuDrawer: () => void;
  closeMenuDrawer: () => void;

  // Order Tracking ("Where Is My Order?")
  isOrderTrackingOpen: boolean;
  openOrderTracking: () => void;
  closeOrderTracking: () => void;

  // Contact Us Modal
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  // Profile Modal
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const CartOrderContext = createContext<CartOrderContextType | null>(null);

const DEFAULT_DEMO_USER: UserProfile = {
  name: "Aman Sharma",
  phone: "+91 98260 12345",
  email: "aman.sharma@indorebuns.in",
  bunBucks: 250,
  addresses: [
    { label: "Home", address: "Flat 402, Royal Residency, Scheme 54, Vijay Nagar, Indore" },
    { label: "Work", address: "C21 Business Park, AB Road, Indore" },
  ],
};

export function CartOrderProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Navigation, Auth & Modal States
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  // Auth Methods
  const login = (customProfile?: Partial<UserProfile>) => {
    const newUser = {
      ...DEFAULT_DEMO_USER,
      ...customProfile,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
    showToast("Logged out successfully. See you soon!");
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Menu Drawer
  const openMenuDrawer = () => setIsMenuDrawerOpen(true);
  const closeMenuDrawer = () => setIsMenuDrawerOpen(false);

  // Order Tracking
  const openOrderTracking = () => {
    setIsMenuDrawerOpen(false);
    setIsOrderTrackingOpen(true);
  };
  const closeOrderTracking = () => setIsOrderTrackingOpen(false);

  // Contact Modal
  const openContactModal = () => {
    setIsMenuDrawerOpen(false);
    setIsContactModalOpen(true);
  };
  const closeContactModal = () => setIsContactModalOpen(false);

  // Profile Modal
  const openProfileModal = () => {
    setIsMenuDrawerOpen(false);
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => setIsProfileModalOpen(false);

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

        user,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,

        isMenuDrawerOpen,
        openMenuDrawer,
        closeMenuDrawer,

        isOrderTrackingOpen,
        openOrderTracking,
        closeOrderTracking,

        isContactModalOpen,
        openContactModal,
        closeContactModal,

        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
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
