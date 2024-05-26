import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../redux/features/products/productSlics.jsx';
import FilterSection from "../filterSection/filterSection.jsx";
import ProductCard from '../productCard/productCard.jsx';
import Loading from "../loading/loading.jsx";
import './allProductPageCardCss.css';

function AllRetailerProductPageCard({ products, loading, error }) {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    selectedBrands: [],
    selectedCategories: []
  });
  const productsPerPage = 20;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (!userData || !userData.pinCodes) return;
    const pinCodesString = userData.pinCodes.join(', ');
    const pinCode = pinCodesString ? pinCodesString : '';
    dispatch(fetchProducts({ pinCode }));
  }, [currentPage, dispatch]);

  const getUniqueValues = (items, key) => {
    const values = items.flatMap(item => item[key]);
    return Array.from(new Set(values));
  };

  const uniqueBrands = getUniqueValues(products, 'brand');
  const uniqueCategories = getUniqueValues(products, 'category');

  const handleBrandChange = (selectedBrands) => {
    setFilters(prevFilters => ({ ...prevFilters, selectedBrands }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (selectedCategories) => {
    setFilters(prevFilters => ({ ...prevFilters, selectedCategories }));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesBrand = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand);
    const matchesCategory = filters.selectedCategories.length === 0 || product.category.some(cat => filters.selectedCategories.includes(cat));
    return matchesBrand && matchesCategory;
  });

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
    return <div className="all-retailer-product-page-error-message">Error: {error}</div>;
  }
  if (filteredProducts?.length === 0) {
    return (
      <div className="all-retailer-product-page-container-c">
        <h1>No products available</h1>
      </div>
    );
  }
  return (
    <div className="all-retailer-product-page-container-c">
      <FilterSection
        brands={uniqueBrands}
        categories={uniqueCategories}
        selectedBrands={filters.selectedBrands}
        selectedCategories={filters.selectedCategories}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="all-retailer-product-page-content">
        <div className="all-retailer-product-page-grid">
          {currentProducts.map(product => (
            <div key={product._id}>
              <ProductCard
                id={product._id}
                image={product.images[0]}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
        <div className="all-retailer-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="all-retailer-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < filteredProducts.length && (
            <button className="all-retailer-product-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllRetailerProductPageCard;

