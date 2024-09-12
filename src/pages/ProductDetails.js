import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrolltoTopButton from '../components/ScrollToTopButton';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { jwtDecode } from 'jwt-decode';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProductSize, setSelectedProductSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedCustomizationSize, setSelectedCustomizationSize] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const [notification, setNotification] = useState('');
  const [imageNotification, setImageNotification] = useState('');
  const [imageNotificationType, setImageNotificationType] = useState(''); 
  const [promptText, setPromptText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [remainingTokens, setRemainingTokens] = useState(null); 
  const { updateCart } = useContext(CartContext);

  // Vérifier si l'utilisateur est authentifié
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const fetchUserCredits = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/users/${userId}/credits`);
      setRemainingTokens(response.data.credits);
    } catch (error) {
      console.error("Erreur lors de la récupération des crédits:", error);
    }
  };

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

        if (token) {
          const decoded = jwtDecode(token);
          fetchUserCredits(decoded.userId);  // Récupération des crédits de l'utilisateur
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

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

  const scrollToSection = () => {
    const sectionId = isAuthenticated ? "image-generation-section" : "login-prompt-section";
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGenerateImage = async () => {
    try {
      if (!promptText) {
        setImageNotification('Veuillez entrer une description pour générer une image.');
        setImageNotificationType('error');
        return;
      }

      if (!token) {
        setImageNotification("Vous devez être connecté pour générer une image.");
        setImageNotificationType('error');
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const response = await axios.get('http://localhost:3009/generate-image', {
        params: { text: promptText, userId: userId }
      });

      const imageUrl = response.data.imageUrl;
      setGeneratedImageUrl(imageUrl);
      setRemainingTokens(response.data.remainingTokens); // Mise à jour des tokens restants

      setImageNotification('Image générée avec succès !');
      setImageNotificationType('success');
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image:', error);

      if (error.response && error.response.status === 400 && error.response.data.error.includes("tokens")) {
        setImageNotification("Vous n'avez pas assez de tokens pour générer une image.");
      } else if (error.response && error.response.status === 400 && error.response.data.error.includes("safety system")) {
        setImageNotification("Votre description a été rejetée par notre système de sécurité. Veuillez reformuler votre description.");
      } else {
        setImageNotification("Erreur lors de la génération de l'image. Veuillez réessayer.");
      }
      setImageNotificationType('error');
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = async () => {
    if (!generatedImageUrl) { // Vérifie si une image a été générée
      setNotification('Veuillez générer une image avant d\'ajouter le produit au panier.');
      return;
    }
  
    const productDetails = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedProductSize,
      customization: {
        position: selectedPosition,
        customizationSize: selectedCustomizationSize,
        imageUrl: generatedImageUrl,
      },
    };
  
    console.log('Produit ajouté au panier : ', productDetails);
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === productDetails.productId &&
        item.color === productDetails.color &&
        item.size === productDetails.size &&
        item.customization.position === productDetails.position &&
        item.customization.customizationSize === productDetails.customization.customizationSize &&
        item.customization.imageUrl === productDetails.customization.imageUrl
    );
  
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(productDetails);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Produit ajouté au panier local:', cart);
  
    updateCart(cart);
  
    setNotification('Produit ajouté au panier !');
  
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
                value={quantity} 
                onChange={handleQuantityChange} 
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </section>

            {/* Bouton Personnaliser */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <button 
                onClick={scrollToSection}
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

        {/* Section Génération d'image */}
        {isAuthenticated ? (
          <section id="image-generation-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-4">Génération d'image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Colonne gauche : Champ texte et bouton */}
              <div>
                <label className="block text-gray-700 text-lg mb-2">Description pour générer l'image :</label>
                <textarea 
                  className="w-full p-2 border rounded mb-4" 
                  rows="4" 
                  placeholder="Entrez une description pour générer une image"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />

                {/* Affichage des tokens restants */}
                {remainingTokens !== null && (
                  <p className="mb-4 text-gray-700">Tokens restants : <span className="font-bold">{remainingTokens}</span></p>
                )}

                <button 
                  onClick={handleGenerateImage}
                  className="mt-2 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
                >
                  Générer l'image
                </button>

                {/* Notification pour la génération d'image */}
                {imageNotification && (
                  <div className={`p-4 rounded mt-4 text-center ${imageNotificationType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {imageNotification}
                  </div>
                )}

              </div>
              {/* Colonne droite : Affichage de l'image générée */}
              <div className="flex justify-center items-center">
                {generatedImageUrl ? (
                <img 
                  src={generatedImageUrl} 
                  alt="Mon pal" 
                  className="w-full h-56 rounded-lg object-contain" 
                  onError={() => setNotification('Impossible de charger l\'image générée.')}
                />
                ) : (
                  <p className="text-gray-600">L'image générée apparaîtra ici.</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section id="login-prompt-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <p className='text-lg font-semibold text-gray-700'>Connectez-vous pour personnaliser votre produit.</p>
          </section>
        )}

        {/* Section de personnalisation */}
        {isAuthenticated && product.customizationOptions && product.customizationOptions.length > 0 && (
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

            {/* Notification pour l'ajout au panier */}
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
