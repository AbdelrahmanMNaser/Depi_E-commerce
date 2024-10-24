import React from 'react';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="group relative cursor-pointer flex-shrink-0">
      <Link to={`/product/${product.id}`} state={{ product }}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
