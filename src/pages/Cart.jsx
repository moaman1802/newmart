import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart, addToast }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = (item.quantity || 1) + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id, name) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast(`${name} removed from cart`, "info");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <span className="cart-empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <button className="shop-now-btn" onClick={() => navigate("/")}>
            SHOP NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Cart</h1>
        <p>{totalItems} items</p>
      </div>

      <div className="cart-container">
        <div className="cart-items-section">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>

                <div className="item-actions">
                  <div className="quantity-selector">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity || 1}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id, item.name)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <p>₹{item.price * (item.quantity || 1)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>PRICE DETAILS</h3>
          <div className="summary-row">
            <span>Total MRP</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span className="discount-text">- ₹0</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className="free-text">FREE</span>
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            PROCEED TO CHECKOUT
          </button>
          <p className="savings-text">
            You will save ₹0 on this order
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;