import React, { useRef } from 'react';
import Slider from 'react-slick';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './shopByCategoryCss.css';

const Category = ({ data }) => {
    const sliderRef = useRef(null);
    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true, // Allow swipe to slide
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="shop-by-category-container">
            <div className="shop-by-category-name">
                CATEGORIES
                <span className="shop-by-category-name-bar"></span>
            </div>
            <div className="slider-container">
                <div className="row gx-1 sliderParent">
                    <Slider {...settings} ref={sliderRef}>
                        {data.map(item => (
                            <div className="col-md-1" key={item.id}>
                                <div className="sliderParent-image">
                                    <img className="img-fluid" src={item.url} alt={`category-${item.id}`} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Category;
