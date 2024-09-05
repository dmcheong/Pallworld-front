import React from 'react';
import sideImage from '../assets/pals.jpg';

const SideImage = ({ src, alt }) => (
  <div className="md:w-1/2 p-4 hidden md:flex items-center">
    <img 
      src={sideImage} 
      alt={alt} 
      className="w-full h-auto max-h-[415px] min-h-[200px] object-cover rounded-lg" 
    />
  </div>
);

export default SideImage;
