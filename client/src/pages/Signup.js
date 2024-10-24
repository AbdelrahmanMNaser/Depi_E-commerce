import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/UserSlice";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
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
        <div className="flex justify-between mt-4">
          <a
            href="https://accounts.google.com/InteractiveLogin"
            className="w-full bg-red-500 text-white py-2 rounded-lg text-center hover:bg-red-600 transition duration-200 mr-2"
          >
            Login with Google
          </a>
          <a
            href="https://account.apple.com/sign-in"
            className="w-full bg-black text-white py-2 rounded-lg text-center hover:bg-gray-800 transition duration-200 ml-2"
          >
            Login with Apple
          </a>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/Log-in" className="text-blue-500">
            Login
          </ Link>

        </p>
      </div>
    </div>
  );
}

export default Signup;