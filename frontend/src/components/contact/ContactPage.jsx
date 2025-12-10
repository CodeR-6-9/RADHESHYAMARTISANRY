import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    alert(`Thank you, ${formData.name}! We have received your message.`);
    setFormData({ name: "", email: "", message: "" }); // Reset form
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

          {/* <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h4>Visit Us</h4>
              <p>
                123 Artisan Street, Civil Lines
                <br />
                Prayagraj, UP, 211001
              </p>
            </div>
          </div> */}

          <div className="info-item">
            <span className="icon">💌</span>
            <div>
              <h4>Email Us</h4>
              <p>hello@radheshyam.com</p>
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
              <span>Instagram</span> • <span>Facebook</span> •{" "}
              <span>Twitter</span>
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
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
