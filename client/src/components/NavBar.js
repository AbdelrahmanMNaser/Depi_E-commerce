import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import {
  fetchAllCategories,
  selectCategory,
  selectSubCategory,
} from "../redux/slices/CategoriesSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // Fetch categories from API
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, status]);

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category)); // Dispatch selectCategory action
  };

  const handleSubCategoryClick = (sub) => {
    dispatch(selectSubCategory(sub)); // Dispatch selectSubCategory action
  };

  return (
    <nav className="flex justify-between items-center bg-gray-200 p-4">
      <div className="flex space-x-9">
        <Link to="/" className="hover:underline text-black">
          Home
        </Link>
        <Link to="/" className="hover:underline text-black">
          Contact Us
        </Link>

        {/* Dynamic Categories Dropdown */}
        <div className="relative group">
          <span className="cursor-pointer hover:underline text-black">
            Categories
          </span>
          {status === "loading" && <Loading />}
          {status === "failed" && (
            <div className="absolute left-0 bg-red-400 p-2">{error}</div>
          )}
          {status === "succeeded" && (
            <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-md">
              {categories.map((category) => (
                <li key={category._id} className="px-4 py-2 hover:bg-gray-100">
                  <div className="relative group">
                    <Link
                      to={`/${category.name}`} // Use category name here
                      className="text-black"
                      onClick={() => handleCategoryClick(category)} // Handle click
                    >
                      {category.name}
                    </Link>
                    {category.sub_categories &&
                      category.sub_categories.length > 0 && (
                        <ul className="absolute left-full hidden group-hover:block bg-white shadow-md rounded-md">
                          {category.sub_categories.map((sub) => (
                            <li
                              key={sub._id}
                              className="px-3 py-2 hover:bg-gray-200"
                            >
                              <Link
                                to={`/${sub.name}`} // Use subcategory name here
                                className="text-black"
                                onClick={() => handleSubCategoryClick(sub)} // Handle click
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="ml-auto flex space-x-9">
        <Link
          to="/Log-in"
          className="hover:underline text-black p-2 rounded-md hover:bg-gray-200 transition duration-300"
        >
          Log in
        </Link>
        <Link
          to="/Sign-up"
          className="hover:underline text-black p-2 rounded-md hover:bg-gray-200 transition duration-300"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
