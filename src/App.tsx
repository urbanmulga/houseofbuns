import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartOrderProvider } from "./context/CartOrderContext";
import { Navbar } from "./components/Navbar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { OrderModal } from "./components/OrderModal";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { NavigationDrawer } from "./components/NavigationDrawer";
import { ContactUsModal } from "./components/ContactUsModal";
import { SearchModal } from "./components/SearchModal";
import { Toast } from "./components/Toast";

// Modern code-splitting with React.lazy
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const MenuPage = lazy(() =>
  import("./pages/MenuPage").then((m) => ({ default: m.MenuPage }))
);
const OurStoryPage = lazy(() =>
  import("./pages/OurStoryPage").then((m) => ({ default: m.OurStoryPage }))
);
const OutletPage = lazy(() =>
  import("./pages/OutletPage").then((m) => ({ default: m.OutletPage }))
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-xl animate-pulse ring-2 ring-hob-brown/15 flex items-center justify-center">
        <img
          src="/images/brand-logo.png"
          alt="House of Buns Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-hob-muted">
        Baking the House experience...
      </p>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <CartOrderProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-hob-bg text-hob-text w-full max-w-full relative">
          {/* Main Desktop Header */}
          <Navbar />

          {/* Page Routing with Suspense */}
          <main className="flex-1 w-full max-w-full pb-28 md:pb-0">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/story" element={<OurStoryPage />} />
                <Route path="/outlet" element={<OutletPage />} />
              </Routes>
            </Suspense>
          </main>

          {/* Mobile Bottom Thumb Navigation */}
          <MobileBottomNav />

          {/* Global UI Modals, Drawers & Notifications */}
          <NavigationDrawer />
          <ContactUsModal />
          <OrderModal />
          <ProductDetailModal />
          <SearchModal />
          <Toast />
        </div>
      </CartOrderProvider>
    </BrowserRouter>
  );
}

export default App;
