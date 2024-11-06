import React, { useEffect, useState } from "react";
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
  const { categories, status, error } = useSelector((state) => state.categories);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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

  const handleCategoryMouseEnter = (category) => {
    setHoveredCategory(category._id);
  };

  const handleCategoryMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
      <nav className="flex justify-between items-center bg-gray-200 p-4 relative">
        {/* Overlay for dimming the page */}
        <div className="overlay fixed inset-0 bg-black opacity-0 pointer-events-none transition-opacity duration-300 z-40"></div>

        <div className="flex space-x-9">
          <Link to="/" className="hover:underline text-black">
            Home
          </Link>
          <Link to="/" className="hover:underline text-black">
            Contact Us
          </Link>

          {/* Dynamic Categories Dropdown */}
          <div
            className="relative group z-50"
            onMouseEnter={() => {
              document.querySelector(".overlay").classList.add("opacity-50");
              document.querySelector(".overlay").classList.remove("pointer-events-none");
            }}
            onMouseLeave={() => {
              document.querySelector(".overlay").classList.remove("opacity-50");
              document.querySelector(".overlay").classList.add("pointer-events-none");
            }}
          >
            <span className="cursor-pointer hover:underline text-black">
              Categories
            </span>
            {status === "loading" && <Loading />}
            {status === "failed" && (
              <div className="absolute left-0 bg-red-400 p-2">{error}</div>
            )}
            {status === "succeeded" && (
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-md w-48 z-50">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className="px-4 py-2 hover:bg-gray-100 relative group"
                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                    onMouseLeave={handleCategoryMouseLeave}
                  >
                    <Link
                      to={`/${category.name}`}
                      className="text-black"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </Link>
                    {category.sub_categories &&
                      category.sub_categories.length > 0 && hoveredCategory === category._id && (
                        <ul className="absolute left-full top-0 bg-white shadow-md rounded-md w-48 z-50">
                          {category.sub_categories.map((sub) => (
                            <li
                              key={sub._id}
                              className="px-3 py-2 hover:bg-gray-200"
                            >
                              <Link
                                to={`/${sub.name}`}
                                className="text-black"
                                onClick={() => handleSubCategoryClick(sub)}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
};

export default NavBar;