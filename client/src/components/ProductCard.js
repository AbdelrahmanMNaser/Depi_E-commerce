import React from 'react';

function ProductCard({ product }) {

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="bg-white rounded-md overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-base">{product.title}</div>
            <div className="text-xl font-semibold text-black">{product.unitPrice}</div>
          </div>
          <p className="text-gray-700 text-base">{product.brand.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;