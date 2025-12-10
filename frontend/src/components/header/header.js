import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 1. Import the Brain
import "./header.css";
import logo1 from "../../assets/logo1.jpg";

function Navitems({ children, to }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();

  return (
    <nav>
      <ul>
        <Navitems to="/">Home</Navitems>
        <Navitems to="/">New Arrivals</Navitems>

        {/* CART BUTTON */}
        <li>
          <div
            className="cart-btn" // <--- ADDED THIS CLASS
            onClick={() => setIsCartOpen(true)}
          >
            Cart
            {/* Notification Badge */}
            {cartItems.length > 0 && (
              <span
                style={{
                  background: cartItems.length > 0 ? "#483426" : "transparent",
                  color: "#ffefdd",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
        </li>

        <Navitems to="/contact">Contact</Navitems>
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

function Header() {
  return (
    <div>
      <header>
        <Logotxt />
        <Navbar />
      </header>
    </div>
  );
}

export default Header;
