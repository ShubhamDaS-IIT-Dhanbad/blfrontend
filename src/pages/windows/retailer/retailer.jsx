import React, { useEffect } from 'react';
import SideBar from '../../../retailerComponents/retailerHeader/retailerNavBar.jsx';
import RetailerProduct from '../../../retailerComponents/products/retailerProduct.jsx';
import UploadProduct from '../../../retailerComponents/upload/upload.jsx';
import UpdateProduct from '../../../retailerComponents/update/updateProduct.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRetailerDataFromLocalStorage } from '../../../redux/features/retailer/retailerSlice.jsx';
import axios from 'axios'; // Import axios
import WithProductAuthorization from '../../../utils/withProductAuthorization.jsx'; // Import HOC
function Retailer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRetailerDataFromLocalStorage({ dispatch }));
  }, [dispatch]);

  const shopData = useSelector((state) => state.retailer.shopData);
  const retailerData = useSelector((state) => state.retailer.retailerData);
  const products = useSelector((state) => state.retailer.products);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.post(`https://bharat-lbackend.vercel.app/product/deleteproduct/${id}`);
      alert("Product deleted successfully");
      dispatch(fetchRetailerDataFromLocalStorage({ dispatch }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
console.log("lplp",shopData)
  return (
    <>
      <SideBar shopData={shopData} />
      <Routes>
        <Route path="/products" element={<RetailerProduct retailerProducts={products} onDeleteProduct={handleDeleteProduct} />} />
        <Route path="/upload" element={<UploadProduct id={shopData?._id} pinCodes={shopData?.pinCodes} />} />
        <Route path="/update/:id" element={<WithProductAuthorization element={<UpdateProduct />}/>}/>
      </Routes>
    </>
  );
}

export default Retailer;


