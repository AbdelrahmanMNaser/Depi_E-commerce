import React, { useRef } from 'react'
import ProductCard from './CardNew'; // Adjust the import path as needed

export default function ProductList({products}) {
    const scrollContainerRef = useRef(null);
  
    const handleScroll = (direction) => {
      const { current } = scrollContainerRef;
      if (direction === 'left') {
        current.scrollLeft -= 200;
      } else {
        current.scrollLeft += 200;
      }
    };
  
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
          <div className="relative mt-6">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            >
              &lt;
            </button>
            <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    );
  }