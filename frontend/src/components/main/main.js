import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "./main.css";

import bigphoto from "../../assets/bigphoto.jpg";

function Pic() {
  return <img src={bigphoto} alt="Description" className="my-photo" />;
}

function Navitems({ children }) {
  return <li className="feat">{children}</li>;
}

function Navbar() {
  return (
    <nav>
      <ul>
        <Navitems>High Quality</Navitems>
        <Navitems>Premium Design</Navitems>
        <Navitems>Veratile</Navitems>
        <Navitems>Learn More </Navitems>
      </ul>
    </nav>
  );
}

function RightText() {
  return (
    <div className="rt">
      <div className="right-text">Timeless Design,</div>
      <div className="right-text2">Premium Material</div>
      <div className="right-text3">
        Whether you love modern minimalism, timeless
      </div>
      <div className="right-text4">classics, or bold statement pieces.</div>
      <div className="navi">
        <Navbar />
      </div>
    </div>
  );
}

// --- UPDATED PRODUCT CARD ---
function ProductCard({ id, imgSrc, imgAlt, title, details }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      // NAVIGATE TO SPECIFIC ID
      onClick={() => navigate(`/product/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={imgSrc} alt={imgAlt} />
      <div className="product-info">
        <h3>{title}</h3>
        <p className="product-details">{details}</p>
      </div>
    </div>
  );
}

function PicGrid() {
  return (
    <div className="product-grid">
      {/* MAP THROUGH THE SHARED DATA */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id} // Pass ID
          imgSrc={product.image}
          imgAlt={product.title}
          title={product.title}
          details={`₹${product.price} (Originally ₹${product.originalPrice})`}
        />
      ))}
    </div>
  );
}

function Main() {
  return (
    <>
      <header className="hero-section">
        <Pic />
        <RightText />
      </header>
      <main>
        <PicGrid />
      </main>
    </>
  );
}

export default Main;
