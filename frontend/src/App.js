import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/header/header";
import Main from "./components/main/main";
import ProductPage from "./components/product/ProductPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import CartDrawer from "./components/cart/CartDrawer";
import ContactPage from "./components/contact/ContactPage";
import CategoryPage from "./components/category/CategoryPage";
import ShowcasePage from "./components/showcase/ShowcasePage";
import SearchPage from "./components/search/SearchPage";
import SuccessPage from "./components/checkout/SuccessPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import MyOrders from "./components/profile/MyOrders";
import MobileFooter from "./components/MobileFooter/MobileFooter";
import ContactUs from "./components/legal/ContactUs";
import ShippingPolicy from "./components/legal/ShippingPolicy";
import RefundPolicy from "./components/legal/RefundPolicy";
import Terms from "./components/legal/Terms";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Footer from "./components/footer/footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/showcase/:id" element={<ShowcasePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/legal/contact" element={<ContactUs />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <MobileFooter />
      <Footer />
    </div>
  );
}

export default App;
