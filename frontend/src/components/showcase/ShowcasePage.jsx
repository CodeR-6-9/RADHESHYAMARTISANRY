import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
// import { products } from "../../data/products"; // <--- REMOVED THIS
import "./ShowcasePage.css";

const ShowcasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- 1. LOCAL STATE ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStyle, setActiveStyle] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- 2. SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3. FETCH PRODUCT FROM DB ---
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fetch from Backend
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);

        // Set initial style if exists
        if (data.styles && data.styles.length > 0) {
          setActiveStyle(data.styles[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- 4. LOADING & ERROR STATES ---
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>✨ Loading Showcase...</h2>
      </div>
    );
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Product Not Found</h2>
      </div>
    );

  // --- SMART IMAGE LOGIC ---
  // The Convention: images[0] is Desktop (Horizontal), images[1] is Mobile (Vertical)

  // 1. Get images from active style OR fallback to main product images
  // Ensure we handle cases where 'images' might be a single string in DB or array
  const styleImages =
    activeStyle?.images ||
    (Array.isArray(product.images) ? product.images : [product.image]);

  // 2. Desktop: First image (Horizontal)
  const desktopImg = styleImages[0] || product.image;

  // 3. Mobile: Second image (Vertical), or fallback to Desktop
  const mobileImg = styleImages[1] || desktopImg;

  return (
    <div className="showcase-container">
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
          <span className="collection-tag">
            {product.category || "New Arrival"}
          </span>
          <h1 className="hero-title">{product.title}</h1>
          <p className="hero-price">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="showcase-details">
        <div className="details-grid">
          {/* Story Column */}
          <div className="story-column">
            <h3>The Story</h3>
            <p className="story-text">
              {product.description || "No description available."}
            </p>
            <div className="specs-list">
              <div className="spec-item">
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>
              <div className="spec-item">
                <span>Availability</span>
                <strong>{product.inStock ? "In Stock" : "Sold Out"}</strong>
              </div>
            </div>
          </div>

          {/* Selection Column */}
          <div className="selection-column">
            <h3>Select Variant</h3>
            {product.styles && product.styles.length > 0 ? (
              <div className="editorial-style-grid">
                {product.styles.map((style) => (
                  <div
                    key={style.name}
                    className={`editorial-style-card ${
                      activeStyle?.name === style.name ? "active" : ""
                    }`}
                    onClick={() => setActiveStyle(style)}
                  >
                    {/* Thumbnail is usually the vertical one (mobile friendly) */}
                    <img
                      src={
                        style.images?.[1] ||
                        style.images?.[0] ||
                        "https://via.placeholder.com/100"
                      }
                      alt={style.name}
                    />
                    <span className="style-name">{style.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#888", fontStyle: "italic" }}>
                Single Variant
              </p>
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
