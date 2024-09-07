import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrolltoTopButton from '../components/ScrollToTopButton';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // Par défaut, sélectionner la première image
        setLoading(false);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.customizationOptions && response.data.customizationOptions.length > 0) {
          setSelectedPosition(response.data.customizationOptions[0].position);
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
    setSelectedSize(selectedOption.sizes[0]);
  };

  const handleBackToCategory = () => {
    const categoryName = product.category?.[0]?.name || "unknown";
    navigate(`/shop/${categoryName}`);
  };

  const toggleCharacteristics = () => {
    setShowCharacteristics(!showCharacteristics);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); // Changer l'image principale lorsqu'une miniature est cliquée
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!product) {
    return <p>Produit non trouvé.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto py-12 px-6 lg:px-16">
        {/* Bouton Retour */}
        <section className="mb-8">
          <button
            onClick={handleBackToCategory}
            className="text-sky-600 hover:underline text-lg font-medium flex items-center"
          >
            ← Retour à la catégorie
          </button>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image du produit */}
          <section className="relative">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {product.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${product.name} ${index}`} 
                  onClick={() => handleImageClick(img)} // Image cliquable pour changer l'image principale
                  className={`w-16 h-16 object-cover rounded-lg border-2 ${selectedImage === img ? 'border-sky-600' : 'border-white'} shadow cursor-pointer hover:opacity-80 transition-opacity`}
                />
              ))}
            </div>
          </section>

          {/* Détails du produit */}
          <section className="p-8">
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-sky-600 mb-8">€{product.price}</p>

            {/* Sélection de la couleur */}
            {product.colors && product.colors.length > 0 && (
              <section className="mb-6">
                <label className="block text-gray-700 text-lg mb-2">Couleurs disponibles :</label>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button 
                      key={color} 
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border ${selectedColor === color ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
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
                <div className="grid grid-cols-3 gap-4">
                  {product.sizes.map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border ${selectedSize === size ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} cursor-pointer`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Dropdown des caractéristiques du produit */}
            {product.characteristics && (
              <section className="mb-8">
                <button 
                  onClick={toggleCharacteristics}
                  className="text-lg font-semibold text-gray-700 flex justify-between items-center w-full px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-100"
                >
                  <span>Caractéristiques</span>
                  <span>{showCharacteristics ? '⮝' : '⮟'}</span>
                </button>
                {showCharacteristics && (
                  <ul className="mt-4 text-gray-700">
                    {product.characteristics.split('\n').map((charac, index) => (
                      <li key={index} className="mb-2">{charac.trim()}</li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Section de personnalisation */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Personnalisation</h2>

                {/* Dropdowns de personnalisation : 2 lignes sur mobile */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
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

                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 text-lg mb-2">Taille de personnalisation :</label>
                    <select 
                      className="p-2 border rounded mb-4 w-full" 
                      value={selectedSize} 
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      {product.customizationOptions
                        .find(option => option.position === selectedPosition)
                        .sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bouton Ajouter au Panier */}
                <button className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300 w-full md:w-auto">
                  Ajouter au panier
                </button>
              </section>
            )}
          </section>
        </section>

        <ScrolltoTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
