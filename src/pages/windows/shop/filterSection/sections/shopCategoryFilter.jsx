import React from 'react';
import './shopCategoryFilterCss.css'
const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((selected) => selected !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="shop-category-filter">
      <h4 className="shop-category-filter-label">CATEGORIES</h4>
      <div>
        {categories.map((category) => (
          <div key={category} className="shop-category-checkbox-options">
            <label className="shop-category-checkbox-options-label">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

