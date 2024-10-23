import React from 'react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  return (
    <Link to="/" className="flex items-center text-black">
      <i className="fas fa-user mr-2"></i> My Account
    </Link>
  );
};

export default MyAccount;