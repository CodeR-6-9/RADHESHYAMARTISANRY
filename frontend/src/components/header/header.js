import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Search, ShoppingBag, LogOut, Package, Menu, X } from "lucide-react";
import logo1 from "../../assets/logo1.jpg";
import SearchOverlay from "../search/SearchOverlay";
import "./header.css";

function Header() {
  const { cartItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ⚠️ PASTE YOUR REAL PRODUCT ID HERE
  const NEW_ARRIVAL_ID = "694014facfde4a2b8c84b070";

  // --- NEW: Handle Orders Click ---
  const handleOrdersClick = () => {
    setIsMenuOpen(false); // Close sidebar if open
    if (user) {
      navigate("/my-orders");
    } else {
      // The Logic: Prompt user then redirect
      alert("Please log in to check your orders.");
      navigate("/login");
    }
  };

  const handleMobileNav = (path) => {
    setIsMenuOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const getFirstName = () => {
    if (user && user.name) {
      return user.name.split(" ")[0];
    }
    return "User";
  };

  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="main-header">
        {/* --- 1. MOBILE MENU BUTTON --- */}
        <button
          className="icon-btn mobile-menu-trigger"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} strokeWidth={2} />
        </button>

        {/* --- 2. LOGO --- */}
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

        {/* --- 3. DESKTOP NAV --- */}
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to={`/showcase/${NEW_ARRIVAL_ID}`}>New Arrivals</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* --- 4. ACTIONS --- */}
        <div className="header-actions">
          <button
            className="icon-btn search-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={22} strokeWidth={2} />
          </button>

          <div className="desktop-actions">
            {/* Cart Button */}
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
              /* --- LOGGED IN USER --- */
              <div className="auth-group">
                <span className="greeting">Hi, {getFirstName()}</span>

                <button
                  className="icon-btn-with-text"
                  onClick={handleOrdersClick}
                  title="My Orders"
                >
                  <Package size={20} strokeWidth={2} />
                  <span>Orders</span>
                </button>

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
              /* --- GUEST USER --- */
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                {/* Guest Orders Button (FIXED) */}
                <button
                  className="icon-btn-with-text"
                  onClick={handleOrdersClick}
                  title="Orders"
                >
                  <Package size={20} strokeWidth={2} />
                  <span>Orders</span>
                </button>

                <Link to="/login" className="login-link">
                  Login
                </Link>
              </div>
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
          {/* ORDERS BUTTON: Now always visible */}
          <button onClick={handleOrdersClick}>My Orders</button>
          <button onClick={() => handleMobileNav("/contact")}>
            Contact Us
          </button>
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
