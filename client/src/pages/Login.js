import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/slices/UserSlice";
import Label from "./../components/ui/Label";
import Input from "./../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const { loading, error, user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  
    useEffect(() => {
    const checkoutIntent = sessionStorage.getItem("checkoutIntent");
    
    if (checkoutIntent) {
      setShowCheckoutMessage(true);
      
      // Navigate to checkout if user is already logged in
      if (user) {
        sessionStorage.removeItem("checkoutIntent");
        navigate("/checkout");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);



  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      {showCheckoutMessage && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            Please login to complete your order
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 group">
            <Label id="email" text="Email Address" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus = {true}
              required = {true}
            />
          </div>

          <div className="mb-6 group">
            <Label id="password" text="Password" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required = {true}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 leading-tight" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="flex justify-center space-x-4">
            <a
              href="https://accounts.google.com/InteractiveLogin"
              className="flex items-center justify-center  hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded w-full"
            >
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Log in with Google
            </a>

            <a
              href="https://account.apple.com/sign-in"
              className="flex items-center justify-center  hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded w-full"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple logo"
                className="w-5 h-5 mr-2"
              />
              Log in with Apple
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text">
            No account yet?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
