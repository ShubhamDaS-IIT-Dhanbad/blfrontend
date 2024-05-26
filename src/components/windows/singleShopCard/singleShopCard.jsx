import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./singleShopCardCss.css";
import { useDispatch } from 'react-redux';
import Loading from "../loading/loading.jsx";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import Rating from "react-rating-stars-component";
import Carousel from 'react-material-ui-carousel';
import { fetchShopDetails } from "../../../redux/features/shop/shopSlice.jsx";
import AllProductPageCard from "../allProductPageCard/allProductPageCard.jsx";
import p1 from "./shopbanner.jpg";

const ShopDetails = () => {
    const images = [
        { id: 1, image: p1 },
        { id: 2, image: p1 },
        { id: 4, image: p1 },
        { id: 5, image: p1 },
        { id: 6, image: p1 },
        { id: 7, image: p1 },
        { id: 8, image: p1 },
        { id: 9, image: p1 },
    ];

    const dispatch = useDispatch();
    const { shopId } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [shopDetails, setShopDetails] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [retailerDetails, setRetailerDetails] = useState(null);

    const [selectedImage, setSelectedImage] = useState(images[0].image);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (shopId) {
                    const shopAction = await dispatch(fetchShopDetails(shopId));
                    const productResponse = await fetch(`https://bshopbackend.vercel.app/api/v1/product/products?shopid=${shopId}`);
                    const retailerResponse = await fetch(`https://bshopbackend.vercel.app/api/v1/retailer/retailerdata/${shopAction.payload.owner}`);

                    if (!productResponse.ok || !retailerResponse.ok) {
                        throw new Error("Failed to fetch data");
                    }

                    const product = await productResponse.json();
                    const retailer = await retailerResponse.json();

                    setShopDetails(shopAction.payload);
                    setProductDetails(product.products);
                    setRetailerDetails(retailer.retailer);

                    const uniqueCategories = getUniqueCategories(product.products);
                    setCategories(['All', ...uniqueCategories]);

                    const uniqueBrands = getUniqueBrands(product.products);
                    setBrands(['All', ...uniqueBrands]);
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

    const getUniqueCategories = (products) => {
        const uniqueCategories = new Set();
        products.forEach(product => {
            product.category.forEach(category => {
                if (!uniqueCategories.has(category)) {
                    uniqueCategories.add(category);
                }
            });
        });
        return Array.from(uniqueCategories);
    };

    const getUniqueBrands = (products) => {
        const uniqueBrands = new Set();
        products.forEach(product => {
            if (product.brand && !uniqueBrands.has(product.brand)) {
                uniqueBrands.add(product.brand);
            }
        });
        return Array.from(uniqueBrands);
    };

    const filterProductsByCategory = (products, category) => {
        if (category === 'All') {
            return products;
        }
        return products.filter(product => product.category.includes(category));
    };

    const filterProductsByBrand = (products, brand) => {
        if (brand === 'All') {
            return products;
        }
        return products.filter(product => product.brand === brand);
    };

    const filteredProductsByCategory = filterProductsByCategory(productDetails, selectedCategory);
    const filteredProducts = filterProductsByBrand(filteredProductsByCategory, selectedBrand);

    const redirectToMap = () => {
        const shopLat = shopDetails?.location?.lat;
        const shopLon = shopDetails?.location?.lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${shopLat},${shopLon}&travelmode=driving`;
                    window.location.href = googleMapsUrl;
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
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <Fragment>
            <div className="single-shop-container">
                <div className="single-shop-container-2">
                    {shopDetails?.shopName?.toUpperCase()}
                    <MdOutlineAddLocationAlt size={45} className="single-shop-container-2-1" />
                </div>
                
                <div className="single-shop-container-3">
                    <div className="single-shop-container-3-1">
                        <Carousel className="single-shop-container-3-1-1">
                            <img src={selectedImage} alt="Selected Product" />
                        </Carousel>
                        <div className='single-shop-container-3-1-2'>
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.image}
                                    alt={`Thumbnail ${index}`}
                                    className="thumbnail"
                                    onClick={() => setSelectedImage(img.image)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="single-shop-container-3-2">
                        <div className="single-shop-container-3-2-retailer-name">{retailerDetails?.name.toUpperCase()}</div>
                        <div className="single-shop-container-3-2-retailer-rating">
                            {shopDetails?.ratings}
                            <Rating
                                count={5}
                                size={20}
                                value={shopDetails?.ratings}
                                activeColor="#ffd700"
                                emptyColor="black"
                                edit={false}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                filledIcon={<i className="fas fa-star"></i>}
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
                <div className="product-category-container">
                    <AllProductPageCard products={filteredProducts} loading={loading} error={error} />
                </div>
            </div>
        </Fragment>
    );
};

export default ShopDetails;

