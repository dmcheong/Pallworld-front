import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CharacteristicsDropdown from '../components/ProductCharacteristics';

const ProductDetails = () => {
  const { id } = useParams();  // Récupère l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Coeur');
  const navigate = useNavigate();  // Utilisé pour naviguer à une autre page

  const sizesByPosition = {
    Coeur: ['5 x 5 cm', '10 x 10 cm', '15 x 15 cm'],
    Dos: ['20 x 30 cm', '25 x 35 cm', '30 x 40 cm'],
    Face: ['20 x 30 cm', '25 x 35 cm', '30 x 40 cm'],
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    setSelectedSize(sizesByPosition[position][0]);
  };

  const handleBackToCategory = () => {
    const categoryName = product.categories?.[0]?.name || "unknown";
    navigate(`/shop/${categoryName}`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!product) {
    return <p>Produit non trouvé.</p>;
  }

  return (
    <div>
      <Header />

      {/* Bouton Retour */}
      <div className="py-4 px-6">
        <button
          onClick={handleBackToCategory}
          className="text-blue-600 hover:underline text-lg font-medium flex items-center"
        >
          ← Retour à la catégorie
        </button>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row">
          {/* Image du produit */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded-lg shadow-lg" 
            />
          </div>

          {/* Détails du produit */}
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-6">€{product.price}</p>

            {/* Sélection de la taille */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg mb-2">Choisissez votre taille :</label>
              <div className="flex space-x-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <CharacteristicsDropdown characteristics={product.caracteristics} />

            {/* Bouton Personnaliser */}
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300 w-full md:w-auto">
              PERSONNALISER
            </button>
          </div>
        </div>

        {/* Générer votre image */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Générez votre image</h2>
          <textarea 
            className="w-full p-4 border rounded mb-4 h-32" 
            placeholder="Générez un Pal..." 
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors durée-300">
            ENREGISTRER
          </button>
        </section>

        {/* Personnalisez votre produit */}
        <section className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Personnalisez votre produit</h2>
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2">Position :</label>
            <select 
              className="p-2 border rounded mb-4" 
              value={selectedPosition} 
              onChange={(e) => handlePositionChange(e.target.value)}
            >
              {Object.keys(sizesByPosition).map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>

            <label className="block text-gray-700 mb-2">Taille :</label>
            <select 
              className="p-2 border rounded mb-4" 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {sizesByPosition[selectedPosition].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors durée-300">
              AJOUTER DANS LE PANIER
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
