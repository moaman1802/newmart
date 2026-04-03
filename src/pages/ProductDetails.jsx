import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ addToCart, wishlist, setWishlist, addToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const products = [
    {
      id: 1,
      name: "Men's Sports Shoes",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      description: "Premium quality sports shoes with cushioned sole for maximum comfort. Perfect for running, gym, and casual wear.",
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
      color: "White/Red"
    },
    {
      id: 2,
      name: "Men's Cotton T-Shirt",
      price: 599,
      originalPrice: 1199,
      discount: 50,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      description: "100% premium cotton t-shirt with breathable fabric. Perfect for daily wear and casual outings.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      color: "Black"
    },
    {
      id: 3,
      name: "Analog Watch",
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
      description: "Elegant analog watch with stainless steel strap. Water resistant and scratch proof glass.",
      sizes: ["One Size"],
      color: "Silver"
    },
    {
      id: 4,
      name: "Women's Handbag",
      price: 1299,
      originalPrice: 2599,
      discount: 50,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
      description: "Stylish handbag made from premium leather. Spacious compartments and durable straps.",
      sizes: ["One Size"],
      color: "Brown"
    },
    {
      id: 5,
      name: "Men's Denim Jeans",
      price: 1499,
      originalPrice: 2999,
      discount: 50,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
      description: "Classic denim jeans with slim fit. Made from high quality stretchable denim fabric.",
      sizes: ["30", "32", "34", "36", "38"],
      color: "Blue"
    },
    {
      id: 6,
      name: "Women's Floral Dress",
      price: 1899,
      originalPrice: 3799,
      discount: 50,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      description: "Beautiful floral print dress with flowy design. Perfect for summer and parties.",
      sizes: ["S", "M", "L", "XL"],
      color: "Floral Print"
    },
    {
      id: 7,
      name: "Sunglasses",
      price: 999,
      originalPrice: 1999,
      discount: 50,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      description: "Trendy sunglasses with UV protection. Lightweight and stylish design.",
      sizes: ["One Size"],
      color: "Black"
    },
    {
      id: 8,
      name: "Backpack",
      price: 899,
      originalPrice: 1799,
      discount: 50,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      description: "Spacious backpack with multiple compartments. Perfect for travel and daily use.",
      sizes: ["One Size"],
      color: "Grey"
    }
  ];

  const product = products.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (wishlist && product) {
      const exists = wishlist.some((item) => item.id === product.id);
      setIsWishlisted(exists);
    }
  }, [wishlist, product]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      setIsWishlisted(false);
      addToast(`${product.name} removed from wishlist`, "info");
    } else {
      setWishlist([...wishlist, { id: product.id, name: product.name, price: product.price, image: product.image }]);
      setIsWishlisted(true);
      addToast(`${product.name} added to wishlist ❤️`, "wishlist");
    }
  };

  if (!product) {
    return (
      <div className="product-details-error">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info-section">
          <div className="product-title-row">
            <h1>{product.name}</h1>
            <button className={`wishlist-details-btn ${isWishlisted ? "active" : ""}`} onClick={toggleWishlist}>
              {isWishlisted ? "❤️ Added to Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
          
          <div className="price-section">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount-badge">{product.discount}% OFF</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-details-info">
            <div className="info-row">
              <span className="info-label">Color:</span>
              <span>{product.color}</span>
            </div>
          </div>

          <div className="size-section">
            <h4>Select Size</h4>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button key={index} className="size-btn">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-cart-details" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          <button className="buy-now-btn" onClick={handleAddToCart}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;