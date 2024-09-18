import React from 'react';
import sideImage from '../../assets/pals.jpg';

const SideImage = ({ alt }) => (
  <div className="md:w-1/4 hidden md:block">
    <img 
      src={sideImage} 
      alt={alt} 
      className="w-full h-full object-cover" 
    />
  </div>
);

export default SideImage;
