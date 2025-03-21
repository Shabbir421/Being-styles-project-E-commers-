/** @format */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-6 sm:text-2xl">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Image</th>
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Created</th>
              <th className="border p-3">Shipping Address</th>
              <th className="border p-3">Time</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                onClick={() => handleRowClick(order._id)}
                key={index}
                className="border-b hover:bg-gray-50">
                <td className="border p-3">
                  <img
                    src={order.image}
                    alt="Product"
                    className="w-12 h-12 rounded-md"
                  />
                </td>
                <td className="border p-3">{order.id}</td>
                <td className="border p-3">{order.date}</td>
                <td className="border p-3">
                  {order.address.city}, {order.address.country}
                </td>
                <td className="border p-3">{order.time}</td>
                <td className="border p-3">{order.price}</td>
                <td
                  className={`border p-3 font-semibold ${
                    order.status === "Shipped"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : order.status === "Processing"
                      ? "text-yellow-500"
                      : "text-blue-600"
                  }`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
