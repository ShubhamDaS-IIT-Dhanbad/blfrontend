import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './searchPageCss.css';
import { useSelector } from 'react-redux';
import Loading from '../loading/loading.jsx';
import ProductCard from "../productCard/productCard.jsx";
import FilterSection from '../filterSection/filterSection.jsx';

const SearchProduct = () => {
  const { searchedProducts, loading, error } = useSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 32;
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    if (searchedProducts && searchedProducts.length > 0) {
      const brandsSet = new Set();
      const categoriesSet = new Set();

      searchedProducts.forEach(product => {
        brandsSet.add(product.brand);
        product.category.forEach(category => categoriesSet.add(category));
      });

      setUniqueBrands([...brandsSet]);
      setUniqueCategories([...categoriesSet]);
    }
  }, [searchedProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleBrandChange = (selectedBrands) => {
    setSelectedBrands(selectedBrands);
  };

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="search-error-message">Error: {error}</div>;
  }

  if (!searchedProducts || searchedProducts.length === 0) {
    return <div className="search-empty-message" style={{ minHeight: "100vh" }}>No products available</div>;
  }

  const filteredProducts = searchedProducts.filter(product => {
    if (selectedBrands.length === 0 && selectedCategories.length === 0) {
      return true;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.some(category => product.category.includes(category))) {
      return false;
    }
    return true;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="SearchProduct">
      <Helmet>
        <title>Search Product Page</title>
        <meta name="description" content="Description of your search product page" />
      </Helmet>
      <FilterSection
        brands={uniqueBrands}
        categories={uniqueCategories}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="search-product-page-container">
        <div className="search-product-page-grid">
          {currentProducts.map(product => (
            <div key={product?._id}>
              {product?.images && product?.title && product?.price && ( // Check if all required fields are present
                <ProductCard
                  id={product?._id}
                  image={product?.images[0]}
                  title={product?.title.length > 45 ? `${product.title.substr(0, 45)}..` : product.title}
                  price={product?.price}
                />
              )}
            </div>
          ))}
        </div>
        <div />
        <div className="search-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="search-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < filteredProducts.length && (
            <button className="search-product-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
