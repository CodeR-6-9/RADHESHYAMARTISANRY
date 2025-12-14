import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

// Placeholder image
import bigphoto from "../../assets/bigphoto.jpg";
import nameplate from "../../assets/nameplate.jpeg";
import wallhanging from "../../assets/wallhanging.jpeg";
import planter from "../../assets/planter.jpeg";
import diya from "../../assets/diya.jpeg";
// --- 1. CATEGORY DATA ---
const categoriesData = [
  {
    id: "cat1",
    title: "Crafted Planters",
    linkKey: "planter",
    image: planter,
    desc: "Dreamy handcrafted pots designed to enchant your space",
  },
  {
    id: "cat2",
    title: "Enchanted Hangings",
    linkKey: "hangings",
    image: wallhanging,
    desc: "Modition Lippan artistry reimagined for modern interiors",
  },
  {
    id: "cat3",
    title: "Home Labels",
    linkKey: "home lable",
    image: nameplate,
    desc: "Premium customised nameplates crafted for lasting impressions",
  },
  {
    id: "cat4",
    title: "Jyoti Holders",
    linkKey: "jyoti holders",
    image: diya,
    desc: "Artisanal lamps made to enhance festive moments and everyday ambience.",
  },
];

// --- 2. POPUP DATA ---
const featureContent = {
  "High Quality": {
    title: "Crafted with Lasting Quality",
    text: "Each décor piece is made using carefully selected materials and fine craftsmanship to ensure durability, detail, and a flawless finish that stands the test of time.",
  },
  "Premium Design": {
    title: "Artistry Meets Elegant Design",
    text: "Our designs blend traditional artisan skills with contemporary aesthetics, creating décor pieces that elevate interiors with a luxurious and refined appeal.",
  },
  Versatile: {
    title: "Perfect for Every Space",
    text: "Designed to complement homes, offices, hotels, and gifting needs, our decorative items adapt beautifully to modern, classic, and spiritual interiors alike.",
  },
  "Learn More": {
    title: "Rooted in Artisan Heritage",
    text: "RADHESHYAM ARTISANRY celebrates skilled craftsmanship, thoughtful design, and attention to detail—bringing meaningful décor that tells a story into every space.",
  },
};

// --- 3. COMPONENTS ---

// Overlay Component
function FeatureOverlay({ featureKey, onClose }) {
  if (!featureKey) return null;
  const content = featureContent[featureKey];

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <div className="overlay-scroll-content">
          <h3>{content?.title || featureKey}</h3>
          <p>{content?.text || "Details coming soon..."}</p>
        </div>
      </div>
    </div>
  );
}

// Hero Image
function Pic() {
  return <img src={bigphoto} alt="Description" className="my-photo" />;
}

// Nav Buttons
function Navitems({ children, onClick }) {
  return (
    <li className="feat" onClick={onClick}>
      {children}
    </li>
  );
}

function Navbar({ onFeatureClick }) {
  return (
    <nav>
      <ul>
        <Navitems onClick={() => onFeatureClick("High Quality")}>
          High Quality
        </Navitems>
        <Navitems onClick={() => onFeatureClick("Premium Design")}>
          Premium Design
        </Navitems>
        <Navitems onClick={() => onFeatureClick("Versatile")}>
          Versatile
        </Navitems>
        <Navitems onClick={() => onFeatureClick("Learn More")}>
          Learn More
        </Navitems>
      </ul>
    </nav>
  );
}

// Right Text Section
function RightText({ onFeatureClick }) {
  return (
    <div className="rt">
      <div className="right-text">Timeless Design,</div>
      <div className="right-text2">Premium Material</div>
      <div className="right-text3">
        Whether you love modern minimalism, timeless
      </div>
      <div className="right-text4">classics, or bold statement pieces.</div>
      <div className="navi">
        <Navbar onFeatureClick={onFeatureClick} />
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({ title, image, linkKey, desc }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/category/${linkKey}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} style={{ filter: "brightness(0.9)" }} />

      <div
        className="product-info"
        style={{ textAlign: "center", background: "rgba(0,0,0,0.6)" }}
      >
        <h3 style={{ fontSize: "2rem", marginBottom: "5px", color: "white" }}>
          {title}
        </h3>
        <p
          className="product-details"
          style={{ fontSize: "1rem", color: "#ddd" }}
        >
          {desc}
        </p>

        <div
          style={{
            marginTop: "15px",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderBottom: "1px solid white",
            display: "inline-block",
            paddingBottom: "3px",
            color: "white",
          }}
        >
          Explore Collection
        </div>
      </div>
    </div>
  );
}

// Grid Wrapper
function CategoryGrid() {
  return (
    <div className="product-grid">
      {categoriesData.map((cat) => (
        <CategoryCard
          key={cat.id}
          title={cat.title}
          image={cat.image}
          linkKey={cat.linkKey}
          desc={cat.desc}
        />
      ))}
    </div>
  );
}

// --- MAIN COMPONENT ---
function Main() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <FeatureOverlay
        featureKey={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />

      <header className="hero-section">
        <Pic />
        <RightText onFeatureClick={setSelectedFeature} />
      </header>

      <main>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              /* FIX: Added 'Playfair Display' for elegance */
              fontFamily: '"Playfair Display", "Poppins", serif',
              /* FIX: Use clamp() so text shrinks on mobile but stays big on desktop */
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "var(--text-color)",
              margin: "0",
              padding: "0 10px", // Safety padding for small screens
              fontWeight: "500",
            }}
          >
            Shop by Category
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "var(--text-color)",
              margin: "15px auto",
              opacity: 0.8,
            }}
          ></div>
        </div>

        {/* Display Categories */}
        <CategoryGrid />
      </main>
    </>
  );
}

export default Main;
