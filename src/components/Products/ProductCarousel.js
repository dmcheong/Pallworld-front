import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/products`);
        console.log(response.data);
        setProducts(response.data.products.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: true,
        }
      }
    ]
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <section className="py-16 bg-sky-600 text-white container-carousel">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">NOTRE SÉLECTION</h2>
      
      <div className="container mx-auto">
        <Slider {...settings}>
          {products.map((product) => (
            product.images && product.images[0] && product.name ? (
              <div key={product._id} className="p-4">
                <div 
                  className="border rounded-lg p-4 flex flex-col items-center shadow-lg transform transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-72 w-full object-contain mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2">€{product.price}</p>
                </div>
              </div>
            ) : (
              <div key={product._id} className="p-4">
                <p className="text-red-500">Produit invalide</p>
              </div>
            )
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
