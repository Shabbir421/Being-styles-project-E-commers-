/** @format */
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleChekout = () => {
    toggleCartDrawer();
    if (!user && !guestId) {
      navigate("/login/?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[20rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0 " : "translate-x-full "
      }`}>
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart Content */}
      <div className="overflow-y-auto flex-grow p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {Array.isArray(cart?.products) && cart.products.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty.</p>
        )}
      </div>

      {/* Checkout Button */}
      <div className="p-4 bg-white sticky bottom-0">
        {Array.isArray(cart?.products) && cart.products.length > 0 && (
          <>
            <button
              onClick={handleChekout}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-md">
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
