import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { products } from "../../data/products"; // <--- DELETED THIS!
import "./CategoryPage.css";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // --- 1. STATE FOR LIVE DATA ---
  const [products, setProducts] = useState([]); // Empty array to start
  const [loading, setLoading] = useState(true); // Loading state

  // --- 2. FETCH DATA FROM BACKEND ---
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products from your Server
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data); // Store DB data in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]); // Re-run if category changes

  // --- 3. FILTER LIVE DATA ---
  // We compare URL category with Product category (ignoring case)
  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === categoryName?.toLowerCase()
  );

  const pageTitle =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // --- 4. LOADING SCREEN ---
  if (loading) {
    return (
      <div
        className="category-page-container"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        <h2>✨ Loading Collection...</h2>
      </div>
    );
  }

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
              key={product._id} // <--- CHANGED from .id to ._id
              className="cat-card"
              onClick={() => navigate(`/product/${product._id}`)} // <--- CHANGED here too
            >
              {/* Image Section (Vertical) */}
              <div className="image-wrapper">
                {/* Fallback image if URL is broken */}
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.title}
                />

                {/* Hover Button */}
                <div className="overlay-btn">View Details</div>
              </div>

              {/* Minimal Text Section */}
              <div className="info-section">
                <h3>{product.title}</h3>
                <div className="price-tag">
                  ₹{product.price.toLocaleString("en-IN")}
                  {/* Only show original price if it exists in DB */}
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
            <p>We are currently crafting items for this category.</p>
            {/* Optional: Add a button to go back */}
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#333",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Browse All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
