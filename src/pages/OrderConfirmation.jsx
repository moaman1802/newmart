import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = ({ addToast }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => o.orderId === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      addToast("Order not found", "error");
      navigate("/");
    }
  }, [orderId, navigate, addToast]);

  if (!order) {
    return (
      <div className="order-confirmation-loading">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="order-success-header">
        <div className="success-icon">✅</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for shopping with New Mart</p>
        <p className="order-id">Order ID: {order.orderId}</p>
      </div>

      <div className="order-details-container">
        <div className="order-info">
          <h3>Order Details</h3>
          <div className="info-row">
            <span>Order Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="info-row">
            <span>Payment Method:</span>
            <span>
              {order.paymentMethod === "cod" ? "Cash on Delivery" :
               order.paymentMethod === "card" ? "Credit/Debit Card" :
               "UPI"}
            </span>
          </div>
          <div className="info-row">
            <span>Total Amount:</span>
            <span className="total-amount">₹{order.total}</span>
          </div>
        </div>

        <div className="delivery-address">
          <h3>Delivery Address</h3>
          <p>{order.address.fullName}</p>
          <p>{order.address.address}</p>
          <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
          <p>Mobile: {order.address.mobile}</p>
        </div>

        <div className="order-items">
          <h3>Items Ordered</h3>
          {order.items.map((item) => (
            <div className="order-item-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="order-item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <div className="order-item-total">
                <p>₹{item.price * (item.quantity || 1)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-box">
          <div className="summary-row">
            <span>Total MRP</span>
            <span>₹{order.total}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>₹0</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>FREE</span>
          </div>
          <div className="summary-total">
            <span>Total Paid</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <button className="continue-shopping-btn" onClick={() => navigate("/")}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;