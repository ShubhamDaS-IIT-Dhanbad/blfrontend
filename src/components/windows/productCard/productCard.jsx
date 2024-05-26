import React from 'react';
import "./productCardCss.css";

import { useNavigate } from 'react-router-dom';
import Rating from "react-rating-stars-component";

function ProductCard({ id, image, title, price }) {
    const navigate = useNavigate();
    return (
        <div className="product-card">
            <div className="product-card-top" onClick={() => navigate(`/product/${id}`)}>
                <img className="product-card-top-image" src={image} alt={title} />
            </div>
            <div className='product-card-bottom'>
                <div className="product-card-shop-price">
                    <div className='product-card-shop-name-div'>
                        <span className='product-card-shop'>
                            ₹{price}
                            <Rating
                                count={5}
                                size={15}
                                value={4}
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
                        <span className='product-card-shop-name'>{`${title.substr(0, 45)}..`}</span>
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
