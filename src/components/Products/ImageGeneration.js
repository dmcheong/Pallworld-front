import React from 'react';
import { Link } from 'react-router-dom';

const ImageGeneration = ({
  isAuthenticated, 
  handleGenerateImage, 
  handleDownloadImage, 
  generatedImageUrl, 
  loadingImageGeneration, 
  remainingTokens, 
  promptText, 
  setPromptText, 
  imageNotification, 
  imageNotificationType 
}) => {
  return (
    <div>
      {isAuthenticated ? (
        <section id="image-generation-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <h2 className="text-2xl font-bold mb-4">Génération d'image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Colonne gauche : Champ texte et bouton */}
            <div>
              <label className="block text-gray-700 text-lg mb-2">Description pour générer l'image :</label>
              <textarea 
                className="w-full p-2 border rounded mb-2" 
                rows="4" 
                placeholder="Entrez une description pour générer une image"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />

              {generatedImageUrl && (
                <p className="text-xs text-gray-500 mb-4">
                  Note: L'image générée expirera dans 2 heures. Veuillez la télécharger dès que possible.
                </p>
              )}

              {remainingTokens !== null && (
                <p className="mb-4 text-gray-700">Tokens restants : <span className="font-bold">{remainingTokens}</span></p>
              )}

              <button 
                onClick={handleGenerateImage}
                className="mt-2 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
              >
                Générer l'image
              </button>

              {imageNotification && (
                <div className={`p-4 rounded mt-4 text-center ${imageNotificationType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {imageNotification}
                </div>
              )}
            </div>

            {/* Colonne droite : Affichage et téléchargement de l'image générée */}
            <div className="flex flex-col justify-center items-center">
              {loadingImageGeneration ? (
                <div className="flex flex-col items-center">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                  <p className="text-gray-600">Génération de l'image...</p>
                </div>
              ) : (
                generatedImageUrl ? (
                  <>
                    <img 
                      src={generatedImageUrl} 
                      alt="Mon pal" 
                      className="w-full h-56 rounded-lg object-contain mb-4" 
                    />
                    <button
                      onClick={handleDownloadImage}
                      className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
                    >
                      Télécharger l'image générée
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">L'image générée apparaîtra ici.</p>
                )
              )}
            </div>
          </div>
        </section>
      ) : (
        <section id="login-prompt-section" className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <p className='text-lg font-semibold text-gray-700'>
            <Link to="/connexion" className="text-sky-600 hover:underline">
              Connectez-vous
            </Link>
            {' '}pour personnaliser votre produit.
          </p>
        </section>
      )}
    </div>
  );
};

export default ImageGeneration;
