// Just for testing the UI
import React from "react";
import CategoryItem from "./CategoryItem";

function Categories({ categories }) {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition duration-300 ease-in-out"
              style={{ aspectRatio: "1 / 1" }} // Force square shape
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {category.name}
              </h3>
              <p className="text-gray-500">
                Discover the latest in {category.name}.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                Explore
              </button>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
}

export default Categories;




// Dynamic fetching (the correct final file)


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCategories } from "../redux/slices/categoriesSlice";
// import CategoryItem from "./CategoryItem";

// function Categories() {
//   const dispatch = useDispatch();
//   const { categories, status, error } = useSelector((state) => state.categories); 

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchAllCategories());
//     }
//   }, [dispatch, status]);

//   return (
//     <div className="flex flex-wrap justify-center mt-8 mb-8">
//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {error}</p>}
//       {status === "succeeded" && categories.length > 0 ? (
//         categories.map((category) => (
//           <CategoryItem key={category._id} category={category} />
//         ))
//       ) : (
//         <p>No categories found</p>
//       )}
//     </div>
//   );
// }

// export default Categories;
