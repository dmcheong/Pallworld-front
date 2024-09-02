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
          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 1"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 1</h3>
              <p className="mt-2">€19.99</p>
            </div>
          </div>

          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 2"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 2</h3>
              <p className="mt-2">€29.99</p>
            </div>
          </div>

          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 3"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 3</h3>
              <p className="mt-2">€39.99</p>
            </div>
          </div>

          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 4"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 4</h3>
              <p className="mt-2">€49.99</p>
            </div>
          </div>

          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 5"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 5</h3>
              <p className="mt-2">€59.99</p>
            </div>
          </div>

          <div className="p-4">
            <div className="border rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:z-10">
              <img
                src={comingsoon}
                alt="Produit 6"
                className="h-56 w-full object-cover mb-4 rounded-lg transform transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold">Produit 6</h3>
              <p className="mt-2">€69.99</p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
