import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if we have a token (user is logged in)
    if (token) {
      fetch("http://localhost:5000/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return <div className="loading-msg">Loading your orders...</div>;

  if (!orders.length)
    return (
      <div className="no-orders">
        <h2>No orders found</h2>
        <p>Looks like you haven't bought anything yet.</p>
      </div>
    );

  return (
    <div className="my-orders-container">
      <h1>My Order History</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <div className="order-date">
              <span>Placed on</span>
              <br />
              <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
            </div>
            <div className="order-total">
              <span>Total</span>
              <br />
              <strong>₹{order.amount.toLocaleString("en-IN")}</strong>
            </div>
            <div className="order-id">
              <span>Order ID</span>
              <br />
              <small>#{order.orderId ? order.orderId.slice(-6) : "---"}</small>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item-row">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">{item.title}</span>
                <span className="item-variant">({item.variant})</span>
              </div>
            ))}
          </div>

          <div className="order-footer">
            <span className="status-label">Status: </span>
            <span className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyOrders;
