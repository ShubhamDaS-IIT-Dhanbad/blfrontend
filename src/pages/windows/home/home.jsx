import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import './homeCss.css';

import Carousal from '../../../components/windows/carousal/carousal.jsx';
import Banner from '../../../components/windows/banner/banner.jsx';
import ShopByCategory from '../../../components/windows/shopByCategory/shopByCategory.jsx';
import HomePageProducts from "../../../components/windows/homePageProducts/homePageProducts.jsx";
import Loading from "../../../components/windows/loading/loading.jsx";
import FeaturedProduct from "../../../components/windows/featuredProduct/featuredProduct.jsx";
import { fetchProducts } from '../../../redux/features/products/productSlics.jsx';

import b2 from './ba.jpg';
import men from "./categoryImages/mens.jpg";
import women from "./categoryImages/women.webp";
import electronics from "./categoryImages/electronics.jpg";
import jewelery from "./categoryImages/jewelery.png";

const initialData = [
  { id: 1, url: men },
  { id: 2, url: women },
  { id: 3, url: electronics },
  { id: 4, url: jewelery }
];

const Home = () => {
  const dispatch = useDispatch();
  const pinCode = useSelector((state) => state.pinCode.pinCodes) ||"";

  const { products, loading: loadingProducts, error } = useSelector(state => state.products);
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts({ pinCode }));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const categorySet = new Set();
      products.forEach(product => {
        if (product.category) {
          product.category.forEach(category => {
            categorySet.add(category);
          });
        }
      });
      setUniqueCategories([...categorySet].map((category, index) => ({ id: index + 1, category })));
    }
  }, [products]);
console.log("caTEG",uniqueCategories,products)
  if (loadingProducts && loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div id='home-div-container'>
      <Helmet>
        <title>Bharat|Linker</title>
        <meta name="description" content="Description of your home page" />
      </Helmet>
      <div id='home-div'>
        <Carousal />
        <ShopByCategory data={initialData} />
        <HomePageProducts categories={uniqueCategories} products={products} loading={loadingProducts} />
        <FeaturedProduct products={products} loading={loadingProducts} />
      </div>
    </div>
  );
};
export default Home;
