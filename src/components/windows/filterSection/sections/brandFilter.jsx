import React from 'react';
import "./brandFilterCss.css";

const BrandFilter = ({ brands, selectedBrands, onChange }) => {
  console.log("koko",brands,selectedBrands)
  const handleCheckboxChange = (brand) => {
    const updatedBrands = selectedBrands?.includes(brand)
      ? selectedBrands?.filter(b => b !== brand)
      : [...selectedBrands, brand];
    onChange(updatedBrands);
  };
  if (!brands) return null;
  return (
    <div className="brand-filter">
      <h4 className="brand-filter-label">BRANDS</h4>
      <div className="brand-checkbox-options">
        {brands.map(brand => (
          <label key={brand} className="brand-checkbox-options-label">
            <input
              type="checkbox"
              checked={selectedBrands?.includes(brand)}
              onChange={() => handleCheckboxChange(brand)}
            />
            {brand?.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
