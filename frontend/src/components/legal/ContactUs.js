import React from "react";
import "./Legal.css";

const ContactUs = () => {
  return (
    <div className="legal-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or concerns, please reach out to us using the
        details below:
      </p>

      <div className="contact-details">
        <h3>Radheshyam Artisanry</h3>
        <p>
          <strong>Address:</strong>
          <br />
          B37/177 AK 15A Prakash Puri Colony,
          <br />
          Badi Gaibi, Varanasi, Uttar Pradesh, India
        </p>

        <p>
          <strong>Phone:</strong> +91 79856 42474
        </p>
        <p>
          <strong>Email:</strong> radheshyamartisanry@gmail.com
        </p>
        <p>
          <strong>Operating Hours:</strong> Mon - Sat (10:00 AM - 6:00 PM)
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
