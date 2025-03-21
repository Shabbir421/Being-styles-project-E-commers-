/** @format */

import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or subtracting quantity
  const handleAddSubtractCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        })
      );
    }
  };

  // Handle removing from cart
  const handleRemoveCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        userId,
        guestId,
        size,
        color,
      })
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {cart.products.map((product, index) => (
        <div
          className="flex items-center justify-between py-4 border-b relative"
          key={index}>
          {/* Product Image & Details */}
          <div className="flex items-start space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddSubtractCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-0.5 text-xl font-medium">
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddSubtractCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-0.5 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price and Delete Button */}
          <div className="flex flex-col items-start mb-8 ml-8">
            <p className="font-medium ">
              ${Number(product.price * product.quantity).toFixed(2)}
            </p>
            {/* Delete Icon Inside Drawer */}
            <button
              onClick={() =>
                handleRemoveCart(product.productId, product.size, product.color)
              }
              className="text-red-600 hover:text-red-800 transition">
              <RiDeleteBin3Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
