import React, { useTransition } from 'react'
import "./carousalCss.css"

import Carousel from 'react-material-ui-carousel';

import men from './la.png'
import women from './leno.webp'
import electronics from './mo.jpeg'
import moto1 from './moto.png'
import moto2 from './moto.png'
import moto3 from './motobanner.jpeg'
import samsung from './samsung.png'

function Carousal() {
  const data = [
    { id: 1, url: men },
    { id: 2, url: women },
    { id: 3, url: electronics },
    { id: 4, url: moto1 },
    { id: 5, url: moto2 },
    { id: 6, url: moto3 },
    { id: 7, url: samsung }
];
  return (
    <>
      <Carousel animation="slide"
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

