import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <span className="banner-badge">LIMITED TIME OFFER</span>
        <h1>BIG SALE</h1>
        <h2>Up to 50% OFF</h2>
        <p>On selected items • Free shipping on orders above ₹999</p>
        <button className="banner-btn">SHOP NOW →</button>
      </div>
      <div className="banner-offer">
        <div className="offer-tag">🔥 HOT DEAL</div>
      </div>
    </div>
  );
};

export default Banner;  