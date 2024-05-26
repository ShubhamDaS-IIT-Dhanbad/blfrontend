import React, { useState, useEffect } from 'react';
import RetailerProductCard from "../../retailerComponents/retailerProductCard/retailerProductCard.jsx";
import RetailerFilterSection from "../../components/windows/filterSection/filterSection.jsx";
import Loading from "../../components/windows/loading/loading.jsx";
import './retailerProductCss.css'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/features/products/productSlics.jsx';

function RetailerProductPageCard({ retailerProducts, loading, error }) {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    selectedBrands: [],
    selectedCategories: []
  });
  const productsPerPage = 15;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (!userData || !userData.pinCodes) return;
    const pinCodesString = userData.pinCodes.join(', ');
    const pinCode = pinCodesString ? pinCodesString : '';
    dispatch(fetchProducts({ pinCode }));
  }, [currentPage]);

  const getUniqueValues = (items, key) => {
    const values = items.flatMap(item => item[key]);
    return Array.from(new Set(values));
  };

  const uniqueBrands = getUniqueValues(retailerProducts, 'brand');
  const uniqueCategories = getUniqueValues(retailerProducts, 'category');

  const handleBrandChange = (selectedBrands) => {
    setFilters(prevFilters => ({ ...prevFilters, selectedBrands }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (selectedCategories) => {
    setFilters(prevFilters => ({ ...prevFilters, selectedCategories }));
    setCurrentPage(1);
  };

  const filteredProducts = retailerProducts.filter(product => {
    const matchesBrand = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand);
    const matchesCategory = filters.selectedCategories.length === 0 || product.category.some(cat => filters.selectedCategories.includes(cat));
    return matchesBrand && matchesCategory;
  });

  console.log('Filters:', filters); // Debug: check current filters
  console.log('Filtered Products:', filteredProducts); // Debug: check filtered products

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="retailer-product-page-error-message">Error: {error}</div>;
  }
  if (filteredProducts?.length === 0) {
    return <div className="retailer-product-page-empty-message">No products available</div>;
  }
  return (
    <div className="retailer-product-page-container-c">
      <RetailerFilterSection
        brands={uniqueBrands}
        categories={uniqueCategories}
        selectedBrands={filters.selectedBrands}
        selectedCategories={filters.selectedCategories}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="retailer-product-page-content">
        <div className="retailer-product-page-grid">
          {currentProducts.map(product => (
            <div key={product._id}>
              <RetailerProductCard
                id={product._id}
                image={product.images[0]}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
        <div className="retailer-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="retailer-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < filteredProducts?.length && (
            <button className="retailer-product-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RetailerProductPageCard;
