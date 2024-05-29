import React, { useState, useEffect, useRef } from 'react';
import "./featuredProductCss.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../loading/loading.jsx";

import FeaturedProductCard from './featuredProductCard.jsx/featuredProductCard.jsx';

const FeaturedProduct = ({ products, loading }) => {
    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleNextSlide = () => {
        sliderRef.slickNext();
    };

    const handlePrevSlide = () => {
        sliderRef.slickPrev();
    };

    // If there are no featured products, return null to prevent rendering the FeaturedProduct component
    if (!products.some(product => product.featured)) {
        return null;
    }

    return (
        <div className='home-page-featured-products-container-parent'>
            <div className='home-page-featured-products-container'>
                <div className="home-page-featured-products">
                    <div className="home-page-featured-products-left">
                        FEATURED PRODUCTS
                        <span className="shop-by-featured-name-bar"></span>
                    </div>
                </div>
                <div className='featured-product-slider-container'>
                    <div className="row gx-1 featured-product-sliderParent">
                        <Slider {...settings} ref={(slider) => setSliderRef(slider)}>
                            {products
                                .filter(product => product.featured)
                                .map(product => (
                                    <div className='col-md-1 men-slider-columns' key={product._id}>
                                        <FeaturedProductCard
                                            id={product._id}
                                            image={product.images[0]}
                                            title={product.title}
                                            price={product.price}
                                            key={product._id} // Ensure each FeaturedProductCard has a unique key
                                        />
                                    </div>
                                ))
                            }

                        </Slider>
                    </div>
                </div>
            </div>
            <div className="featured-products-right">
                <button className="featured-products-button" onClick={handlePrevSlide}>
                    <IoIosArrowBack size={25} color={"white"} />
                </button>
                <button className="featured-products-button" onClick={handleNextSlide}>
                    <IoIosArrowForward size={25} color={"white"} />
                </button>
            </div>
        </div>
    );
};
export default FeaturedProduct;



