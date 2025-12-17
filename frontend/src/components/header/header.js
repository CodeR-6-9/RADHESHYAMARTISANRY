import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  ShoppingBag,
  LogOut,
  Package, // <--- Using the requested Package icon
  Menu,
  X,
} from "lucide-react";
import logo1 from "../../assets/logo1.jpg";
import SearchOverlay from "../search/SearchOverlay";
import "./Header.css";

function Header() {
  const { cartItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ⚠️ PASTE YOUR REAL PRODUCT ID HERE (Same one you used in MobileFooter)
  const NEW_ARRIVAL_ID = "694014facfde4a2b8c84b070";

  // Helper to handle navigation from sidebar
  const handleMobileNav = (path) => {
    setIsMenuOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  // Helper to safely get the first name or fallback
  const getFirstName = () => {
    if (user && user.name) {
      return user.name.split(" ")[0];
    }
    return "User";
  };

  // Helper to safely get the first initial or fallback
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="main-header">
        {/* --- 1. MOBILE MENU BUTTON (Left) --- */}
        <button
          className="icon-btn mobile-menu-trigger"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} strokeWidth={2} />
        </button>

        {/* --- 2. LOGO SECTION (Center on Mobile) --- */}
        <div className="header-left">
          <Link to="/" className="brand-logo">
            <img src={logo1} alt="Radheshyam Artisanry" />
            <div className="logo-text">
              <span className="l1">
                <span className="first-letter">R</span>ADHESHYAM
              </span>
              <span className="l2">ARTISANRY</span>
            </div>
          </Link>
        </div>

        {/* --- 3. DESKTOP NAV (Hidden on Mobile) --- */}
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          {/* ⚡ FIXED LINK: Now uses the Real ID */}
          <Link to={`/showcase/${NEW_ARRIVAL_ID}`}>New Arrivals</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* --- 4. ACTIONS SECTION --- */}
        <div className="header-actions">
          <button
            className="icon-btn search-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={22} strokeWidth={2} />
          </button>

          {/* Desktop Actions */}
          <div className="desktop-actions">
            <button
              className="icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>

            {user ? (
              <div className="auth-group">
                <span className="greeting">Hi, {getFirstName()}</span>

                {/* ORDERS BUTTON (Using Package Icon) */}
                <button
                  className="icon-btn-with-text"
                  onClick={() => navigate("/my-orders")}
                  title="My Orders"
                >
                  <Package size={20} strokeWidth={2} />
                  <span>Orders</span>
                </button>

                {/* LOGOUT BUTTON */}
                <button
                  className="icon-btn-with-text logout-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={2} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* --- 5. MOBILE SIDEBAR --- */}
      <div
        className={`mobile-sidebar-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="icon-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Greeting Section */}
        {user ? (
          <div className="sidebar-user-card">
            <div className="avatar-circle">{getUserInitial()}</div>
            <div className="user-info">
              <span className="welcome-text">Welcome back,</span>
              <span className="user-name">{user.name || "User"}</span>
            </div>
          </div>
        ) : (
          <div className="sidebar-auth-promo">
            <p>Join us for exclusive offers!</p>
            <button
              className="sidebar-login-btn"
              onClick={() => handleMobileNav("/login")}
            >
              Login / Register
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <button onClick={() => handleMobileNav("/contact")}>
            Contact Us
          </button>
          {user && (
            <button onClick={() => handleMobileNav("/my-orders")}>
              My Orders
            </button>
          )}
        </nav>

        {/* Logout Button (Bottom) */}
        {user && (
          <div className="sidebar-footer">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </aside>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default Header;
