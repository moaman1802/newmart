import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Profile";
import ToastContainer from "./components/ToastContainer";
import useToast from "./hooks/useToast";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        addToast(`${product.name} quantity increased!`, "cart");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      addToast(`${product.name} added to cart! 🛒`, "cart");
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      addToast("Welcome back! 👋", "success");
    }
  };

  return (
    <div>
      <Navbar 
        setSearch={setSearch} 
        cart={cart} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={handleLogin}
        wishlist={wishlist}
      />
      
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                search={search} 
                addToCart={addToCart} 
                wishlist={wishlist}
                setWishlist={setWishlist}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetails 
                addToCart={addToCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={<Cart cart={cart} setCart={setCart} addToast={addToast} />} 
          />
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={handleLogin} addToast={addToast} />} 
          />
          <Route 
            path="/wishlist" 
            element={
              <Wishlist 
                wishlist={wishlist} 
                setWishlist={setWishlist}
                addToCart={addToCart}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cart={cart}
                totalPrice={totalPrice}
                clearCart={clearCart}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/order-confirmation/:orderId" 
            element={
              <OrderConfirmation addToast={addToast} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Profile addToast={addToast} />
            } 
          />
        </Routes>
      </div>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;