import React, { useState, useEffect } from 'react';
import "./homePageProductsCss.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../productCard/productCard.jsx";
import Loading from "../loading/loading.jsx";

const HomePageCategoryProducts = ({ categories, products, loading }) => {
    const [sliderRefs, setSliderRefs] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState(5); // Initially show 5 categories
    const [showMore, setShowMore] = useState(false); // State to manage "View More" button visibility

    useEffect(() => {
        setSliderRefs(Array(categories.length).fill().map((_, i) => sliderRefs[i] || React.createRef()));
    }, [categories.length, products]);

    useEffect(() => {
        // Determine if "View More" button should be visible
        setShowMore(categories.length > visibleCategories);
    }, [categories, visibleCategories]);

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleNextSlide = (index) => {
        sliderRefs[index].current.slickNext();
    };

    const handlePrevSlide = (index) => {
        sliderRefs[index].current.slickPrev();
    };

    const handleViewMore = () => {
        setVisibleCategories(visibleCategories + 5); // Show additional 5 categories on "View More" click
    };

    if (!loading) {
        return (
            <div className='home-page-category-products-container-parent'>
                {categories.slice(0, visibleCategories).map((item, index) => {
                    // Filter out categories with less than 3 associated products
                    const categoryProducts = products.filter(product => Array.isArray(product.category) && product.category.includes(item.category));
                    if (categoryProducts.length < 4) return null; // Skip rendering if less than 3 products for this category
                    return (
                        <div className='home-page-category-products-container' key={item.id}>
                            <div className="home-page-category-products">
                                <div className="home-page-category-products-left">
                                    {item.category.toUpperCase()}
                                    <span className="shop-by-category-name-bar"></span>
                                </div>
                            </div>

                            <div className='slider-container'>
                                <div className="row gx-1 sliderParent">
                                    <Slider {...settings} ref={sliderRefs[index]} >
                                        {categoryProducts.map(product => (
                                            <div className='col-md-1 men-slider-columns' key={product._id}>
                                                <ProductCard id={product._id} image={product.images[0]} title={product.title} price={product.price} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className="home-page-category-products-button-container">
                                <button className="home-page-category-products-button" onClick={() => handleNextSlide(index)}>
                                    <IoIosArrowBack size={25} fontWeight={100} color={"white"} />
                                </button>
                                <button className="home-page-category-products-button" onClick={() => handlePrevSlide(index)}>
                                    <IoIosArrowForward size={25} fontWeight={100} color={"white"} />
                                </button>
                            </div>
                        </div>
                    );
                })}
                {showMore && (
                    <div className="view-more-button-container">
                        <button className="view-more-button" onClick={handleViewMore}>View More</button>
                    </div>
                )}
            </div>
        );
    } else {
        return <Loading />;
    }
};

export default HomePageCategoryProducts;

