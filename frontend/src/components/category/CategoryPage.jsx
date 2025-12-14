import React, { useEffect } from "react"; // 1. Import useEffect
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "./CategoryPage.css";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // --- FIX: Scroll to top when this page loads or category changes ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  const pageTitle =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="category-page-container">
      {/* Header */}
      <div className="cat-header">
        <span className="breadcrumb" onClick={() => navigate("/")}>
          HOME / {pageTitle.toUpperCase()}
        </span>
        <h1 className="cat-title">{pageTitle}</h1>
        <p className="cat-subtitle">
          {filteredProducts.length} timeless pieces curated for you
        </p>
      </div>

      {/* Grid */}
      <div className="cat-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="cat-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image Section (Vertical) */}
              <div className="image-wrapper">
                <img src={product.image} alt={product.title} />

                {/* Hover Button */}
                <div className="overlay-btn">View Details</div>
              </div>

              {/* Minimal Text Section */}
              <div className="info-section">
                <h3>{product.title}</h3>
                <div className="price-tag">
                  ₹{product.price.toLocaleString("en-IN")}
                  {product.originalPrice && (
                    <span className="original-price">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#888",
              marginTop: "50px",
            }}
          >
            <h3>Collection dropping soon.</h3>
            <p>Stay tuned for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
