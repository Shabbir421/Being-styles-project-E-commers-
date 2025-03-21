/** @format */

import React, { useEffect, useState } from "react";
import MyOrderPage from "./MyOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section - User Profile */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="text-gray-600">
              <p>
                <strong>Name:</strong> {user?.name || "Guest User"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "Not Provided"}
              </p>
            </div>

            {/* Logout Button */}

            <button
              onClick={handleLogout}
              className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>

          {/* Right Section - Order Table */}
          <div className="w-full md:w-1/2 lg:w-3/4 shadow-md bg-white rounded-lg ">
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
