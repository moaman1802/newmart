import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cart, totalPrice, clearCart, addToast }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    address: "",
    city: "",
    state: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (step === 1) {
      if (address.fullName && address.mobile && address.pincode && address.address && address.city && address.state) {
        setStep(2);
      } else {
        addToast("Please fill all address details", "error");
      }
    } else {
      // Place order
      const orderId = "ORD" + Date.now();
      const orderDetails = {
        orderId,
        items: cart,
        total: totalPrice,
        address,
        paymentMethod,
        date: new Date().toLocaleString()
      };
      
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(orderDetails);
      localStorage.setItem("orders", JSON.stringify(orders));
      
      clearCart();
      addToast(`Order placed successfully! Order ID: ${orderId}`, "success");
      navigate(`/order-confirmation/${orderId}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items in cart</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
            <span className="step-number">1</span>
            <span>Address</span>
          </div>
          <div className={`step ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
            <span className="step-number">2</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        <div className="checkout-left">
          {step === 1 ? (
            <div className="address-form">
              <h3>Delivery Address</h3>
              <div className="form-row">
                <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleAddressChange} />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleAddressChange} />
              </div>
              <div className="form-row">
                <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleAddressChange} />
              </div>
              <div className="form-row">
                <input type="text" name="address" placeholder="Address (House No, Building, Street)" value={address.address} onChange={handleAddressChange} />
              </div>
              <div className="form-row">
                <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} />
                <input type="text" name="state" placeholder="State" value={address.state} onChange={handleAddressChange} />
              </div>
            </div>
          ) : (
            <div className="payment-section">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span>💵 Cash on Delivery</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span>📱 UPI</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity || 1}</span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            {step === 1 ? "Continue to Payment" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;