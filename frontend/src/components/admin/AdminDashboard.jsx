import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    thumbnail: "",
    imgDesktop: "",
    imgMobile: "",
  });

  // --- STYLE MANAGER STATE ---
  const [tempStyle, setTempStyle] = useState({
    name: "",
    imgDesktop: "",
    imgMobile: "",
  });
  const [addedStyles, setAddedStyles] = useState([]);

  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAdmin, token]);

  // --- API CALLS ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStyle = (e) => {
    e.preventDefault();
    if (!tempStyle.name || !tempStyle.imgDesktop || !tempStyle.imgMobile) {
      alert("Please fill all Style fields (Name + 2 Images)");
      return;
    }
    setAddedStyles([
      ...addedStyles,
      {
        name: tempStyle.name,
        images: [tempStyle.imgDesktop, tempStyle.imgMobile],
      },
    ]);
    setTempStyle({ name: "", imgDesktop: "", imgMobile: "" });
  };

  const removeStyle = (index) => {
    setAddedStyles(addedStyles.filter((_, i) => i !== index));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!window.confirm("Add this product to the live store?")) return;

    const finalProduct = {
      title: formData.title,
      price: formData.price,
      originalPrice: formData.originalPrice,
      category: formData.category,
      description: formData.description,
      image: formData.thumbnail,
      images: [formData.imgDesktop, formData.imgMobile],
      styles: addedStyles,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalProduct),
      });

      if (res.ok) {
        alert("✅ Product Added!");
        setFormData({
          title: "",
          price: "",
          originalPrice: "",
          category: "",
          description: "",
          thumbnail: "",
          imgDesktop: "",
          imgMobile: "",
        });
        setAddedStyles([]);
        fetchProducts();
      } else {
        alert("❌ Error adding product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("⚠️ Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  if (!isAdmin) return <div className="access-denied">🚫 Access Denied</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard 🛠️</h1>
        <div className="admin-tabs">
          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Inventory
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>
      </div>

      {/* --- TAB 1: PRODUCT MANAGER --- */}
      {activeTab === "products" && (
        <div className="fade-in">
          <div className="admin-content-grid">
            {/* LEFT: ADD FORM */}
            <div className="admin-card form-card">
              <h2>Add New Product</h2>
              <form onSubmit={handlePublish} className="admin-form">
                <div className="form-group">
                  <label>Basic Details</label>
                  <input
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="row-2">
                    <input
                      name="price"
                      type="number"
                      placeholder="Price (₹)"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      name="originalPrice"
                      type="number"
                      placeholder="Original Price (₹)"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    name="category"
                    placeholder="Category (e.g., planter)"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Product Description..."
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>1. Thumbnail (Shop Grid)</label>
                  <input
                    name="thumbnail"
                    placeholder="Square Image URL (/assets/...)"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>2. Default Showcase Images</label>
                  <div className="row-2">
                    <input
                      name="imgDesktop"
                      placeholder="Desktop (Horizontal)"
                      value={formData.imgDesktop}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      name="imgMobile"
                      placeholder="Mobile (Vertical)"
                      value={formData.imgMobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group style-group">
                  <label>3. Style Variants (Optional)</label>
                  <div className="style-adder">
                    <input
                      placeholder="Style Name (e.g. Ocean Green)"
                      value={tempStyle.name}
                      onChange={(e) =>
                        setTempStyle({ ...tempStyle, name: e.target.value })
                      }
                    />
                    <div className="row-2">
                      <input
                        placeholder="Style Photo 1 (Desktop)"
                        value={tempStyle.imgDesktop}
                        onChange={(e) =>
                          setTempStyle({
                            ...tempStyle,
                            imgDesktop: e.target.value,
                          })
                        }
                      />
                      <input
                        placeholder="Style Photo 2 (Mobile)"
                        value={tempStyle.imgMobile}
                        onChange={(e) =>
                          setTempStyle({
                            ...tempStyle,
                            imgMobile: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddStyle}
                      className="btn-secondary"
                    >
                      + Add Style
                    </button>
                  </div>

                  {addedStyles.length > 0 && (
                    <ul className="added-styles-list">
                      {addedStyles.map((s, i) => (
                        <li key={i}>
                          <span>
                            <b>{s.name}</b> (2 Images)
                          </span>
                          <button
                            type="button"
                            onClick={() => removeStyle(i)}
                            className="btn-xs-danger"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button type="submit" className="btn-primary full-width">
                  🚀 Publish Product
                </button>
              </form>
            </div>

            {/* RIGHT: INVENTORY LIST */}
            <div className="admin-card inventory-card">
              <h2>Inventory ({products.length})</h2>
              <div className="inventory-list">
                {products.map((p) => (
                  <div key={p._id} className="inventory-item">
                    <img src={p.image} alt={p.title} />
                    <div className="inv-info">
                      <h4>{p.title}</h4>
                      <p>₹{p.price}</p>
                      <small>{p.styles?.length || 0} Styles</small>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="btn-icon-danger"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: ORDER MANAGER --- */}
      {activeTab === "orders" && (
        <div className="orders-wrapper fade-in">
          <h2>Order History ({orders.length})</h2>

          <div className="orders-grid">
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order) => {
                // ⚡ FIX: Define data sources clearly
                const cust = order.customer || {};
                const items = order.items || [];

                return (
                  <div key={order._id} className="order-card-detailed">
                    <div className="order-header">
                      <span className="order-id">
                        ID: ...{order._id.slice(-6)}
                      </span>
                      <span
                        className={`status-badge ${
                          order.status?.toLowerCase() || "paid"
                        }`}
                      >
                        {order.status || "Paid"}
                      </span>
                    </div>

                    <div className="order-body">
                      <div className="customer-info">
                        <h4>Customer Details</h4>
                        <p>
                          <strong>Name:</strong> {cust.name || "Guest"}
                        </p>
                        <p>
                          <strong>Phone:</strong> {cust.phone || "N/A"}
                        </p>
                        <p>
                          <strong>Email:</strong> {cust.email || "N/A"}
                        </p>
                        <div className="address-box">
                          <strong>Address:</strong>
                          <br />
                          {cust.address || "No Address Provided"}
                          <br />
                          {cust.city ? `${cust.city}, ${cust.zip}` : ""}
                        </div>
                      </div>

                      <div className="items-info">
                        <h4>Items Ordered</h4>
                        <ul className="order-items-list">
                          {items.map((item, idx) => (
                            <li key={idx}>
                              {/* Add safe image check */}
                              {item.image && (
                                <img src={item.image} alt="thumb" />
                              )}
                              <div>
                                <span>{item.title}</span>
                                <small>
                                  Style:{" "}
                                  {item.variant ||
                                    item.selectedColor ||
                                    "Default"}
                                </small>
                                <small>
                                  Qty: {item.quantity} x ₹{item.price}
                                </small>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="order-footer">
                      <div className="order-date">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="order-total">
                        Total: ₹{order.amount?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
