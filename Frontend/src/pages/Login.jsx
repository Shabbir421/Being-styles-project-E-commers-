/** @format */

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter
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
  }, [user, guestId, cart, dispatch, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(loginUser({ email, password }));
    setLoading(false);
  };

  return (
    <div className="flex">
      {/* Left Side - Login Form */}
      <div className="flex w-full md:w-1/2 flex-col p-8 md:p-12 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
          <p className="text-center mb-6">Enter your email and password</p>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-1 bg-black rounded text-white"
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-sm text-blue-500">
              Registration
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://th.bing.com/th/id/OIP.ce10CJ1mIlabyHlnW7ZXNAHaE6?w=744&h=493&rs=1&pid=ImgDetMain"
            alt="Login Illustration"
            className="w-full h-[550px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
