import React from 'react'
import "./featuredProductCardCss.css"

import { useNavigate } from 'react-router-dom';
import Rating from "react-rating-stars-component";

function featuredProductCard({ id, image, title, price }) {
    const navigate = useNavigate();
    return (
        <div className="featured-Product-card">
            <div className="featured-Product-card-top" onClick={() => navigate(`/${id}`)}>
                <img className="featured-Product-card-top-image" src={image} alt="blue" />
            </div>
            <div className='featured-Product-card-bottom'>
                <div className="featured-Product-card-shop-price">
                    <div className='featured-Product-card-shop-name-div'>
                        <span className='featured-Product-card-shop'>
                            ₹{price}
                            <Rating
                                count={5} // Number of stars
                                size={15} // Size of stars
                                value={4} // Current value (number of filled stars)
                                activeColor="#ffd700" // Color of filled stars
                                emptyColor="black" // Color of empty stars
                                edit={true} // Whether the rating is editable
                                margin="10px" // Set the margin directly
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                filledIcon={<i className="fas fa-star"></i>}
                            />
                        </span>
                        <span className='featured-Product-card-shop-name'>{`${title.substr(0, 50)}..`}</span>
                    </div>
                </div>
                <div className="featured-Product-shop-detail">
                    <span className="shoe-name"></span>
                </div>
                {/* <div className='featured-Product-card-button-container'>
                    <div className="button">
                        <button onClick={() => navigate(`/${id}`)}>VIEW DETAIL</button>
                    </div>
                    <div className="button">
                        <button>ADD TO CART</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
export default featuredProductCard
