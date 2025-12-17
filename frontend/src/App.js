import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";
import ProductPage from "./components/product/ProductPage"; // 1. Import it
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
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
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
      </Routes>
      <MobileFooter />
    </div>
  );
}

export default App;
