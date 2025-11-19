import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import image1 from "./images/10001.jpg"
import image2 from "./images/10002.jpg"
import image3 from "./images/10003.jpg"
import image4 from "./images/10004.jpg"
import image5 from "./images/10005.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carasouls.module.css"

function Carasouls() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <img src={image1}  alt="" />
        <img src={image2}  alt="" />
        <img src={image3}  alt="" />
        <img src={image4}  alt="" />
        <img src={image5}   alt="" />
        
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default Carasouls

