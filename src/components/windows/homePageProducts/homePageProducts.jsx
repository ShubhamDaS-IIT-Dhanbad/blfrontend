import React, { useState, useEffect, useRef } from 'react';
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

    // Initialize slider refs for each category
    useEffect(() => {
        setSliderRefs((refs) =>
            Array(categories.length)
                .fill()
                .map((_, i) => refs[i] || React.createRef())
        );
    }, [categories.length]);

    // Determine if "View More" button should be visible
    useEffect(() => {
        const hasMoreVisible = categories.length > visibleCategories &&
            categories.slice(visibleCategories).some(item => {
                const categoryProducts = products.filter(product =>
                    Array.isArray(product.category) && product.category.includes(item.category)
                );
                return categoryProducts.length >= 4;
            });
        setShowMore(hasMoreVisible);
    }, [categories, visibleCategories, products]);

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
                breakpoint: 700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 4,
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
        const remainingCategories = categories.slice(visibleCategories);
        const nextVisibleCategories = remainingCategories.findIndex(item => {
            const categoryProducts = products.filter(product =>
                Array.isArray(product.category) && product.category.includes(item.category)
            );
            return categoryProducts.length >= 4;
        });

        if (nextVisibleCategories !== -1) {
            setVisibleCategories(visibleCategories + nextVisibleCategories + 1);
        } else {
            setVisibleCategories(categories.length);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='home-page-category-products-container-parent'>
            {categories.slice(0, visibleCategories).map((item, index) => {
                const categoryProducts = products.filter(product =>
                    Array.isArray(product.category) && product.category.includes(item.category)
                );
                if (categoryProducts.length < 4) return null;
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
                                <Slider {...settings} ref={sliderRefs[index]}>
                                    {categoryProducts.map(product => (
                                        <div className='col-md-1 men-slider-columns' key={product._id}>
                                            <ProductCard
                                                id={product._id}
                                                image={product.images[0]}
                                                title={product.title}
                                                price={product.price}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="home-page-category-products-button-container">
                            <button
                                className="home-page-category-products-button"
                                onClick={() => handlePrevSlide(index)}
                            >
                                <IoIosArrowBack size={25} color={"white"} />
                            </button>
                            <button
                                className="home-page-category-products-button"
                                onClick={() => handleNextSlide(index)}
                            >
                                <IoIosArrowForward size={25} color={"white"} />
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
};

export default HomePageCategoryProducts;
