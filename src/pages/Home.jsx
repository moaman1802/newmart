import React, { useState } from "react";
import ProductList from "../components/ProductList";
import Banner from "../components/Banner";
import Sorting from "../components/Sorting";
import "./Home.css";

const Home = ({ search, addToCart, wishlist, setWishlist, addToast }) => {
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="home">
      <Banner />
      
      <div className="section-header">
        <h2>Shop by Category</h2>
        <p>Discover our curated collections</p>
      </div>
      
      <div className="category-strip">
        <div className="category-item">
          <span>👕</span>
          <p>Men</p>
        </div>
        <div className="category-item">
          <span>👗</span>
          <p>Women</p>
        </div>
        <div className="category-item">
          <span>🧸</span>
          <p>Kids</p>
        </div>
        <div className="category-item">
          <span>🏠</span>
          <p>Home</p>
        </div>
        <div className="category-item">
          <span>💄</span>
          <p>Beauty</p>
        </div>
      </div>
      
      <div className="section-header">
        <h2>Recommended for You</h2>
        <p>Handpicked just for you</p>
      </div>

      {/* Sorting Only */}
      <div className="sorting-wrapper">
        <Sorting sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      
      <ProductList 
        search={search} 
        addToCart={addToCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
        addToast={addToast}
        sortBy={sortBy}
      />
    </div>
  );
};

export default Home;