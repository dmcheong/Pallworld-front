import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showButton && (
      <button
        onClick={handleScrollTop}
        className="fixed bottom-8 right-8 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 transition duration-300"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
