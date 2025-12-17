import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="desktop-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Radheshyam Artisanry</h3>
          <p>Authentic Home Decor</p>
        </div>

        <div className="footer-section">
          <h4>Legal & Support</h4>
          <div className="footer-links">
            <Link to="/contact">Contact Us</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>+91 79856 42474</p>
          <p>radheshyamartisanry@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Radheshyam Artisanry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
