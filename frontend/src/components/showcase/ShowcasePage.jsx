import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import "./ShowcasePage.css";

const ShowcasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  // Initialize with the first style
  const [activeStyle, setActiveStyle] = useState(
    product && product.styles ? product.styles[0] : null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  // --- SMART IMAGE LOGIC ---
  // The Convention: images[0] is Desktop (Horizontal), images[1] is Mobile (Vertical)

  // 1. Get the list of images for the active style (or fallback to product main images)
  const currentImages = activeStyle?.images || product.images || [];

  // 2. Desktop: First image in array (01 - Horizontal)
  const desktopImg = currentImages[0] || product.image;

  // 3. Mobile: Second image in array (02/03 - Vertical), or fallback to Desktop if missing
  const mobileImg = currentImages[1] || desktopImg;

  return (
    <div className="showcase-container">
      <button className="close-showcase" onClick={() => navigate(-1)}>
        ×
      </button>

      {/* HERO SECTION */}
      <div className="showcase-hero">
        <div className="hero-image-wrapper">
          <picture>
            {/* Desktop: Show Image 1 (Horizontal) */}
            <source media="(min-width: 768px)" srcSet={desktopImg} />

            {/* Mobile: Show Image 2 (Vertical) */}
            <img src={mobileImg} alt={product.title} className="hero-img" />
          </picture>

          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <span className="collection-tag">New Arrival</span>
          <h1 className="hero-title">{product.title}</h1>
          <p className="hero-price">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="showcase-details">
        <div className="details-grid">
          {/* Story Column */}
          <div className="story-column">
            <h3>The Story</h3>
            <p className="story-text">{product.description}</p>
            <div className="specs-list">
              <div className="spec-item">
                <span>Material</span>
                <strong>Ceramic</strong>
              </div>
              <div className="spec-item">
                <span>Craft</span>
                <strong>Hand-painted</strong>
              </div>
            </div>
          </div>

          {/* Selection Column */}
          <div className="selection-column">
            <h3>Select Variant</h3>
            {product.styles && (
              <div className="editorial-style-grid">
                {product.styles.map((style) => (
                  <div
                    key={style.name}
                    className={`editorial-style-card ${
                      activeStyle.name === style.name ? "active" : ""
                    }`}
                    onClick={() => setActiveStyle(style)}
                  >
                    {/* Thumbnail is usually the vertical one (mobile friendly) */}
                    <img
                      src={style.images?.[1] || style.images?.[0]}
                      alt={style.name}
                    />
                    <span className="style-name">{style.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className={`sticky-action-bar ${isScrolled ? "visible" : ""}`}>
        <div className="bar-info">
          <span className="bar-title">{product.title}</span>
          <span className="bar-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          className="bar-btn"
          onClick={() =>
            addToCart(product, activeStyle?.name || "Default", null)
          }
        >
          Add to Bag
        </button>
      </div>

      {/* Mobile Static Button */}
      <div className="mobile-static-action">
        <button
          className="full-width-btn"
          onClick={() =>
            addToCart(product, activeStyle?.name || "Default", null)
          }
        >
          Add to Bag — ₹{product.price.toLocaleString("en-IN")}
        </button>
      </div>
    </div>
  );
};

export default ShowcasePage;
