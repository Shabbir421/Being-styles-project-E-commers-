/** @format */

import React from "react";
import {
  FaUser,
  FaBox,
  FaShoppingCart,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";


const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Logo / Brand */}
      <div className="mb-6 flex items-center space-x-2">
        {/* Replace with an actual logo image if needed */}
        <span className="text-2xl font-bold">🛍️</span>
        <Link to="/admin" className="text-xl font-medium text-white">
          Being Style
        </Link>
      </div>

      {/* Admin Dashboard Heading */}
      <div className="text-xl font-medium mb-6 text-center">
        Admin Dashboard
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <FaUser className="text-white" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <FaBox className="text-white" />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <FaShoppingCart className="text-white" />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/shop"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <FaStore className="text-white" />
          <span>Shop</span>
        </NavLink>

        {/* Logout Button in Red */}
        <button
          to="/logout"
          onClick={handleLogout}
          className="py-3 px-4 rounded flex items-center space-x-2 text-red-500 hover:bg-red-700 hover:text-white">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
