import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import "./ProductPage.css";

// --- Sub-Components ---
const ProductGallery = ({ images }) => {
  return (
    <div className="gallery-grid">
      {images.map((imgSrc, index) => (
        <div key={index} className="image-wrapper">
          <img src={imgSrc} alt={`View ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

const ColorSelector = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="selector-group">
      <p className="label">
        Color: <span>{selectedColor.name}</span>
      </p>
      <div className="swatches">
        {colors.map((color) => (
          <button
            key={color.name}
            style={{ backgroundColor: color.hex }}
            className={`swatch ${
              selectedColor.name === color.name ? "active" : ""
            }`}
            onClick={() => onSelect(color)}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

const SizeSelector = ({ sizes, selectedSize, onSelect }) => {
  return (
    <div className="selector-group">
      <div className="size-header">
        <p>This runs big, we recommend sizing down.</p>
        <span className="link">Size Guide</span>
      </div>
      <select
        value={selectedSize}
        onChange={(e) => onSelect(e.target.value)}
        className="size-dropdown"
      >
        <option value="" disabled>
          Select your size
        </option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

// --- Related Products Component ---
const RelatedProducts = ({ currentId }) => {
  const navigate = useNavigate();

  // Filter out the current product
  const related = products.filter((p) => p.id !== currentId);

  return (
    <div className="related-section">
      <h3 className="related-title">You Might Also Like</h3>
      <div className="related-grid">
        {related.map((item) => (
          <div
            key={item.id}
            className="related-card"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="related-img-box">
              <img src={item.image} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- UPDATED Info Panel (With Read More Logic) ---
const ProductInfoPanel = ({ product }) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [activeSize, setActiveSize] = useState("");

  // 1. NEW STATE: Track if description is open
  const [isExpanded, setIsExpanded] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!activeSize) {
      alert("Please select a size!");
      return;
    }
    // Add to cart (Context handles drawer opening)
    addToCart(product, activeColor.name, activeSize);
  };

  // 2. LOGIC: How to display the text
  const fullText = product.description;
  const limit = 150; // Character limit
  const isLongText = fullText.length > limit;

  // If expanded or short, show everything. Otherwise, slice it.
  const content =
    isExpanded || !isLongText ? fullText : fullText.slice(0, limit) + "...";

  return (
    <section className="product-details">
      <div className="header-row">
        <h1>{product.title}</h1>
      </div>
      <div className="reviews">
        ★★★★★{" "}
        <span className="review-count">{product.reviews.count} Reviews</span>
      </div>

      {/* 3. UPDATED DESCRIPTION BLOCK */}
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

      <ColorSelector
        colors={product.colors}
        selectedColor={activeColor}
        onSelect={setActiveColor}
      />
      <SizeSelector
        sizes={product.sizes}
        selectedSize={activeSize}
        onSelect={setActiveSize}
      />

      <button className="add-to-bag-btn" onClick={handleAddToCart}>
        Add to Bag ${product.price}
      </button>
    </section>
  );
};

// --- Main Page Component ---
const ProductPage = () => {
  const { id } = useParams();

  // SCROLL FIX: When ID changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="main-container" style={{ paddingTop: "150px" }}>
        <h2>Product not found!</h2>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="page-layout">
        <ProductGallery images={product.images} />
        <ProductInfoPanel product={product} />
      </div>

      {/* Related Section */}
      <RelatedProducts currentId={product.id} />
    </div>
  );
};

export default ProductPage;
