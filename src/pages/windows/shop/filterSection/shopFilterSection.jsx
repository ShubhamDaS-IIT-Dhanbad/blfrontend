import React from 'react';
import CategoryFilter from './sections/shopCategoryFilter.jsx';
import './shopFilterSectionCss.css'; // Updated import

const ShopFilterSection = ({ brands, categories, selectedCategories, onBrandChange, onCategoryChange }) => {
  return (
    <div className="shop-filter-section">
      <p>FILTER</p>
      <div className="shop-filter-section-categories">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export default ShopFilterSection;

