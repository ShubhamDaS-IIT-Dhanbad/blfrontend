import React, { useEffect, useState, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const withProductAuthorization = memo(({ element }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const retailerShopId = useSelector((state) => state.retailer.shopData?._id);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!id || !retailerShopId) {
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bharat-lbackend.vercel.app/api/v1/product/productsdetail/${id}`);
        const productData = response.data;
        if (productData.product.shop !== retailerShopId) {
          navigate('/products');
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, retailerShopId, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return authorized ? element : null;
});
export default withProductAuthorization;
