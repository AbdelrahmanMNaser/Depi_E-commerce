import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import MyCart from './MyCart';
import MyAccount from './MyAccount';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      {/* Top part of header */}
      <div className="flex justify-between items-center p-4">
        <Logo />
        <SearchBar />
        <div className="flex space-x-4">
          <MyCart />
          <MyAccount />
        </div>
      </div>

      {/* Bottom part of header */}
      <NavBar />
    </header>
  );
};

export default Header;
