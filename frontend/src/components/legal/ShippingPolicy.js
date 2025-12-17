import React from "react";
import "./Legal.css";

const ShippingPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Shipping & Delivery Policy</h1>
      <p>Last updated: December 2025</p>

      <h3>1. Shipping Costs</h3>
      <p>
        We offer <strong>FREE Shipping</strong> on all orders across India.
      </p>

      <h3>2. Dispatch Time</h3>
      <p>
        Orders are processed and dispatched within{" "}
        <strong>1-4 business days</strong> of payment confirmation.
      </p>

      <h3>3. Delivery Timeline</h3>
      <p>
        Once dispatched, the estimated delivery time is{" "}
        <strong>7-8 working days</strong> depending on your location.
      </p>

      <h3>4. Courier Partners</h3>
      <p>
        We use reliable courier partners to ensure safe delivery. You will
        receive tracking details via email/SMS once shipped.
      </p>
    </div>
  );
};

export default ShippingPolicy;
