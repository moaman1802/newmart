import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ addToast }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      addToast("Please login to view profile", "info");
      return;
    }

    const name = localStorage.getItem("userName") || "User";
    setUserName(name);

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse());
  }, [navigate, addToast]);

  const viewOrderDetails = (orderId) => {
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>👤</span>
        </div>
        <div className="profile-info">
          <h1>{userName}</h1>
          <p>{localStorage.getItem("userEmail") || "user@newmart.com"}</p>
        </div>
      </div>

      <div className="profile-section">
        <h2>My Orders</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <span>📦</span>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
            <button onClick={() => navigate("/")}>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card" onClick={() => viewOrderDetails(order.orderId)}>
                <div className="order-card-header">
                  <div>
                    <span className="order-id">Order #{order.orderId}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-total">₹{order.total}</div>
                </div>
                
                <div className="order-card-items">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="order-card-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <span>Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="more-items">+{order.items.length - 2} more items</div>
                  )}
                </div>
                
                <div className="order-card-footer">
                  <span className="payment-method">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : 
                     order.paymentMethod === "card" ? "Card Payment" : "UPI"}
                  </span>
                  <button className="view-details-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;