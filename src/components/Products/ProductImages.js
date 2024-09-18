import React from 'react';

const ProductImages = ({ images, selectedImage, handleImageClick }) => {
  return (
    <section className="relative flex flex-col items-center">
      <div className="relative w-full">
        <img 
          src={selectedImage} 
          alt="Produit" 
          className="w-full h-auto object-contain rounded-lg" 
          style={{ maxHeight: '600px' }}
        />
      </div>
      <div className="mt-4 flex space-x-2">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Produit ${index}`} 
            onClick={() => handleImageClick(img)} 
            className={`w-16 h-16 object-cover rounded-lg border-2 ${selectedImage === img ? 'border-sky-600' : 'border-white'} shadow cursor-pointer hover:opacity-80 transition-opacity`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductImages;
