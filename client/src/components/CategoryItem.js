import React from "react";

function CategoryItem({ category }) {
  return (
    <div className="flex flex-col items-center m-4">
      <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
        <img
          src={category.imageURL}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{category.name}</h2>
    </div>
  );
}

export default CategoryItem;
