import React, { useState } from "react";
import { Instagram } from "lucide-react"; // 1. Import the icon
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ WhatsApp Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "917985642474"; // WhatsApp number (no +)

    const message = `
📩 *New Website Enquiry*

👤 Name: ${formData.name}
📧 Email: ${formData.email}

📝 Message:
${formData.message}
    `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>
          We'd love to hear from you. Send us a message or visit our studio.
        </p>
      </div>

      <div className="contact-layout">
        {/* Left Column: Contact Info */}
        <div className="info-card">
          <h3>Contact Information</h3>

          <div className="info-item">
            <span className="icon">💌</span>
            <div>
              <h4>Email Us</h4>
              <p>radheshyamartisanry@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h4>Call Us</h4>
              <p>+91 79856 42474</p>
            </div>
          </div>

          <div className="social-links">
            <p>Follow our journey:</p>
            <div className="social-icons">
              {/* 2. Changed text to Icon here */}
              <a
                href="https://www.instagram.com/radheshyamartisanry/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram-icon-btn"
                aria-label="Visit our Instagram" // Added for accessibility
              >
                <Instagram size={28} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn">
              Send Message on WhatsApp 💬
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
