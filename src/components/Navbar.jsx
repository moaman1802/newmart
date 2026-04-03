import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setSearch, cart, isLoggedIn, setIsLoggedIn, wishlist }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const name = localStorage.getItem("userName") || "User";
      setUserName(name);
    } else {
      setUserName("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo" onClick={() => navigate("/")}>
          NEW MART
        </h1>

        <ul className="nav-categories">
          <li className="dropdown">
            MEN
            <div className="dropdown-menu">
              <div>
                <h4>Topwear</h4>
                <p>T-Shirts</p>
                <p>Shirts</p>
                <p>Hoodies</p>
              </div>
              <div>
                <h4>Bottomwear</h4>
                <p>Jeans</p>
                <p>Trousers</p>
                <p>Shorts</p>
              </div>
              <div>
                <h4>Footwear</h4>
                <p>Sneakers</p>
                <p>Casual Shoes</p>
                <p>Sports Shoes</p>
              </div>
            </div>
          </li>

          <li className="dropdown">
            WOMEN
            <div className="dropdown-menu">
              <div>
                <h4>Western</h4>
                <p>Dresses</p>
                <p>Tops</p>
                <p>Jeans</p>
              </div>
              <div>
                <h4>Indian</h4>
                <p>Sarees</p>
                <p>Kurtas</p>
                <p>Lehengas</p>
              </div>
              <div>
                <h4>Footwear</h4>
                <p>Heels</p>
                <p>Flats</p>
                <p>Sandals</p>
              </div>
            </div>
          </li>

          <li className="dropdown">
            KIDS
            <div className="dropdown-menu">
              <div>
                <h4>Boys</h4>
                <p>T-Shirts</p>
                <p>Shorts</p>
                <p>Jeans</p>
              </div>
              <div>
                <h4>Girls</h4>
                <p>Dresses</p>
                <p>Skirts</p>
                <p>Tops</p>
              </div>
            </div>
          </li>

          <li>HOME & LIVING</li>
          <li>BEAUTY</li>
        </ul>
      </div>

      <div className="nav-center">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <div className="nav-icon" onClick={() => navigate("/profile")}>
              <span>👤</span>
              <p>{userName}</p>
            </div>
            <div className="nav-icon" onClick={handleLogout}>
              <span>🚪</span>
              <p>Logout</p>
            </div>
          </>
        ) : (
          <div className="nav-icon" onClick={() => navigate("/login")}>
            <span>👤</span>
            <p>Login</p>
          </div>
        )}
        
        <div className="nav-icon" onClick={() => navigate("/wishlist")}>
          <span>❤️</span>
          <p>Wishlist ({wishlist?.length || 0})</p>
        </div>
        
        <div className="nav-icon" onClick={() => navigate("/cart")}>
          <span>🛒</span>
          <p>Bag ({cart?.length || 0})</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;