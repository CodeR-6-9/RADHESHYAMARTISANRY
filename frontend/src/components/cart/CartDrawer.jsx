import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartDrawer.css";

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const navigate = useNavigate();
  const totals = getCartTotal();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <div className="backdrop" onClick={() => setIsCartOpen(false)}></div>

      <div className="cart-drawer">
        <div className="drawer-header">
          <h2>Your Bag ({cartItems.length})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>

        <div className="drawer-items">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <p>Your bag is empty.</p>
              <button onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.uniqueId} className="drawer-item">
                <img
                  src={Array.isArray(item.images) ? item.images[0] : item.image}
                  alt={item.title}
                />
                <div className="item-info">
                  <h4>{item.title}</h4>

                  {/* Updated Variant Display */}
                  <p className="variant">
                    {item.selectedColor}
                    {item.selectedSize ? ` / ${item.selectedSize}` : ""}
                  </p>

                  <div className="price-row">
                    <p className="price">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    {/* Quantity Controls */}
                    <div
                      className="qty-controls"
                      style={{
                        marginTop: "0",
                        background: "#f5f5f5",
                        padding: "2px 5px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.uniqueId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        style={{ fontSize: "1.2rem", padding: "0 8px" }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.uniqueId, item.quantity + 1)
                        }
                        style={{ fontSize: "1rem", padding: "0 8px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="remove-link"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            style={{
              opacity: cartItems.length === 0 ? 0.6 : 1,
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {cartItems.length === 0 ? "Bag is Empty" : "Checkout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
