import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mx-auto py-8">
      <Slider {...settings}>
      <div className="px-4">
          <img
            src="https://sanantoniofotos.cl/wp-content/uploads/2023/08/212af5d3-7aa2-404f-bf7f-783437297538-702x336.jpg"
            alt="Slide 1"
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="px-4">
          <img
            src="http://tdinteriorsinc.com/wp-content/uploads/2013/03/landscape-7-800x400.jpg"
            alt="Slide 2"
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="px-4">
          <img
            src="http://tdinteriorsinc.com/wp-content/uploads/2013/03/landscape-7-800x400.jpg"
            alt="Slide 3"
            className="w-full h-96 object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
