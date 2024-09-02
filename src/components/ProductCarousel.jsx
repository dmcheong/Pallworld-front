import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import comingsoon from '../assets/coming-soon.jpg';

const ProductCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="py-8 bg-sky-600 text-white">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">NOTRE SELECTION</h2>
      
      <div className="container mx-auto">
        <Slider {...settings}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="border rounded-lg p-4 flex flex-col items-center shadow-lg transform transition-transform duration-300 hover:scale-105 hover:z-10">
                <img
                  src={comingsoon}
                  alt={`Produit ${index + 1}`}
                  className="h-56 w-full object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold">Produit {index + 1}</h3>
                <p className="mt-2">€{19.99 + index}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
