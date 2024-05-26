import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./singleProductCardCss.css";
import { useDispatch } from 'react-redux';
import Loading from "../../../components/windows/loading/loading.jsx";
import Rating from "react-rating-stars-component";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { fetchProductDetails, searchedProducts } from "../../../redux/features/products/productSlics.jsx";
import { fetchShopDetails } from "../../../redux/features/shop/shopSlice.jsx";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const [productDetail, setProductDetails] = useState(null);
    const [shopDetails, setShopDetails] = useState(null);

    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productAction = await dispatch(fetchProductDetails(productId));
                const shopId = productAction?.payload?.shop;
                setProductDetails(productAction?.payload);
                setSelectedImage(productAction?.payload?.images[0]);
                if (shopId) {
                    const shopAction = await dispatch(fetchShopDetails(shopId));
                    setShopDetails(shopAction.payload);
                }
            } catch (err) {
                console.error("Error while fetching product or shop details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, productId]);

    const increaseQuantity = () => {
        if (productDetail?.quantityAvailable <= quantity) return;
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const redirectToMap = () => {
        const shopLat = shopDetails?.location?.lat; // Latitude
        const shopLon = shopDetails?.location?.lon; // Longitude
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

    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                productDetail && (
                    <Fragment>
                        <div className="ProductDetails">
                            <div className="pro-single-shop-container-3-1">
                                <img src={selectedImage} alt="Selected Product" />
                                {productDetail?.images?.length > 1 && (
                                    <div className='pro-single-shop-container-3-1-2'>
                                        {productDetail?.images?.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Thumbnail ${index}`}
                                                className="thumbnail"
                                                onClick={() => setSelectedImage(img)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="ProductDetails-right">
                                <div className="detailsBlock-1">
                                    <h2>{productDetail.title}</h2>
                                    <p>Product # {productDetail._id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <span className="detailsBlock-2-span">
                                        <div className="detailsBlock-shopName-container">
                                            <span className="detailsBlock-shopName-shop">SHOP: </span>
                                            <span className="detailsBlock-shopName-shop-name">{shopDetails?.shopName?.toUpperCase()}</span>
                                            <span onClick={redirectToMap}>
                                                <MdOutlineAddLocationAlt className='single-product-MdOutlineAddLocationAlt' size={20} fontWeight={100} color={"black"} />
                                            </span>
                                        </div>
                                        <Rating
                                            count={5}
                                            size={15}
                                            value={productDetail.ratings}
                                            activeColor="#ffd700"
                                            emptyColor="black"
                                            edit={false}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            filledIcon={<i className="fas fa-star"></i>}
                                        />
                                        ({productDetail?.reviews?.length} Reviews)
                                    </span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`₹${productDetail.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1" style={{ display: "flex", gap: "1px" }}>
                                            <button onClick={decreaseQuantity} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                                            <input type="number" value={quantity} readOnly />
                                            <button onClick={increaseQuantity} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                        </div>
                                        <button disabled={productDetail?.quantityAvailable <= 0} style={{ width: "70%", height: "45px", fontSize: "12px", fontWeight: "900" }}>
                                            BOOK YOUR VISIT
                                        </button>
                                    </div>
                                    <p>
                                        Status:
                                        <b className={productDetail?.quantityAvailable > 0 ? "greenColor" : "redColor"}>
                                            {productDetail?.quantityAvailable > 0 ? "In Stock" : "Out of Stock"}
                                        </b>
                                    </p>
                                </div>
                                <div className="detailsBlock-4">
                                    <span>Description : </span>
                                    <p>{productDetail.description}</p>
                                </div>
                                {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <button className="submitReview" style={{ width: "70%", height: "40px", fontSize: "14px", fontWeight: "500" }}>
                                        Submit Review
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        <h3 className="reviewsHeading">REVIEWS</h3>
                    </Fragment>
                )
            )}
        </Fragment>
    );
};

export default ProductDetails;





