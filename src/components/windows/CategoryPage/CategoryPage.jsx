import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import AllProductPageCard from '../allProductPageCard/allProductPageCard';
import "./categoryPageCss.css"

function AllCategoryRootPages() {
  const { category } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const pinCode = storedUserData ? storedUserData.pinCodes: '';
    const categoriesArray = Array.isArray(category) ? category : [category];
    const categoriesString = categoriesArray.join(',');
    console.log("ko",categoriesString)
    const fetchProducts = async () => {
      
      try {
        const response = await fetch(`http://localhost:12000/api/v1/product/products?pincode=${pinCode}&categories=${categoriesString}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        console.log(products)
        setProductData(products.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  if(loading) return <Loading/>
  return (
    <div className='category-product-page-container'>
      {productData && <AllProductPageCard products={productData} />}
      </div>
  );
}
export default AllCategoryRootPages;

