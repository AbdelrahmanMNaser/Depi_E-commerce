import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const handleProductClick = () => {
    localStorage.setItem("visitedProduct", product._id);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 z-10">
      <Link
        to={`/products/${product.title.replace(/\s+/g, "-")}`}
        className="block"
        onClick={handleProductClick}
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <img
            src={product.imageURLs && product.imageURLs[0]? product.imageURLs[0] : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" }
            alt={product.title}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
          />
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-700 text-base mb-2">
              {product.brand?.name || "N/A"}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-black">
                ${product.unitPrice}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
