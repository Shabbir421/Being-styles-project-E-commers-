/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  // Order data state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders()); // Fetch users on component mount
    }
  }, [user, dispatch, navigate]);

  // Handle status change
  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };
  // Order ,loading,error
  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      {/* Order List */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">${order.totalPrice.toFixed(2)}</td>

                  {/* Status Dropdown */}
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="p-2 border rounded-md">
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Action Button */}
                  <td className="p-3">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "Delivered")
                        }
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
