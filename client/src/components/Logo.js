import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img src="logo.png" alt="Logo" className="w-30 h-20 rounded-full" />
      </Link>
    </div>
  );
};

export default Logo;
