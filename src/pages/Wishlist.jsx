import React from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = ({ wishlist, setWishlist, addToCart, addToast }) => {
  const navigate = useNavigate();

  const removeFromWishlist = (id, name) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    addToast(`${name} removed from wishlist`, "info");
  };

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id, item.name);
    addToast(`${item.name} moved to cart 🛒`, "cart");
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty-content">
          <span className="wishlist-empty-icon">❤️</span>
          <h2>Your Wishlist is empty</h2>
          <p>Save your favorite items here</p>
          <button className="shop-now-btn" onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlist.length} items</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <div className="wishlist-image" onClick={() => navigate(`/product/${item.id}`)}>
              <img src={item.image} alt={item.name} />
              <button 
                className="remove-wishlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item.id, item.name);
                }}
              >
                ✕
              </button>
            </div>

            <div className="wishlist-info">
              <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
              <p className="wishlist-price">₹{item.price}</p>
              
              <button 
                className="move-to-cart-btn"
                onClick={() => moveToCart(item)}
              >
                MOVE TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;    