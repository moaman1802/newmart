
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import axios from "axios";
import "./ProductList.css";

const ProductList = ({ search, addToCart, wishlist, setWishlist, addToast, sortBy }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/products")
      .then((response) => {
        console.log("API Response:", response.data);
        
        // 🔥 Image force add kar diya
        const productsWithImage = response.data.map((product, index) => ({
          ...product,
          image: product.image || `https://picsum.photos/200?random=${index}`
        }));
        
        setAllProducts(productsWithImage);
        setProducts(productsWithImage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];
    if (search) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setProducts(filtered);
  }, [search, allProducts]);

  let sortedProducts = [...products];
  if (sortBy === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="product-list">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          addToCart={addToCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          addToast={addToast}
        />
      ))}
    </div>
  );
};

export default ProductList;