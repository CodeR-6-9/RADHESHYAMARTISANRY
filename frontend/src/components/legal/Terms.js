import React from "react";
import "./Legal.css";

const Terms = () => {
  return (
    <div className="legal-container">
      <h1>Terms & Conditions</h1>
      <p>
        Welcome to Radheshyam Artisanry. By using this website, you agree to the
        following terms:
      </p>
      <ul>
        <li>
          <strong>Usage:</strong> You agree to use this store for legitimate
          purposes only.
        </li>
        <li>
          <strong>Intellectual Property:</strong> All images and designs on this
          site are the property of Radheshyam Artisanry.
        </li>
        <li>
          <strong>Pricing:</strong> Prices are subject to change without notice.
        </li>
        <li>
          <strong>Liability:</strong> We are not liable for any damages arising
          from the use of this website.
        </li>
        <li>
          <strong>Jurisdiction:</strong> Any disputes are subject to the
          exclusive jurisdiction of the courts in Varanasi, Uttar Pradesh.
        </li>
      </ul>
    </div>
  );
};

export default Terms;
