import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-1/2">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;