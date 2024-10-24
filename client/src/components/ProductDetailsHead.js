import { useState } from 'react';
import {  StarIcon } from '@heroicons/react/20/solid';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsHead({ product }) {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div className="fixed top-0 inset-x-0 flex items-start justify-center mt-4">
      <div className="flex w-full max-w-6xl justify-center">
        <div className="flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 h-100 w-80">
          <img alt={product.imageAlt} src={product.imageSrc} className="object-cover object-center w-full h-full" />
        </div>
        <div className="flex flex-col justify-center p-4 w-1/2 mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading" className="sr-only">Product information</h3>
            <p className="text-2xl text-gray-900">{product.price}</p>
            <div className="mt-4">
              <p className="text-gray-500">{product.description}</p>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className="mt-6">
            <label htmlFor="quantity" className="sr-only">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 text-center border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-6 space-y-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
