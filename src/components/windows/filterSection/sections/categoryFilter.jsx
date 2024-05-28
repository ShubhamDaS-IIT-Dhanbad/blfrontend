import React from 'react';
import "./categoryFilterCss.css";

const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  if (!categories) return <></>;

  return (
    <div className="category-filter">
      <h4 className="category-filter-label">CATEGORIES</h4>
      <div className="category-checkbox-options">
        {categories?.map(category => (
          <label key={category} className="category-checkbox-options-label">
            <input
              type="checkbox"
              checked={selectedCategories?.includes(category)}
              onChange={() => handleCheckboxChange(category)}
            />
            {category.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
