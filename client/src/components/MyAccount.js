import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, toggleDropdown } from "../redux/slices/UserSlice";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract user and dropdown state from user state
  const { user, dropdownOpen, loading } = useSelector((state) => state.user);

  console.log(user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Log-in");
  };

  return (
    <div>
      {user ? (
        <div className="relative inline-block text-left dropdown">
          <button
            onClick={() => dispatch(toggleDropdown())}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Welcome, {user.name}
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  disabled={loading}
                >
                  {loading ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/Log-in">Log In</Link>
        </div>
      )}
    </div>
  );
};

export default MyAccount;