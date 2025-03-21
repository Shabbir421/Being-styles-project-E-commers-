/** @format */

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice"; // 
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (user) {
      if (cart.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(redirect.includes("checkout") ? "/checkout" : "/");
        });
      } else {
        navigate(redirect.includes("checkout") ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart.length, dispatch, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Registration Form */}
      <div className="flex w-full md:w-1/2 flex-col p-8 md:p-12 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h2>
          <p className="text-center mb-6">
            Fill in the details below to register
          </p>

          {/* Full Name Input */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Display Redux Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-black rounded-md text-white">
            Sign Up
          </button>

          {/* Already have an account? Login */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-sm text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://th.bing.com/th/id/OIP.JOYstOlxXRSeGEdzxU6FIAHaEK?rs=1&pid=ImgDetMain"
            alt="Register Illustration"
            className="w-full h-[650px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
