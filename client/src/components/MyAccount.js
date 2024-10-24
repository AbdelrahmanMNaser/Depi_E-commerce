import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/UserSlice"; // Adjust the path as necessary

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Add this state

  console.log("User:", user);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Set logging out to true before dispatching
    await dispatch(logout()); // Wait for logout to complete
    navigate("/Log-in");
  };

  useEffect(() => {
    if (!user && !isLoggingOut) {
      // Check isLoggingOut
      navigate("/Log-in");
    }
  }, [user, navigate, isLoggingOut]); // Add isLoggingOut to dependencies

  // Conditionally render based on user and isLoggingOut
  if (isLoggingOut) {
    return null; // Or a loading indicator: <div>Logging out...</div>
  }

  return user ? (
    <div className="relative group">
      <i className="fas fa-user mr-2"></i> My Account
      <div className="absolute right-0  w-48 bg-white border rounded shadow-lg hidden group-hover:block">
        <Link
          to="/profile"
          className="block px-4 py-2 text-black hover:bg-gray-200"
        >
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
        >
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <Link to="/Log-in" className="flex items-center text-black">
      <i className="fas fa-sign-in-alt mr-2"></i> Log In
    </Link>
  );
};

export default MyAccount;
