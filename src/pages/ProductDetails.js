import React, { useState, useEffect, useContext  } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrolltoTopButton from '../components/ScrollToTopButton';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartContext } from '../context/CartContext'; 

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProductSize, setSelectedProductSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedCustomizationSize, setSelectedCustomizationSize] = useState(''); 
  const [selectedImage, setSelectedImage] = useState('');
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const [notification, setNotification] = useState('');
  const { cart, updateCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); 
        setLoading(false);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedProductSize(response.data.sizes[0]);
        }
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.customizationOptions && response.data.customizationOptions.length > 0) {
          setSelectedPosition(response.data.customizationOptions[0].position);
          setSelectedCustomizationSize(response.data.customizationOptions[0].customizationSize[0]); 
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    const selectedOption = product.customizationOptions.find(option => option.position === position);
    setSelectedCustomizationSize(selectedOption.customizationSize[0]);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); 
  };

  const toggleCharacteristics = () => {
    setShowCharacteristics(!showCharacteristics);
  };

  const scrollToCustomization = () => {
    const element = document.getElementById("customization-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleAddToCart = async () => {
    const productDetails = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        color: selectedColor,
        size: selectedProductSize,
        customization: {
            position: selectedPosition,
            customizationSize: selectedCustomizationSize,
        },
    };

    console.log('Produit ajouté au panier : ', productDetails);

    // Stocker le panier dans le localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(
        (item) =>
            item.productId === productDetails.productId &&
            item.color === productDetails.color &&
            item.size === productDetails.size &&
            item.customization.position === productDetails.position &&
            item.customization.customizationSize === productDetails.customization.customizationSize
    );

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(productDetails);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Produit ajouté au panier local:', cart);

    // Mettre à jour le contexte avec le nouveau panier
    updateCart(cart);

    // Affichage de la notification
    setNotification('Produit ajouté au panier !');

    // Masquer la notification après 3 secondes
    setTimeout(() => {
        setNotification('');
    }, 3000);
};


  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!product) {
    return <p>Produit non trouvé.</p>;
  }

  // Formatage de la première lettre de la catégorie en majuscule
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto py-12 px-6 lg:px-16">
        {/* File d'Ariane */}
        <nav className="text-gray-600 mb-8">
          <ul className="flex space-x-2">
            <li><Link to="/" className="hover:underline hover:text-sky-600">Accueil</Link></li>
            <li>/</li>
            <li><Link to={`/shop/${product.category[0]?.name}`} className="hover:underline hover:text-sky-600">{capitalizeFirstLetter(product.category[0]?.name)}</Link></li>
            <li>/</li>
            <li className='text-sky-600 font-semibold'>{product.name}</li>
          </ul>
        </nav>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image du produit */}
          <section className="relative flex flex-col items-center">
            <div className="relative w-full">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-auto object-contain rounded-lg" 
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="mt-4 flex space-x-2">
              {product.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${product.name} ${index}`} 
                  onClick={() => handleImageClick(img)} 
                  className={`w-16 h-16 object-cover rounded-lg border-2 ${selectedImage === img ? 'border-sky-600' : 'border-white'} shadow cursor-pointer hover:opacity-80 transition-opacity`}
                />
              ))}
            </div>
          </section>

          {/* Détails du produit */}
          <section className="p-8">
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-sky-600 mb-6">€{product.price}</p>

            {/* Sélection de la couleur */}
            {product.colors && product.colors.length > 0 && (
              <section className="mb-6">
                <label className="block text-gray-700 text-lg mb-2">Couleurs disponibles :</label>
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
                  {product.colors.map((color) => (
                    <button 
                      key={color} 
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border ${selectedColor === color ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Sélection de la taille */}
            {product.sizes && product.sizes.length > 0 && (
              <section className="mb-6">
                <label className="block text-gray-700 text-lg mb-2">Taille ou format :</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedProductSize(size)} 
                      className={`px-6 py-2 rounded-lg text-sm border ${selectedProductSize === size ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Quantité */}
            <section className="">
              <label className="block text-gray-700 text-lg mb-2">Quantité :</label>
              <select 
                className="p-2 border rounded mb-4 w-20" 
                value={1} 
                onChange={(e) => console.log(`Quantité sélectionnée : ${e.target.value}`)}
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={i+1}>{i+1}</option>
                ))}
              </select>
            </section>

            {/* Bouton Personnaliser */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <button 
                onClick={scrollToCustomization}
                className="mt-4 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
              >
                Personnaliser
              </button>
            )}
          </section>
        </section>

        {/* Section Caractéristiques avec Accordéon */}
        {product.characteristics && (
          <section className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <button 
              onClick={toggleCharacteristics}
              className="text-lg font-semibold text-gray-700 flex justify-between items-center w-full py-2 rounded-lg focus:outline-none"
            >
              <span>Caractéristiques</span>
              <span className='text-lg'>{showCharacteristics ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {showCharacteristics && (
              <ul className="mt-4 text-gray-700 text-md leading-relaxed">
                {product.characteristics.split('\n').map((charac, index) => (
                  <li key={index}>{charac.trim()}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Section de personnalisation */}
        {product.customizationOptions && product.customizationOptions.length > 0 && (
          <section id="customization-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-4">Personnalisation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-gray-700 text-lg mb-2">Position :</label>
                <select 
                  className="p-2 border rounded mb-4 w-full" 
                  value={selectedPosition} 
                  onChange={(e) => handlePositionChange(e.target.value)}
                >
                  {product.customizationOptions.map((option) => (
                    <option key={option.position} value={option.position}>{option.position}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-lg mb-2">Taille de personnalisation :</label>
                <select 
                  className="p-2 border rounded mb-4 w-full" 
                  value={selectedCustomizationSize} 
                  onChange={(e) => setSelectedCustomizationSize(e.target.value)}
                >
                  {product.customizationOptions
                    .find(option => option.position === selectedPosition)
                    .customizationSize.map((size) => (  
                      <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleAddToCart} className="mt-4 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300">
              Ajouter au panier
            </button>

            {/* Notification */}
            {notification && (
              <div className="bg-green-500 text-white p-4 rounded mt-4 text-center">
                {notification}
              </div>
            )}
          </section>
        )}

        <ScrolltoTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
