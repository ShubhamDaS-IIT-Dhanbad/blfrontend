import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './productCss.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/features/products/productSlics.jsx';
import Loading from '../../../components/windows/loading/loading.jsx';
import ProductCard from "../../../components/windows/productCard/productCard.jsx";
import FilterSection from '../../../components/windows/filterSection/filterSection.jsx';

const Product = () => {
  const dispatch = useDispatch();
  // home page pincode
  const pinCode = useSelector((state) => state.pinCode.pinCodes);
  const { products, loading, error } = useSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 32;
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // State to track if data has been loaded

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userDataString = localStorage.getItem('userData');
        // const userData = userDataString ? JSON.parse(userDataString) : null;
        // const pinCodesString = userData ? userData.pinCodes.join(', ') : "";
        // const pinCode = pinCodesString ? pinCodesString : "";
        await dispatch(fetchProducts({ pinCode })); 
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const brandsSet = new Set();
      const categoriesSet = new Set();

      products.forEach(product => {
        brandsSet.add(product.brand);
        product.category.forEach(category => categoriesSet.add(category));
      });

      setUniqueBrands([...brandsSet]);
      setUniqueCategories([...categoriesSet]);
    }
  }, [products]);

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

  if (!dataLoaded) {
    return <Loading />; // Show loading indicator until data is loaded
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-message" style={{ minHeight: "100vh" }}>No products available</div>;
  }

  const filteredProducts = products.filter(product => {
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
    <div className="Product">
      <Helmet>
        <title>Product Page</title>
        <meta name="description" content="Description of your product page" />
      </Helmet>
      <FilterSection
        brands={uniqueBrands}
        categories={uniqueCategories}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="all-product-page-container">
        <div className="all-product-page-grid">
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
        <div className="all-product-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="all-product-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < filteredProducts.length && (
            <button className="all-product-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Product;

