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
      </Routes>
    </div>
  );
}

export default App;
