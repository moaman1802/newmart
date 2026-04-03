import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ id, name, price, image, addToCart, wishlist, setWishlist, addToast }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (wishlist) {
      const exists = wishlist.some((item) => item.id === id);
      setIsWishlisted(exists);
    }
  }, [wishlist, id]);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== id));
      setIsWishlisted(false);
      addToast(`${name} removed from wishlist`, "info");
    } else {
      setWishlist([...wishlist, { id, name, price, image }]);
      setIsWishlisted(true);
      addToast(`${name} added to wishlist ❤️`, "wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price, image });
  };

  return (
    <div className="product-card">
      <div className="card-image" onClick={() => navigate(`/product/${id}`)}>
        <img src={image} alt={name} />
        <div className="card-actions">
          <button 
            className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
          >
            {isWishlisted ? "❤️" : "♡"}
          </button>
        </div>
      </div>
      
      <div className="card-info">
        <h3 className="product-name" onClick={() => navigate(`/product/${id}`)}>
          {name}
        </h3>
        <p className="product-price">₹{price}</p>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;