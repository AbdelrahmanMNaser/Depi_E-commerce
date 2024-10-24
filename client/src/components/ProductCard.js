// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-4">
      <Link to={`/products/${product.title}`} className="block"> {/* Link using _id */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <img
            src={product.imageURLs[0]}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 line-clamp-2">{/* Limit title to 2 lines */}
              {product.title}
            </h2>
            <p className="text-gray-700 text-base mb-2">{product.brand?.name || "N/A"}</p> {/* Handle missing brand */}
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-black">${product.unitPrice}</p> {/* Add $ sign */}
              {/* Optional: Add to cart button or other actions here */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;