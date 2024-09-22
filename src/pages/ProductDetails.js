import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrolltoTopButton from '../components/ScrollToTopButton';
import { CartContext } from '../context/CartContext';
import { jwtDecode } from 'jwt-decode';
import ProductImages from '../components/Products/ProductImages';
import ProductOptions from '../components/Products/ProductOptions';
import ImageGeneration from '../components/Products/ImageGeneration';
import CharacteristicsDropdown from '../components/Products/ProductCharacteristics'; 
import ProductCustomization from '../components/Products/ProductCustomization'; 

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProductSize, setSelectedProductSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedCustomizationSize, setSelectedCustomizationSize] = useState('');
  const [promptText, setPromptText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [remainingTokens, setRemainingTokens] = useState(null); 
  const { updateCart } = useContext(CartContext);
  const [loadingImageGeneration, setLoadingImageGeneration] = useState(false);
  const [notification, setNotification] = useState(''); 
  const [notificationType, setNotificationType] = useState('');

  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/products/${id}`);
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
          fetchUserCredits(decoded.userId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        setLoading(false);
      }
    };

    const fetchUserCredits = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BDD_API}/api/users/${userId}/credits`);
        setRemainingTokens(response.data.credits);
      } catch (error) {
        console.error("Erreur lors de la récupération des crédits:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
        setNotificationType('');
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [notification]);

  const handleAddToCart = () => {
    if (!generatedImageUrl) {
      setNotification('Veuillez générer une image avant d\'ajouter le produit au panier.');
      setNotificationType('error');
      return;
    }

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
        imageUrl: generatedImageUrl,
      },
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === productDetails.productId &&
        item.color === productDetails.color &&
        item.size === productDetails.size &&
        item.customization.position === productDetails.customization.position &&
        item.customization.customizationSize === productDetails.customization.customizationSize &&
        item.customization.imageUrl === productDetails.customization.imageUrl
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(productDetails);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(cart);

    setNotification('Produit ajouté au panier avec succès !');
    setNotificationType('success');
  };

  const handleGenerateImage = async () => {
    try {
      if (!promptText) {
        setNotification('Veuillez entrer une description pour générer une image.');
        setNotificationType('error');
        return;
      }

      setLoadingImageGeneration(true);
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_IA_REQUEST}/generate-image`, {
        params: { text: promptText, userId: userId }
      });

      const imageUrl = response.data.imageUrl;
      setGeneratedImageUrl(imageUrl);
      setRemainingTokens(response.data.remainingTokens);

      setNotification('Image générée avec succès !');
      setNotificationType('success');

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error.includes("tokens")) {
        setNotification("Vous n'avez plus assez de tokens pour générer une image.");
      } else if (error.response && error.response.status === 400 && error.response.data.error.includes("safety system")) {
        setNotification("Votre description a été rejetée par notre système de sécurité. Veuillez reformuler.");
      } else {
        setNotification("Erreur lors de la génération de l'image.");
      }
      setNotificationType('error');
    } finally {
      setLoadingImageGeneration(false);
    }
  };

  const handleDownloadImage = () => {
    window.open(generatedImageUrl, '_blank'); 
  };

  const scrollToCustomization = () => {
    const customizationSection = document.getElementById('customization-section');
    if (customizationSection) {
      customizationSection.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Notifications/alertes */}
      {notification && (
        <div className={`fixed top-36 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-center shadow-lg z-50 ${notificationType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {notification}
        </div>
      )}

      {isAuthenticated && remainingTokens !== null && (
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <p className="text-gray-700">Vous avez <span className="font-bold text-sky-600">{remainingTokens}</span> tokens restants.</p>
        </div>
      )}

      <main className="container mx-auto py-12 px-6 lg:px-16">
        {/* File d'Ariane */}
        <nav className="text-gray-600 mb-8 break-words">
          <ul className="flex flex-wrap space-x-2">
            <li><Link to="/" className="hover:underline hover:text-sky-600">Accueil</Link></li>
            <li>/</li>
            <li><Link to={`/shop/${product.category[0]?.name}`} className="hover:underline hover:text-sky-600">{capitalizeFirstLetter(product.category[0]?.name)}</Link></li>
            <li>/</li>
            <li className="text-sky-600 font-semibold">{product.name}</li>
          </ul>
        </nav>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image principale et miniatures */}
          <ProductImages 
            images={product.images} 
            selectedImage={selectedImage} 
            handleImageClick={setSelectedImage} 
          />

          {/* Détails du produit */}
          <section className="p-8">
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center space-x-4">
                  <p className="text-red-500 line-through text-xl">€{product.price}</p>
                  <p className="text-sky-600 text-3xl font-bold">€{product.discountPrice}</p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-sky-600">€{product.price}</p>
              )}
            </div>

            {/* Sélection des couleurs et tailles */}
            <ProductOptions
              colors={product.colors}
              sizes={product.sizes}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedProductSize={selectedProductSize}
              setSelectedProductSize={setSelectedProductSize}
            />

            {/* Bouton Personnaliser */}
            {isAuthenticated && (
              <button
              onClick={scrollToCustomization}
              className="mt-4 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
              >
              Personnaliser
              </button>
            )}
          </section>
        </section>

        {/* Accordéon des caractéristiques */}
        {product.characteristics && (
          <section className="bg-white shadow-lg rounded-lg p-4 mt-8">
            <CharacteristicsDropdown characteristics={product.characteristics} />
          </section>
        )}

        {/* Génération d'images */}
        <ImageGeneration 
          isAuthenticated={isAuthenticated}
          handleGenerateImage={handleGenerateImage}
          handleDownloadImage={handleDownloadImage}
          generatedImageUrl={generatedImageUrl}
          loadingImageGeneration={loadingImageGeneration}
          remainingTokens={remainingTokens}
          promptText={promptText}
          setPromptText={setPromptText}
        />

        {/* Section Personnalisation */}
        {isAuthenticated && product.customizationOptions && (
          <ProductCustomization
            customizationOptions={product.customizationOptions}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            selectedCustomizationSize={selectedCustomizationSize}
            setSelectedCustomizationSize={setSelectedCustomizationSize}
            handleAddToCart={handleAddToCart}
          />
        )}

        <ScrolltoTopButton />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
