import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from "react-rating-stars-component";
import "./productCardCss.css";

function ProductCard({ id, image, title, price }) {
    const navigate = useNavigate();

    // Check if image, title, and price are provided, otherwise use default values
    const imageUrl = image ? image : 'http://res.cloudinary.com/dicsxehfn/image/upload/v1715907822/p6yehdqg0uwnl3jmpxmt.jpg'; // Provide a default image URL
    const productName = title ? (title.length > 45 ? title.substr(0, 45) + '..' : title) : 'Product Name'; // Provide a default product name
    const productPrice = price ? price : '0'; // Provide a default price

    return (
        <div className="product-card">
            <div className="product-card-top" onClick={() => navigate(`/product/${id}`)}>
                <img className="product-card-top-image" src={imageUrl} alt={productName} />
            </div>
            <div className='product-card-bottom'>
                <div className="product-card-shop-price">
                    <div className='product-card-shop-name-div'>
                        <span className='product-card-shop'>
                            ₹{productPrice}
                            <Rating
                                count={5}
                                size={15}
                                value={4} // Set the value to the appropriate rating value
                                activeColor="#ffd700"
                                emptyColor="black"
                                edit={true}
                                margin="10px"
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                filledIcon={<i className="fas fa-star"></i>}
                            />
                        </span>
                        <span className='product-card-shop-name'>{productName}</span>
                    </div>
                </div>
                <div className="product-card-shop-detail">
                    <span className="shoe-name"></span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
