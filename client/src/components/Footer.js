import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, selectSubCategory } from "../redux/slices/CategoriesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Logo from "./Logo";


const Footer = () => {
  const dispatch = useDispatch();

  // Get categories from the Redux store
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCategories()); // Fetch categories if they haven't been loaded yet
    }
  }, [dispatch, status]);

  const handleSubCategoryClick = (sub) => {
    dispatch(selectSubCategory(sub)); // Dispatch selectSubCategory action
  }

  return (
    <footer className="bg-gray-700 text-white py-4 md:py-6 inset-x-0 bottom-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
        {/* Logo */}
        <div className="text-center md:text-left">
          <Logo />
          <p className="text-gray-400 text-sm">
            Your trusted e-commerce platform for all your needs.
          </p>
        </div>

        {/* Dynamic Categories */}
        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          {status === "loading" && <p>Loading categories...</p>}
          {status === "failed" && <p>{error}</p>}
          {status === "succeeded" &&
            categories.map((category) => (
              <div key={category._id}>
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <ul className="space-y-1">
                  {category.sub_categories.map((sub) => (
                    <li key={sub._id}>
                      <Link
                        to={`/${sub.name}`}
                        className="hover:underline text-gray-300"
                        onClick={handleSubCategoryClick} 
                        >
                        {sub.name}
                        </Link>

                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Contact Us & Social Media */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">Phone: +0 (000) 000-0000</p>
          <p className="text-gray-300 mb-6">Email: info@DepiEcomm.com</p>

          {/* Social Media Icons */}
          <p className="text-lg font-bold mb-4">Join Us</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" className="text-blue-500 hover:text-blue-400">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://instagram.com" className="text-pink-600 hover:text-pink-500">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        All rights reserved © { new Date().getFullYear() }
      </div>
    </footer>
  );
};

export default Footer;
