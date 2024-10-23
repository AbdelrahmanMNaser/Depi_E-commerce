import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white font-bold">
            <Link to="/">Every</Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="text-white hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
