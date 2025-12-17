import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Sparkles, ShoppingBag, User } from "lucide-react"; // Removed Phone
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./MobileFooter.css";

export default function MobileFooter() {
  const { cartItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // --- SCROLL LOGIC ---
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling DOWN and we are past the top (50px) -> Hide
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      }
      // If scrolling UP -> Show
      else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // ⚠️ REPLACE THIS STRING WITH A REAL ID FROM YOUR DATABASE
  const NEW_ARRIVAL_ID = "694014facfde4a2b8c84b070";

  return (
    <nav className={`mobile-footer ${!isVisible ? "footer-hidden" : ""}`}>
      {/* 1. HOME */}
      <Link to="/" className={`mf-item ${isActive("/") ? "active" : ""}`}>
        <Home size={22} strokeWidth={isActive("/") ? 2.5 : 2} />
        <span>Home</span>
      </Link>

      {/* 2. NEW ARRIVALS (Fixed Link) */}
      <Link
        to={`/showcase/${NEW_ARRIVAL_ID}`}
        className={`mf-item ${
          location.pathname.includes("/showcase") ? "active" : ""
        }`}
      >
        <Sparkles
          size={22}
          strokeWidth={location.pathname.includes("/showcase") ? 2.5 : 2}
        />
        <span>New</span>
      </Link>

      {/* 3. CART */}
      <button className="mf-item mf-btn" onClick={() => setIsCartOpen(true)}>
        <div className="icon-wrapper">
          <ShoppingBag size={22} strokeWidth={2} />
          {cartItems.length > 0 && (
            <span className="mf-badge">{cartItems.length}</span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* 4. ORDERS / LOGIN */}
      <button
        className={`mf-item mf-btn ${isActive("/my-orders") ? "active" : ""}`}
        onClick={() => navigate(user ? "/my-orders" : "/login")}
      >
        <User size={22} strokeWidth={isActive("/my-orders") ? 2.5 : 2} />
        <span>{user ? "Orders" : "Login"}</span>
      </button>
    </nav>
  );
}
