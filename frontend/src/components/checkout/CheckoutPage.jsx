import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

// --- 1. Helper Component (Input) ---
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="input-group">
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
      required
    />
  </div>
);

// --- 2. Order Summary ---
const OrderSummary = ({ cartItems, totals, onRemove }) => {
  return (
    <div className="summary-panel">
      <h3>Order Summary</h3>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.uniqueId || item.id} className="summary-item">
            <div className="item-image-box">
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.image}
                alt={item.title}
              />
              <span className="qty-badge">{item.quantity}</span>
            </div>
            <div className="item-details">
              <p className="item-name">{item.title}</p>
              <p className="item-variant">
                {item.selectedColor} / {item.selectedSize}
              </p>
              <button
                className="remove-btn"
                onClick={() => onRemove(item.uniqueId)}
              >
                Remove
              </button>
            </div>
            <p className="item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="cost-breakdown">
        <div className="row">
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="row">
          <span>Shipping</span>
          <span>${totals.shipping.toFixed(2)}</span>
        </div>
        <div className="row">
          <span>Taxes</span>
          <span>${totals.tax.toFixed(2)}</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- 3. Checkout Form ---
const CheckoutForm = ({ onSubmit, total }) => {
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Contact Information</h2>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-section">
        <h2>Shipping Address</h2>
        <InputField
          label="Address"
          name="address"
          placeholder="123 Main St"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="form-row-split">
          <InputField
            label="City"
            name="city"
            placeholder="New York"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            label="Zip Code"
            name="zip"
            placeholder="10001"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-section">
        <h2>Payment</h2>
        <InputField
          label="Card Number"
          name="card"
          placeholder="0000 0000 0000 0000"
          value={formData.card}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="pay-button">
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
};

// --- 4. Main Page Component ---
const CheckoutPage = () => {
  const { cartItems, getCartTotal, removeFromCart } = useCart();
  const totals = getCartTotal();
  const navigate = useNavigate(); // Hook for redirection

  // --- HANDLE EMPTY CART ---
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

  // --- PAYMENT HANDLER ---
  const handlePayment = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totals.total }),
      });
      const order = await response.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID_HERE",
        amount: order.amount,
        currency: order.currency,
        name: "Radheshyam Artisanry",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
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
              alert("Payment Verified & Successful!");
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment successful but verification failed.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: formData.email,
          contact: "9999999999",
        },
        theme: { color: "#483426" },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with the payment server.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-layout">
        <div className="main-content">
          <h1 className="page-title">Checkout</h1>
          <CheckoutForm onSubmit={handlePayment} total={totals.total} />
        </div>
        <aside className="sidebar">
          <OrderSummary
            cartItems={cartItems}
            totals={totals}
            onRemove={removeFromCart}
          />
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
