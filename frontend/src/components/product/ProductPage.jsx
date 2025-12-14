import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import "./ProductPage.css";

// --- Breadcrumbs ---
const Breadcrumbs = ({ category, title }) => {
  const catName = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link> /
      <Link to={`/category/${category}`}> {catName}</Link> /
      <span> {title}</span>
    </div>
  );
};

// --- Gallery ---
const ProductGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={`gallery-grid ${images.length === 1 ? "single-view" : ""}`}>
      {images.map((imgSrc, index) => (
        <div key={index} className="image-wrapper">
          <img src={imgSrc} alt={`Product View ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

// --- Style Selector ---
const StyleSelector = ({ styles, selectedStyle, onSelect, productImages }) => {
  if (!selectedStyle) return null;

  return (
    <div className="selector-group">
      <p className="label">
        Style: <span style={{ fontWeight: 600 }}>{selectedStyle.name}</span>
      </p>

      <div className="style-image-grid">
        {styles.map((styleItem, index) => {
          const displayImage =
            (styleItem.images && styleItem.images[0]) ||
            productImages[index % productImages.length];

          return (
            <div
              key={styleItem.name}
              className={`style-image-card ${
                selectedStyle.name === styleItem.name ? "active" : ""
              }`}
              onClick={() => onSelect(styleItem)}
              title={styleItem.name}
            >
              <img src={displayImage} alt={styleItem.name} />
              {selectedStyle.name === styleItem.name && (
                <div className="selected-overlay">✓</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Related Products ---
const RelatedProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  const { displayProducts, sectionTitle } = useMemo(() => {
    const TARGET_COUNT = 4;
    let sameCategory = products.filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    );

    sameCategory = sameCategory.sort(() => 0.5 - Math.random());

    let finalSelection = [];
    let title = `More from ${
      currentProduct.category.charAt(0).toUpperCase() +
      currentProduct.category.slice(1)
    }`;

    if (sameCategory.length >= 3) {
      finalSelection = sameCategory.slice(0, TARGET_COUNT);
    } else {
      title = "You Might Also Like";
      finalSelection = [...sameCategory];
      let otherProducts = products.filter(
        (p) => p.category !== currentProduct.category
      );
      otherProducts = otherProducts.sort(() => 0.5 - Math.random());
      const needed = TARGET_COUNT - finalSelection.length;
      finalSelection = [...finalSelection, ...otherProducts.slice(0, needed)];
    }

    return { displayProducts: finalSelection, sectionTitle: title };
  }, [currentProduct]);

  if (displayProducts.length === 0) return null;

  return (
    <div className="related-section">
      <h3 className="related-title">{sectionTitle}</h3>
      <div className="related-grid">
        {displayProducts.map((item) => (
          <div
            key={item.id}
            className="related-card"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="related-img-box">
              <img src={item.image} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <p>₹{item.price.toLocaleString("en-IN")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Info Panel ---
const ProductInfoPanel = ({ product, activeStyle, onStyleSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, activeStyle ? activeStyle.name : "Default", null);
  };

  const fullText = product.description;
  const limit = 150;
  const isLongText = fullText.length > limit;
  const content =
    isExpanded || !isLongText ? fullText : fullText.slice(0, limit) + "...";

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <section className="product-details">
      <div className="header-row">
        <h1>{product.title}</h1>
      </div>

      <div className="price-block">
        <span className="current-price">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        <span className="original-price">
          ₹{product.originalPrice.toLocaleString("en-IN")}
        </span>
        <span className="discount-tag">({discount}% OFF)</span>
      </div>
      <p className="tax-note">Inclusive of all taxes</p>

      <div className="reviews">
        ★★★★★{" "}
        <span className="review-count">{product.reviews.count} Reviews</span>
      </div>

      {/* UPDATED: Wrapped in desktop-only class */}
      {product.styles && (
        <div className="desktop-style-selector">
          <StyleSelector
            styles={product.styles}
            selectedStyle={activeStyle}
            onSelect={onStyleSelect}
            productImages={product.images}
          />
        </div>
      )}

      <p className="description">
        {content}
        {isLongText && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-btn"
          >
            {isExpanded ? " Read Less" : " Read More"}
          </span>
        )}
      </p>

      <button className="add-to-bag-btn" onClick={handleAddToCart}>
        Add to Bag - ₹{product.price.toLocaleString("en-IN")}
      </button>

      {/* Trust Badges */}
      <div className="trust-badges-minimal">
        <div className="tb-item">
          <span className="tb-icon">📦</span>
          <span className="tb-text">Free Shipping</span>
        </div>
        <div className="tb-line"></div>
        <div className="tb-item">
          <span className="tb-icon">🔒</span>
          <span className="tb-text">Secure Checkout</span>
        </div>
        <div className="tb-line"></div>
        <div className="tb-item">
          <span className="tb-icon">✨</span>
          <span className="tb-text">Authentic</span>
        </div>
      </div>
    </section>
  );
};

// --- Main Component ---
const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // Initialize activeStyle safely
  const [activeStyle, setActiveStyle] = useState(
    product && product.styles ? product.styles[0] : null
  );

  const [currentGallery, setCurrentGallery] = useState(
    product && product.images ? product.images : []
  );

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveStyle(product.styles ? product.styles[0] : null);
      setCurrentGallery(product.images);
    }
  }, [id, product]);

  const handleStyleSelect = (newStyle) => {
    setActiveStyle(newStyle);
    if (newStyle.images && newStyle.images.length > 0) {
      setCurrentGallery(newStyle.images);
    } else {
      setCurrentGallery(product.images);
    }
  };

  if (!product) {
    return (
      <div
        className="main-container"
        style={{ paddingTop: "150px", textAlign: "center" }}
      >
        <h2>Product not found!</h2>
        <button
          className="add-to-bag-btn"
          style={{ width: "200px" }}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Breadcrumbs category={product.category} title={product.title} />

      <div className="page-layout">
        <ProductGallery images={currentGallery} />

        {/* NEW: Mobile-Only Style Selector (Between Images and Info) */}
        {product.styles && (
          <div className="mobile-style-selector">
            <StyleSelector
              styles={product.styles}
              selectedStyle={activeStyle}
              onSelect={handleStyleSelect}
              productImages={product.images}
            />
          </div>
        )}

        <ProductInfoPanel
          product={product}
          activeStyle={activeStyle}
          onStyleSelect={handleStyleSelect}
        />
      </div>

      <RelatedProducts currentProduct={product} />
    </div>
  );
};

export default ProductPage;
