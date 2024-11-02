import React, { useState } from "react";

function ProductImageGallery({ imageURLs, title }) {
  const [selectedImage, setSelectedImage] = useState(imageURLs[0]);

  if (!imageURLs || imageURLs.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 h-80 w-80">
          <img
            alt="Placeholder"
            src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 overflow-hidden rounded-lg  h-80 w-80">
        <img
          alt={title}
          src={selectedImage}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="flex mt-4 space-x-4">
        {imageURLs.map((url, index) => (
          <div
            key={index}
            className={`relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${
              selectedImage === url ? "ring-2 ring-gray-900" : ""
            }`}
            onClick={() => setSelectedImage(url)}
          >
            <img
              src={url}
              alt={`${title} thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;
