import React from "react";
import { Link } from "react-router-dom";

function NavbarDemo() {
  return (
    <div>
      <nav className="bg-gray-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="ml-4">
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarDemo;
