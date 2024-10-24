import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../redux/slices/categoriesSlice";
import CategoryItem from "./CategoryItem";

function Categories() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories); 

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-wrap justify-center mt-8 mb-8">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && categories.length > 0 ? (
        categories.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
}

export default Categories;
