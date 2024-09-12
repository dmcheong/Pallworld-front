import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarMenu from '../components/UserSidebar';
import { jwtDecode } from 'jwt-decode';
import { FaTrashAlt } from 'react-icons/fa';

const GeneratedImagesHistory = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGeneratedImages = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non disponible');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.get(`http://localhost:3005/api/generatedImages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: 8 }  // Pagination avec un limit de 8 images par page
      });

      setImages(response.data.images);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des images générées :', error);
      setError('Impossible de récupérer les images générées. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non disponible');
      }

      await axios.delete(`http://localhost:3005/api/generatedImages/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Après suppression, recharger les images pour la page actuelle
      fetchGeneratedImages(currentPage);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image :', error);
      setError('Erreur lors de la suppression de l\'image. Veuillez réessayer plus tard.');
    }
  };

  useEffect(() => {
    fetchGeneratedImages(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p className="text-center mt-8">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row flex-1">
        <SidebarMenu />

        <div className="flex-1 mt-6 md:mt-0 md:ml-8">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-sky-600">Historique des images générées</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {images.length === 0 ? (
              <p className="text-gray-600">Vous n'avez pas encore généré d'images.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div key={image._id} className="bg-gray-100 p-4 rounded-lg shadow relative">
                    <img src={image.imageUrl} alt="Pal générée" className="w-full h-auto rounded-md mb-2" />
                    <p className="text-gray-600">Générée le : {new Date(image.dateGenerated).toLocaleDateString()}</p>
                    <p className="text-gray-600">Prompt utilisé : {image.promptUsed}</p>
                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors duration-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GeneratedImagesHistory;
