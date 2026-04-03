import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "info" && "ℹ️"}
        {type === "wishlist" && "❤️"}
        {type === "cart" && "🛒"}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
};

export default Toast;