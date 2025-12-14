import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

// --- 1. Helper: Load Razorpay Script Dynamically ---
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// --- 2. Helper Component (Input) ---
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <div className="input-group">
    {/* Label is hidden via CSS, but kept for accessibility */}
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
      required={required}
    />
  </div>
);

// --- 3. WhatsApp Fallback Modal ---
const WhatsAppModal = ({ isOpen, onClose, cartItems, total, formData }) => {
  if (!isOpen) return null;

  // Your Business Number
  const phoneNumber = "917985642474";

  let message = `Hi, I tried to place an order on the website, but the server wasn't responding.\n\n`;
  message += `*Order Details:*\n`;
  cartItems.forEach((item) => {
    message += `- ${item.title} (${item.selectedColor || "Standard"}) x ${
      item.quantity
    }\n`;
  });
  message += `\n*Total Amount:* ₹${total.toLocaleString("en-IN")}\n\n`;
  message += `*Shipping To:*\n${formData.name}\n${formData.address}, ${formData.city}\n${formData.phone}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="wa-modal-overlay">
      <div className="wa-modal-content">
        <div className="wa-icon-circle">⚠️</div>
        <h3>Server Not Responding</h3>
        <p>
          It seems our payment gateway is currently down. Don't worry! You can
          complete your order directly via WhatsApp.
        </p>

        <div className="wa-actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn-primary"
          >
            Create Order on WhatsApp 💬
          </a>
          <button onClick={onClose} className="wa-btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. Order Summary (Amazon-Style Accordion) ---
const OrderSummary = ({ cartItems, totals, onRemove, onUpdateQuantity }) => {
  // State to handle mobile toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="summary-panel">
      {/* MOBILE TOGGLE HEADER (Visible only on Mobile via CSS) */}
      <div className="summary-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className="toggle-left">
          <span className="toggle-text">
            {isOpen ? "Hide order summary" : "Show order summary"}
          </span>
          <span className={`arrow-icon ${isOpen ? "open" : ""}`}>&#9660;</span>
        </div>
        <div className="toggle-right">
          <span className="toggle-total">
            ₹{totals.total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* COLLAPSIBLE CONTENT CONTAINER */}
      <div className={`summary-content ${isOpen ? "expanded" : ""}`}>
        {/* Desktop Title */}
        <h3 className="desktop-title">Order Summary</h3>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.uniqueId || item.id} className="summary-item">
              {/* Image Box */}
              <div className="item-image-box">
                <img
                  src={Array.isArray(item.images) ? item.images[0] : item.image}
                  alt={item.title}
                />
                <span className="qty-badge-mobile">{item.quantity}</span>
              </div>

              {/* Details & Qty Controls */}
              <div className="item-details">
                <p className="item-name">{item.title}</p>
                <p className="item-variant">
                  {item.selectedColor}
                  {item.selectedSize ? ` / ${item.selectedSize}` : ""}
                </p>

                {/* Quantity Controls */}
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.uniqueId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-text">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.uniqueId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.uniqueId)}
                >
                  Remove
                </button>
              </div>

              {/* Price */}
              <p className="item-price">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="cost-breakdown">
          <div className="row">
            <span>Subtotal</span>
            <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="row">
            <span>Shipping</span>
            <span style={{ color: "#2e8b57", fontWeight: "600" }}>Free</span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>₹{totals.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 5. Checkout Form ---
const CheckoutForm = ({
  onSubmit,
  total,
  isProcessing,
  formData,
  setFormData,
}) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Contact Information</h2>

        {/* Full Width Inputs (Stacked) */}
        <InputField
          label="Full Name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <h2>Shipping Address</h2>
        <InputField
          label="Address"
          name="address"
          placeholder="Address (House No, Street)"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="Zip Code"
          name="zip"
          placeholder="Zip Code"
          value={formData.zip}
          onChange={handleChange}
        />
      </div>

      <div className="payment-notice">
        <p>
          🔒 You will be redirected to Razorpay's secure gateway to complete
          your payment.
        </p>
      </div>

      <button type="submit" className="pay-button" disabled={isProcessing}>
        {isProcessing
          ? "Connecting to Payment Gateway..."
          : `Pay Securely ₹${total.toLocaleString("en-IN")}`}
      </button>
    </form>
  );
};

// --- 6. Main Page Component ---
const CheckoutPage = () => {
  const { cartItems, getCartTotal, removeFromCart, clearCart, updateQuantity } =
    useCart();
  const totals = getCartTotal();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-checkout">
        <div className="empty-box">
          <h2>Your bag is empty</h2>
          <p>You removed all items from your cart.</p>
          <button
            className="pay-button"
            onClick={() => navigate("/")}
            style={{ marginTop: "20px", maxWidth: "300px" }}
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totals.total }),
      });
      if (!response.ok) throw new Error("Server Error");
      const order = await response.json();
      if (!order || !order.id) throw new Error("Invalid Order ID");

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID_HERE",
        amount: order.amount,
        currency: "INR",
        name: "Radheshyam Artisanry",
        description: "Handcrafted Luxury",
        order_id: order.id,
        handler: async function (response) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const result = await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(verifyData),
          });
          const res = await result.json();
          if (res.success) {
            clearCart();
            navigate("/success");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#483426" },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
      setShowWaModal(true);
    }
  };

  return (
    <div className="checkout-container">
      <WhatsAppModal
        isOpen={showWaModal}
        onClose={() => setShowWaModal(false)}
        cartItems={cartItems}
        total={totals.total}
        formData={formData}
      />

      <div className="checkout-layout">
        <div className="main-content">
          <h1 className="page-title">Checkout</h1>
          <CheckoutForm
            onSubmit={handlePayment}
            total={totals.total}
            isProcessing={isProcessing}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <aside className="sidebar">
          <OrderSummary
            cartItems={cartItems}
            totals={totals}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
