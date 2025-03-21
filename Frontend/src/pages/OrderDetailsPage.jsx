/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

      <div className="p-4 sm:p-6 rounded-lg border shadow-lg">
        {/* Order ID and Status */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-medium">Order ID: {orderDetails.id}</h3>
            <p className="text-sm text-gray-600">
              Order placed on: {orderDetails.createdAt.toLocaleString()}
            </p>
          </div>
          <div>
            <p
              className={`text-sm font-semibold ${
                orderDetails.isPaid ? "text-green-600" : "text-red-600"
              }`}>
              Status: {orderDetails.isPaid ? "Approved" : "Pending"}
            </p>
          </div>
        </div>

        {/* Payment & Shipping Info (Side by Side) */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left: Payment Info */}
          <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Payment Information</h3>
            <p>
              <span className="font-medium">Method:</span>{" "}
              {orderDetails.paymentMethod}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {orderDetails.isPaid ? "Paid" : "Pending"}
            </p>
          </div>

          {/* Right: Shipping Info */}
          <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Shipping Information</h3>
            <p>
              <span className="font-medium">Method:</span>{" "}
              {orderDetails.shippingMethod}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {orderDetails.shippingAddress.address}
            </p>
            <p>
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <h3 className="font-semibold text-lg mt-6">Products Ordered</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr key={item.productId} className="text-center">
                  <td className=" px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md mx-auto"
                    />
                  </td>
                  <td className=" px-4 py-2">
                    <Link
                      to={`/products/${item.productId}`}
                      className="text-blue-500 hover:underline ">
                      {item.name}
                    </Link>
                  </td>
                  <td className=" px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className=" px-4 py-2">{item.quantity}</td>
                  <td className=" px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back to Orders Button */}
        <div className="mt-6">
          <Link
            to="/my-orders"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
