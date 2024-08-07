import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchShopDetails } from "../../../redux/features/shop/shopSlice";
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import Carousel from 'react-material-ui-carousel';
import Rating from "react-rating-stars-component";
import { RiStarSLine } from "react-icons/ri";
import { LiaStarSolid } from "react-icons/lia";

import Loading from '../../../components/windows/loading/loading.jsx';
import ProductCard from '../../../components/windows/productCard/productCard.jsx';
import FilterSection from '../../../components/windows/filterSection/filterSection.jsx';
import './singleShopCardCss.css';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { shopId } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shopDetails, setShopDetails] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [retailerDetails, setRetailerDetails] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedImage, setSelectedImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (shopId) {
                    const shopAction = await dispatch(fetchShopDetails(shopId));
                    const productResponse = await fetch(`https://bharat-lbackend.vercel.app/api/v1/product/products?shopid=${shopId}`);
                    const retailerResponse = await fetch(`https://bharat-lbackend.vercel.app/api/v1/retailer/retailerdata/${shopAction.payload.owner}`);

                    if (!productResponse.ok || !retailerResponse.ok) {
                        throw new Error("Failed to fetch data");
                    }

                    const product = await productResponse.json();
                    const retailer = await retailerResponse.json();

                    setShopDetails(shopAction?.payload);
                    setProductDetails(product?.products);
                    setRetailerDetails(retailer.retailer);
                    const shopImages = shopAction?.payload.images;
                    setImages(shopImages);
                    setSelectedImage(shopImages?.[0]); // Select the first image initially
                }
            } catch (err) {
                console.error("Error while fetching product or shop details", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, shopId]);

    const getUniqueCategories = useCallback((products) => {
        const uniqueCategories = new Set();
        products.forEach(product => {
            product.category.forEach(category => {
                uniqueCategories.add(category);
            });
        });
        return Array.from(uniqueCategories);
    }, []);

    const getUniqueBrands = useCallback((products) => {
        const uniqueBrands = new Set();
        products.forEach(product => {
            uniqueBrands.add(product.brand);
        });
        return Array.from(uniqueBrands);
    }, []);

    const categories = useMemo(() => ['All', ...getUniqueCategories(productDetails)], [productDetails, getUniqueCategories]);
    const brands = useMemo(() => ['All', ...getUniqueBrands(productDetails)], [productDetails, getUniqueBrands]);

    const filterProductsByCategory = useCallback((products, category) => {
        return category === 'All' ? products : products.filter(product => product.category.includes(category));
    }, []);

    const filterProductsByBrand = useCallback((products, brand) => {
        return brand === 'All' ? products : products.filter(product => product.brand === brand);
    }, []);

    const filteredProductsByCategory = useMemo(() => filterProductsByCategory(productDetails, selectedCategory), [productDetails, selectedCategory, filterProductsByCategory]);
    const filteredProducts = useMemo(() => filterProductsByBrand(filteredProductsByCategory, selectedBrand), [filteredProductsByCategory, selectedBrand, filterProductsByBrand]);

    const redirectToMap = () => {
        const shopLat = shopDetails?.location?.lat; // Latitude
        const shopLon = shopDetails?.location?.lon; // Longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${shopLat},${shopLon}&travelmode=driving`;
                    window.open(googleMapsUrl, '_blank'); // Open in new tab
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="category-page-error-message">Error: {error}</div>;

    return (
        <div className="single-shop-page">
            <Helmet>
                <title>Shop Page</title>
                <meta name="description" content="Description of your category page" />
            </Helmet>
            <div className="single-shop-container-2">
                {shopDetails?.shopName?.toUpperCase()}
                <MdOutlineAddLocationAlt size={45} className="single-shop-container-2-1" onClick={redirectToMap} />
            </div>
            <div className="category-nav">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-nav-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="single-shop-container-3">
                <div className="single-shop-container-3-1">
                    <Carousel className="single-shop-container-3-1-1">
                        {images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className="thumbnail"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </Carousel>
                </div>
                <div className="single-shop-container-3-2">
                    <div className="single-shop-container-3-2-retailer-name">{retailerDetails?.name?.toUpperCase()}</div>
                    <div className="single-shop-container-3-2-retailer-rating">
                        {shopDetails?.ratings}
                        <Rating
                            count={5}
                            size={15}
                            value={shopDetails?.ratings || 5} // Use the actual rating value
                            activeColor="#ffd700"
                            emptyColor="#cccccc"
                            edit={false} // Set to false if you don't want it to be editable
                            isHalf={true}
                            emptyIcon={<RiStarSLine size={23}/>}
                            halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                            filledIcon={<LiaStarSolid size={19}/>}
                        />
                    </div>
                    <div className="single-shop-container-3-2-phn">
                        <div className="single-shop-container-3-2-phn-1">PHN:</div>
                        <div className="single-shop-container-3-2-phn-2">+91 {shopDetails?.phoneNumber}</div>
                    </div>
                    <div className="single-shop-container-3-2-email">
                        <div className="single-shop-container-3-2-email-1">EMAIL:</div>
                        <div className="single-shop-container-3-2-email-2">{retailerDetails?.email}</div>
                    </div>
                </div>
            </div>
            <div className='category-nav-container'>
                
                <div className="category-page-container">
                    <div className="category-page-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
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
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
