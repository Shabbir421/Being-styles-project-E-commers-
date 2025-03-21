/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Loading & Error Handling */}
      {productsLoading || ordersLoading ? (
        <p>Loading..</p>
      ) : productsError ? (
        <p className="text-red-500">
          Error fetching products: {productsError.message}
        </p>
      ) : ordersError ? (
        <p className="text-red-500">
          Error fetching orders: {ordersError.message}
        </p>
      ) : (
        <>
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="p-6 shadow-md rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
              <p className="text-2xl font-bold">${totalSales}</p>
            </div>

            {/* Total Orders Card */}
            <div className="p-6 shadow-md rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <Link
                to="/admin/orders"
                className="text-blue-500 hover:underline">
                Manage Orders
              </Link>
            </div>

            {/* Total Products Card */}
            <div className="p-6 shadow-md rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Total Products</h2>
              <p className="text-2xl font-bold">{products.length}</p>
              <Link
                to="/admin/products"
                className="text-blue-500 hover:underline">
                View Products
              </Link>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border p-2">Order ID</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Total Price</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="text-gray-700">
                      <td className="border p-2">{order._id}</td>
                      <td className="border p-2">
                        {order.name || "Unknown"}
                      </td>
                      <td className="border p-2">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td
                        className={`border p-2 font-semibold ${
                          order.status === "Pending"
                            ? "text-yellow-500"
                            : order.status === "Completed"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}>
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
