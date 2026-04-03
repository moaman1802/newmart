import React from "react";
import "./Sorting.css";

const Sorting = ({ sortBy, setSortBy }) => {
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sorting-container">
      <label className="sorting-label">Sort By:</label>
      <select className="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="">Recommended</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;