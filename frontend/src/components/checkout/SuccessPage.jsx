import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css"; // We will add simple styles below

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you for choosing Radheshyam Artisanry. <br />
          Your order has been successfully placed.
        </p>
        <button onClick={() => navigate("/")} className="home-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
