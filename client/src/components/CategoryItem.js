import React from "react";
import { Link } from 'react-router-dom';

function CategoryItem({ category }) {
  return (
    <div className="flex flex-col items-center m-4 transition duration-400 ease-in-out transform hover:scale-105">
      <Link to={`/${category.name}`}>
      <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 ">
        <img
          src={category.imageURL}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{category.name}</h2>
      </Link>
    </div>
  );
}

export default CategoryItem;
