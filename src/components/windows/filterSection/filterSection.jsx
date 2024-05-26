import React from 'react';
import BrandFilter from './sections/brandFilter.jsx';
import CategoryFilter from './sections/categoryFilter.jsx';
import './filterSectionCss.css';

const FilterSection = ({ brands, categories, selectedBrands, selectedCategories, onBrandChange, onCategoryChange }) => {
  return (
    <div className="filter-section">

      <p>FILTER</p>
      <div className="filter-section-categories" >

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onChange={onCategoryChange}
        />
        <BrandFilter
          brands={brands}
          selectedBrands={selectedBrands}
          onChange={onBrandChange}
        />
      </div>
    </div>
  );
};

export default FilterSection;
