import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductPage.css";

// --- Breadcrumbs ---
const Breadcrumbs = ({ category, title }) => {
  const catName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Shop";
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
  const imageList = Array.isArray(images) ? images : [images];

  return (
    <div
      className={`gallery-grid ${imageList.length === 1 ? "single-view" : ""}`}
    >
      {imageList.map((imgSrc, index) => (
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
            productImages[index % productImages.length] ||
            productImages;

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

// --- RELATED PRODUCTS (Now Working + Matches Old CSS) ---
const RelatedProducts = ({ currentCategory, currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. Fetch all products
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // 2. Filter: Same Category & Not Current Product
        const related = data.filter(
          (p) => p.category === currentCategory && p._id !== currentProductId
        );
        // 3. Limit to 4
        setProducts(related.slice(0, 4));
      })
      .catch((err) => console.error("Error loading related:", err));
  }, [currentCategory, currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="related-section">
      <h3 className="related-title">You Might Also Like</h3>
      <div className="related-grid">
        {products.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="related-card"
          >
            {/* Wrapper div matches 'related-img-box' from OLD CSS */}
            <div className="related-img-box">
              <img src={item.image} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <p>₹{item.price.toLocaleString("en-IN")}</p>
          </Link>
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

  const fullText = product.description || "No description available.";
  const limit = 150;
  const isLongText = fullText.length > limit;
  const content =
    isExpanded || !isLongText ? fullText : fullText.slice(0, limit) + "...";

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <section className="product-details">
      <div className="header-row">
        <h1>{product.title}</h1>
      </div>

      <div className="price-block">
        <span className="current-price">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && (
          <>
            <span className="original-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="discount-tag">({discount}% OFF)</span>
          </>
        )}
      </div>
      <p className="tax-note">Inclusive of all taxes</p>

      <div className="reviews">
        ★★★★★{" "}
        <span className="review-count">
          {(product.reviews && product.reviews.count) || 12} Reviews
        </span>
      </div>

      {/* Desktop Selector */}
      {product.styles && product.styles.length > 0 && (
        <div className="desktop-style-selector">
          <StyleSelector
            styles={product.styles}
            selectedStyle={activeStyle}
            onSelect={onStyleSelect}
            productImages={
              product.images
                ? Array.isArray(product.images)
                  ? product.images
                  : [product.images]
                : []
            }
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
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStyle, setActiveStyle] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);

        // Smart Gallery Initialization
        let initialGallery = [];
        if (data.styles && data.styles.length > 0) {
          setActiveStyle(data.styles[0]);
          initialGallery = data.styles[0].images;
        } else if (data.images && data.images.length > 0) {
          initialGallery = data.images;
        } else {
          initialGallery = [data.image];
        }

        setCurrentGallery(initialGallery);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleStyleSelect = (newStyle) => {
    setActiveStyle(newStyle);
    if (newStyle.images && newStyle.images.length > 0) {
      setCurrentGallery(newStyle.images);
    } else {
      const images = product.image ? [product.image] : product.images || [];
      setCurrentGallery(images);
    }
  };

  if (loading)
    return (
      <div
        className="main-container"
        style={{ textAlign: "center", paddingTop: "150px" }}
      >
        <h2>✨ Loading...</h2>
      </div>
    );
  if (!product)
    return (
      <div
        className="main-container"
        style={{ textAlign: "center", paddingTop: "150px" }}
      >
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="main-container">
      <Breadcrumbs category={product.category} title={product.title} />

      <div className="page-layout">
        <ProductGallery images={currentGallery} />

        {product.styles && product.styles.length > 0 && (
          <div className="mobile-style-selector">
            <StyleSelector
              styles={product.styles}
              selectedStyle={activeStyle}
              onSelect={handleStyleSelect}
              productImages={currentGallery}
            />
          </div>
        )}

        <ProductInfoPanel
          product={product}
          activeStyle={activeStyle}
          onStyleSelect={handleStyleSelect}
        />
      </div>

      {/* Passing data to the working RelatedProducts component */}
      <RelatedProducts
        currentCategory={product.category}
        currentProductId={product._id}
      />
    </div>
  );
};

export default ProductPage;
