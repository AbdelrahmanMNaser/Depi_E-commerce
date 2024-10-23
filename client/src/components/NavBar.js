import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../redux/slices/categoriesSlice"; // Ensure this is the correct path for the thunk action

const NavBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error); 

  useEffect(() => {
    // Fetch categories from API 
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
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
          {status === "loading" && <div className="absolute left-0 bg-white p-2">Loading categories...</div>}
          {status === "failed" && <div className="absolute left-0 bg-red-100 p-2">{error}</div>}
          {status === "succeeded" && (
            <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-md mt-2">
              {categories.map((category) => (
                <li key={category.id} className="px-4 py-2 hover:bg-gray-100">
                  <div className="relative group">
                    <Link to={`/categories/${category.id}`} className="text-black">
                      {category.name}
                    </Link>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <ul className="absolute left-full hidden group-hover:block bg-white shadow-md rounded-md mt-2">
                        {category.subcategories.map((sub) => (
                          <li
                            key={sub.id}
                            className="px-4 py-2 hover:bg-gray-100"
                          >
                            <Link
                              to={`/categories/${category.id}/${sub.id}`}
                              className="text-black"
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
        <Link to="/Log-in" className="hover:underline text-black p-2 rounded-md hover:bg-gray-200 transition duration-300">
          Log in
        </Link>
        <Link to="/Sign-up" className="hover:underline text-black p-2 rounded-md hover:bg-gray-200 transition duration-300">
          Sign up
        </Link>
    </div>
    </div>
  );
};

export default NavBar;
