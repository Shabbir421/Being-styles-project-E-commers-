/** @format */

import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  // Fix: Ensure products is an array before checking its length
  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center">No products available.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          className="block"
          to={`/product/${product._id}`}>
          <div className="bg-white p-4 rounded-lg">
            <img
              src={product?.images?.[0]?.url || "/default-image.jpg"}
              alt={product.name || "Product Image"}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium tracking-tighter text-sm mb-2">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
