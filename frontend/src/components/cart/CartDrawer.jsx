import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartDrawer.css";

const CartDrawer = () => {
  // 1. Get updateQuantity from Context
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
                  <p className="variant">
                    {item.selectedColor} / {item.selectedSize}
                  </p>

                  <div className="price-row">
                    <p className="price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* 2. Quantity Controls */}
                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.uniqueId, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.uniqueId, item.quantity + 1)
                        }
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
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>

          {/* 3. Disable Logic */}
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0} // Logic to disable
            style={{
              opacity: cartItems.length === 0 ? 0.5 : 1,
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
