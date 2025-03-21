/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  const estimatedDeliveryDate = new Date(
    checkout.createdAt.getTime() + 2 * 24 * 60 * 60 * 1000
  );

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearcart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);
  return (
    <div className="max-w-3xl mb-6 mt-2 mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl text-green-600 font-bold text-center mb-6 capitalize">
        Thank You for your order!
      </h2>

      {/* Order Info */}
      <div className="mb-4 flex justify-between items-center">
        {/* Left Side: Order ID & Order Placed */}
        <div className="text-left">
          <p className="text-gray-700 font-semibold">
            Order ID: {checkout.orderId}
          </p>
          <p className="text-gray-600 text-sm">
            Order Placed: {checkout.createdAt.toLocaleDateString()}
          </p>
        </div>
        {/* Right Side: Estimated Delivery */}
        <div className="text-right">
          <p className="text-gray-600 text-sm">
            Estimated Delivery: {estimatedDeliveryDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <ul className="mb-6">
        {checkout.checkoutItems.map((item) => (
          <li
            key={item.productId}
            className="flex items-center justify-between mb-4 border-b pb-2">
            <div className="flex items-center">
              <img
                src={item.image.url}
                alt={item.name}
                className="w-16 h-16 rounded-md mr-4"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/100?text=No+Image")
                } // Fallback for broken images
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Color: {item.color}, Size: {item.size}
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Shipping & Payment Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Right Side: Payment Method */}
        <div className=" p-4 rounded-lg w-full lg:w-1/2">
          <h3 className="font-semibold text-lg">Payment Method</h3>
          <p>{checkout.paymentMethod}</p>
        </div>
        {/* Left Side: Shipping Address */}
        <div className=" p-4 rounded-lg w-full lg:w-1/2">
          <h3 className="font-semibold text-lg">Shipping Address</h3>
          <p>{checkout.shippingAddress.address}</p>
          <p>
            {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
