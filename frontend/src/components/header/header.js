import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./header.css";
import logo1 from "../../assets/logo1.jpg";

// 1. Import the Overlay Component
import SearchOverlay from "../search/SearchOverlay";

function Navitems({ children, to }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

// Navbar now accepts an 'openSearch' function as a prop
function Navbar({ openSearch }) {
  const { cartItems, setIsCartOpen } = useCart();

  return (
    <nav>
      <ul>
        <Navitems to="/">Home</Navitems>
        <Navitems to="/showcase/1">New Arrivals</Navitems>
        <Navitems to="/contact">Contact</Navitems>

        {/* --- SEARCH ICON (Clicking this opens the overlay) --- */}
        <li>
          <div className="nav-icon-btn search-trigger" onClick={openSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </li>

        {/* --- CART ICON --- */}
        <li>
          <div
            className="nav-icon-btn cart-btn"
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>

            {/* Cart Badge */}
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

function Logotxt() {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo1} alt="RADHESHYAM ARTISANRY Logo" />
        <span className="logo-text">
          <span className="l1">
            <span className="first-letter">R</span>ADHESHYAM
          </span>
          <span className="l2">ARTISANRY</span>
        </span>
      </Link>
    </div>
  );
}

// Main Header Component
function Header() {
  // State to control the Search Overlay
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header>
        <Logotxt />
        {/* Pass the function to open search down to Navbar */}
        <Navbar openSearch={() => setIsSearchOpen(true)} />
      </header>

      {/* Render the Overlay outside the header (controlled by state) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default Header;
