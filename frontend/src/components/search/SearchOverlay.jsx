import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchOverlay.css";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // Handle Search Submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Go to the results page created in Step 1
      navigate(`/search?q=${encodeURIComponent(text)}`);
      onClose(); // Close the overlay
      setText(""); // Clear text
    }
  };

  // Close on "Escape" key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay-container" onClick={onClose}>
      <div className="search-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-overlay-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Type to search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
            <button type="submit" className="submit-arrow-btn">
              →
            </button>
          </div>
        </form>

        <p className="search-hint">Press Enter to search</p>
      </div>
    </div>
  );
};

export default SearchOverlay;
