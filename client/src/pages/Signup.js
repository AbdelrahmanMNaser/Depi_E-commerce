import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Label from "./../components/ui/Label";
import Input from "../components/ui/Input";

const { signup } = require("../redux/slices/UserSlice");

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Send signup request to the server by slice

    dispatch(signup({ name, email, password }));

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Label text={"Name"} id={"name"} />
            <Input
              id={"name"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Full Name"
              autoFocus={true}
              required={true}
            />
          </div>
          <div className="mb-4">
            <Label text={"Email"} id={"email"} />
            <Input
              id={"email"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required={true}
            />
          </div>
          <div className="mb-6">
            <Label text={"Password"} id={"password"} />
            <Input
              id={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required={true}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <div className="mt-6">
          <div className="flex justify-center space-x-4">
            <a
              href="https://accounts.google.com/InteractiveLogin"
              className="flex items-center justify-center hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded w-full"
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
              className="flex items-center justify-center hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded w-full"
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
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
