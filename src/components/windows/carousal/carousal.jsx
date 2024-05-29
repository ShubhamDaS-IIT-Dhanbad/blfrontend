import React, { useTransition } from 'react'
import "./carousalCss.css"

import Carousel from 'react-material-ui-carousel';

import electronics from './mo.jpeg'
import moto3 from './motobanner.jpeg'
import samsung from './samsung.png'
import bb2 from './bb2.jpg'
import bb3 from './bb3.jpg'
import bb4 from './bb4.jpg'
import bb5 from './bb5.jpg'
import bb6 from './bb6.jpg'
import bb7 from './bb7.jpg'
import bb8 from './bb8.jpg'
import bb9 from './bb9.jpg'

function Carousal() {
  const data = [
 
    { id: 3, url: electronics },
    { id: 7, url: samsung },
    { id: 9, url: bb2 },
    { id: 10, url: bb3 },
    { id: 11, url: bb4 },
    { id: 12, url: bb5 },
    { id: 13, url: bb6 },
    { id: 14, url: bb7 },
    { id: 15, url: bb8 },
    { id: 16, url: bb9 },
];

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
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              dots: true
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 4,
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

  return (
    <>
      <Carousel animation="slide" {...settings} 
      autoPlay={true}
      showIndicators={false}
      timeout={5000}
      indicators={true}
      swipe={true}
      swipeable={true}
      draggable={true}   
      > 
      {data.map(item => (
          <div key={item.id} className="CarouselSlide">
                <img className="CarouselImage" src={item.url}/>
          </div>
      ))}
      </Carousel>
    </>
  )
}

export default Carousal

