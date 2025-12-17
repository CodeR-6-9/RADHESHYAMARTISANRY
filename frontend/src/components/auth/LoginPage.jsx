import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // 1. Import Google Button
import "./Auth.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, googleLogin } = useAuth(); // 2. Get googleLogin function
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(from);
    } else {
      alert(result.msg);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {from === "/checkout" && (
          <p
            style={{
              color: "#d97706",
              fontWeight: "bold",
              marginBottom: "15px",
              fontSize: "0.9rem",
            }}
          >
            You need to login to place an order.
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>

        {/* --- GOOGLE LOGIN SECTION --- */}
        <div
          style={{
            margin: "25px 0",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}
        >
          <p
            style={{ marginBottom: "15px", color: "#888", fontSize: "0.85rem" }}
          >
            Or continue with
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const result = await googleLogin(credentialResponse.credential);
                if (result.success) {
                  navigate(from); // Go to checkout/home after Google login
                } else {
                  alert("Google Login Failed");
                }
              }}
              onError={() => {
                console.log("Login Failed");
                alert("Google Login Failed");
              }}
              theme="outline"
              size="large"
              width="300"
            />
          </div>
        </div>
        {/* ----------------------------- */}

        <p onClick={() => navigate("/signup")}>New here? Create account</p>
      </form>
    </div>
  );
};
export default LoginPage;
