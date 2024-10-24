import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/UserSlice'; // Adjust the path as necessary

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/Log-in');
  };

  useEffect(() => {
    if (!user) {
      navigate('/Log-in');
    }
  }, [user, navigate]);

  return (
    user ? (
      <div className="relative">
        <Link to="/account" className="flex items-center text-black">
          <i className="fas fa-user mr-2"></i> My Account
        </Link>
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <Link to="/account" className="block px-4 py-2 text-black hover:bg-gray-200">Profile</Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">Log Out</button>
        </div>
      </div>
    ) : (
      <Link to="/login" className="flex items-center text-black">
        <i className="fas fa-sign-in-alt mr-2"></i> Log In
      </Link>
    )
  );
};

export default MyAccount;