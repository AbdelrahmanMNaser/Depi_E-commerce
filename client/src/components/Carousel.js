import React, { useEffect, useState } from "react";
import image1 from '../assets/1.jpeg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/4.jpeg';

const Carousel = () => {
  // Image array
  const images = [image1, image2, image3, image4];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [currentImage]);

  return (
    <div className="relative h-96 w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-lg ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg opacity-75 hover:opacity-100 hover:bg-gray-700 transition-all duration-300"
        aria-label="Previous Slide"
      >
        &#8249;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg opacity-75 hover:opacity-100 hover:bg-gray-700 transition-all duration-300"
        aria-label="Next Slide"
      >
        &#8250;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentImage
                ? "bg-white shadow-md"
                : "bg-gray-400 opacity-50 hover:opacity-100"
            } transition-opacity duration-300`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;