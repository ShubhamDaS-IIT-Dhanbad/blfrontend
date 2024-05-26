import React, { useState, useEffect } from 'react';
import './shopPageCss.css';
import ShopFilterSection from './filterSection/shopFilterSection.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop } from '../../../redux/features/shop/shopSlice.jsx';
import ShopCard from '../../../components/windows/shopCard/shopCard.jsx';

function AllShopPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const shopsPerPage = 10;

  const shops = useSelector(state => state.shop.shops);

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);

  useEffect(() => {
    // Scroll to the top of the page when it refreshes
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });

    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const pinCode = userData ? userData.pinCodes.join(', ') : "";
    dispatch(fetchShop({ pinCode }));
  }, [dispatch]);

  useEffect(() => {
    if (shops?.length > 0) {
      const uniqueCategories = getUniqueCategories(shops);
      setCategories(['All', ...uniqueCategories]);
      setFilteredShops(shops);
    }
  }, [shops]);

  const getUniqueCategories = (shops) => {
    const categorySet = new Set();
    shops?.forEach(shop => {
      shop?.category?.forEach(category => categorySet?.add(category));
    });
    return Array.from(categorySet);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    filterShops(categories);
  };

  const filterShops = (categories) => {
    if (categories?.length === 0 || categories?.includes('All')) {
      setFilteredShops(shops);
    } else {
      setFilteredShops(shops?.filter(shop => 
        shop?.category?.some(category => categories?.includes(category))
      ));
    }
    setCurrentPage(1); // Reset to first page whenever category changes
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="all-shop-page-container">
      <ShopFilterSection
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="all-shop-page-content">
        <div className="all-shop-page-grid">
          {currentShops?.map(shop => (
            <div key={shop?._id}>
              <ShopCard shop={shop} />
            </div>
          ))}
        </div>
        <div className="all-shop-page-pagination-buttons">
          {currentPage > 1 && (
            <button className="all-shop-page-pagination-button" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {indexOfLastShop < filteredShops?.length && (
            <button className="all-shop-page-pagination-button" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllShopPage;

