/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    for (const key in shippingAddress) {
      if (!shippingAddress[key]) {
        alert(`Please enter ${key}`);
        return;
      }
    }

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      } else {
        console.error("Error creating checkout", res.error);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "success", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        { status: "complete" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error finalizing checkout", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl uppercase mb-6 font-bold">Checkout Page</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4 font-semibold">Contact Details</h3>
          <input
            type="email"
            value={user.email || ""}
            disabled
            className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-4 bg-gray-100"
          />
          {/* Updated Delivery Address Section */}
          <h3 className="text-lg mb-4 font-semibold">Delivery Address</h3>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>

          {/* City, Postal Code, Country, Phone - All in Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* City */}
            <div>
              <label className="block text-sm font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-black hover:bg-gray-800 rounded-md">
            {checkoutId ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-xl uppercase mb-6 font-bold">Order Summary</h3>
        <ul className="mb-6">
          {cart.products.map((product, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-2">
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-md mr-4"
                />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {product.size}, Color: {product.color}
                  </p>
                </div>
              </div>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4 text-lg font-semibold">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              $
              {cart.products
                .reduce((sum, item) => sum + item.price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${cart.totalPrice > 100 ? "Free" : "9.99"}</span>
          </div>
          <div className="flex justify-between text-xl border-t pt-3">
            <span>Total:</span>
            <span>
              $
              {cart.totalPrice > 100
                ? cart.totalPrice.toFixed(2)
                : (cart.totalPrice + 9.99).toFixed(2)}
            </span>
          </div>
        </div>
        {checkoutId && (
          <PayPalButton
            amount={cart.totalPrice}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
