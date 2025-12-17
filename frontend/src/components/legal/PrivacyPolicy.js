import React from "react";
import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p>
        At Radheshyam Artisanry, we are committed to protecting your privacy.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We collect your name, address, email, and phone number solely for the
        purpose of processing your order and delivery.
      </p>

      <h3>2. Data Sharing</h3>
      <p>
        We do not share your personal data with third parties, except for our
        logistics partners (courier services) to fulfill delivery.
      </p>

      <h3>3. Payments</h3>
      <p>
        All payments are processed securely via Razorpay. We do not store your
        card or banking details on our servers.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
