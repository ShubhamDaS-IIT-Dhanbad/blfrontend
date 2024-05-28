import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/windows/loading/loading.jsx';
import ProductCard from '../../../components/windows/productCard/productCard.jsx';
import FilterSection from '../../../components/windows/filterSection/filterSection.jsx';
import "./categoryPageCss.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      const pinCode = storedUserData?.pinCodes || '';
      const categoriesArray = Array.isArray(category) ? category : [category];
      const uniqueCategoriesArray = [...new Set(categoriesArray)];
      const categoriesString = uniqueCategoriesArray.join(',');

      try {
        const response = await fetch(`https://bharat-lbackend.vercel.app/api/v1/product/products?pincode=${pinCode}&categories=${categoriesString}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await response.json();
        setProducts(productsData?.products || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const productsPerPage = 50;

  // Flatten the categories arrays from all products and then ensure uniqueness
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const uniqueCategories = [
    ...new Set(products.flatMap(product => product.category))
  ];

  const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const handlePrevPage = () => setCurrentPage(prevPage => prevPage - 1);
  const handleBrandChange = (selectedBrands) => setSelectedBrands(selectedBrands);
  const handleCategoryChange = (selectedCategories) => setSelectedCategories(selectedCategories);

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(category => product.category.includes(category));
    return matchesBrand && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return <Loading />;
  if (error) return <div className="category-page-error-message">Error: {error}</div>;

  return (
    <div className="category-page">
      <Helmet>
        <title>Category Page</title>
        <meta name="description" content="Description of your category page" />
      </Helmet>
      <FilterSection
        brands={uniqueBrands}
        categories={uniqueCategories}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="category-page-container">
        <div className="category-page-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div key={product._id}>
                <ProductCard
                  id={product._id}
                  image={product.images?.[0]}
                  title={product.title}
                  price={product.price}
                />
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
        <div className="category-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="category-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastProduct < filteredProducts.length && (
            <button className="category-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
