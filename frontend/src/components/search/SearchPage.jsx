import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "../category/CategoryPage.css"; // Reuse your existing styles

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (query) {
      const lowerQuery = query.toLowerCase();
      const results = products.filter((p) => {
        // Safe check for fields
        const title = p.title ? p.title.toLowerCase() : "";
        const category = p.category ? p.category.toLowerCase() : "";
        const desc = p.description ? p.description.toLowerCase() : "";

        return (
          title.includes(lowerQuery) ||
          category.includes(lowerQuery) ||
          desc.includes(lowerQuery)
        );
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  return (
    <div className="category-page-container">
      <div className="cat-header">
        <span className="breadcrumb" onClick={() => navigate("/")}>
          HOME / SEARCH RESULTS
        </span>
        <h1 className="cat-title">"{query}"</h1>
        <p className="cat-subtitle">
          We found {filteredProducts.length} results for your search
        </p>
      </div>

      <div className="cat-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="cat-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="image-wrapper">
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className="overlay-btn">View Details</div>
              </div>

              <div className="info-section">
                <h3>{product.title}</h3>
                <div className="price-tag">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="no-results"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h3>No matches found.</h3>
            <p>Try searching for "Planter" or "Cat".</p>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#483426",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
