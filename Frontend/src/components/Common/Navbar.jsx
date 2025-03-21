/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const products = useSelector((state) => state.cart?.cart?.products || []);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };
  const toggleCartDrawer = () => {
    setdrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 ">
        {/* left logo  */}
        <div>
          <Link to="/" className="text-2xl font-medium ">
            {" "}
            Being Style
          </Link>
        </div>
        {/* center  -navigation link  */}
        <div className="hidden md:flex space-x-6 ">
          <Link
            to="/collections/all?gender=Men"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase">
            men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase">
            women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase">
            top wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase">
            bottom wear
          </Link>
        </div>
        {/* right - icons  */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm text-white  bg-black px-2 rounded capitalize">
              admin
            </Link>
          )}

          <Link
            to="/profile"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase">
            <HiOutlineUser className="h-6 w-6 text-gray-700 " />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* search icons  */}
          <div className="overflow-hidden ">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className=" h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* mobile navigation  */}

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:h-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50  ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black">
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black">
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black">
              Top wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black">
              Bootom wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
