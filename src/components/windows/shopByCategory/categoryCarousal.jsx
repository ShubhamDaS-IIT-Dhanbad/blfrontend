import React from 'react';
import Slider from 'react-slick';
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./categoryCarousalCss.css"

import { useState, useEffect } from 'react';
import axios from "axios"

import men from "./mens.jpg"
import women from "./women.jpg"
import electronics from "./electronics.jpg"
import jewelery from "./jewelery.png"

function CategoryCarousal() {
    const data = [
        // Sample data objects
        { id: 1, url: men },
        { id: 2, url: women },
        { id: 3, url: electronics },
        { id: 3, url: jewelery }
    ];
    const sliderRef = useRef(null);
    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 2,
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
        <div className='slider-container'>
            <div className="custom-arrow next-arrow" onClick={goToPrevSlide}>
                < IoIosArrowBack className="arrow" size={39} fontWeight={100} />
            </div>
            <div className="row  gx-1 sliderParent">
                <Slider {...settings} ref={sliderRef}>

                    {data.map(item=> (
                        <div className='col-md-1 divcon' id={item.id}>
                            <div className='divs'>
                                <img className='img-fluid divsi' src={item.url} />
                            </div>
                        </div>
                        
                    ))}
                </Slider>
            </div>
            <div className="custom-arrow prev-arrow" onClick={goToNextSlide}>
                < IoIosArrowForward className='arrow' size={39} />
            </div>
        </div>
    );
}

export default CategoryCarousal;




