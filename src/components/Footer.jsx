import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - About */}
        <div className="footer-column">
          <h3>NEW MART</h3>
          <p>Your one-stop shop for fashion, electronics, and lifestyle products.</p>
          <div className="social-links">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/wishlist")}>Wishlist</li>
            <li onClick={() => navigate("/cart")}>Cart</li>
            <li onClick={() => navigate("/profile")}>My Profile</li>
          </ul>
        </div>

        {/* Column 3 - Categories */}
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
          </ul>
        </div>

        {/* Column 4 - Customer Service */}
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Returns & Exchange</li>
            <li>Shipping Policy</li>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 NEW MART. All rights reserved.</p>
        <div className="payment-icons">
          <span>💳</span>
          <span>📱</span>
          <span>💵</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;