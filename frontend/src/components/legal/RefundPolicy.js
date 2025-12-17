import React from "react";
import "./Legal.css";

const RefundPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Refund & Cancellation Policy</h1>

      <h3>1. Cancellation Policy</h3>
      <p>
        You can cancel your order{" "}
        <strong>only before it has been dispatched</strong>. Once the product is
        shipped, we cannot accept cancellations. To cancel, please contact us
        immediately on WhatsApp or Email.
      </p>

      <h3>2. Return Policy</h3>
      <p>
        We have a <strong>2-day return window</strong> from the date of
        delivery. We ONLY accept returns under the following conditions:
      </p>
      <ul>
        <li>
          The product was received in a <strong>damaged</strong> condition.
        </li>
        <li>
          The <strong>wrong product</strong> was delivered.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> accept returns for "change of mind" or
        "dislike of style/color".
      </p>

      <h3>3. Refund Process</h3>
      <p>
        Once we receive the returned item and verify the damage, we will
        initiate the refund within 48 hours. The amount will reflect in your
        original payment source within <strong>7 working days</strong>.
      </p>
    </div>
  );
};

export default RefundPolicy;
