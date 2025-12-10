import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";
import ProductPage from "./components/product/ProductPage"; // 1. Import it
import CheckoutPage from "./components/checkout/CheckoutPage";
import CartDrawer from "./components/cart/CartDrawer";
import ContactPage from "./components/contact/ContactPage";

function App() {
  return (
    <div className="App">
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
