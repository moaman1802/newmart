import React from "react";
import "./ProductFilters.css";

const ProductFilters = ({ filters, setFilters }) => {
  const handlePriceChange = (e) => {
    setFilters({ ...filters, priceRange: parseInt(e.target.value) });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category: category === filters.category ? "" : category });
  };

  const clearFilters = () => {
    setFilters({ priceRange: 5000, category: "" });
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-filters" onClick={clearFilters}>Clear All</button>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-slider">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.priceRange}
            onChange={handlePriceChange}
          />
          <div className="price-values">
            <span>₹0</span>
            <span>₹{filters.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        <div className="category-options">
          <label className={`category-chip ${filters.category === "Men" ? "active" : ""}`}>
            <input
              type="checkbox"
              checked={filters.category === "Men"}
              onChange={() => handleCategoryChange("Men")}
            />
            Men
          </label>
          <label className={`category-chip ${filters.category === "Women" ? "active" : ""}`}>
            <input
              type="checkbox"
              checked={filters.category === "Women"}
              onChange={() => handleCategoryChange("Women")}
            />
            Women
          </label>
          <label className={`category-chip ${filters.category === "Accessories" ? "active" : ""}`}>
            <input
              type="checkbox"
              checked={filters.category === "Accessories"}
              onChange={() => handleCategoryChange("Accessories")}
            />
            Accessories
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;