/** @format */

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    setQuantity((prev) =>
      action === "plus" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to the cart", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        guestId,
        size: selectedSize,
        color: selectedColor,
        quantity,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnail */}
            {selectedProduct?.images?.length > 0 && (
              <div className="hidden md:flex flex-col space-y-4 mr-6">
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.altText || `thumbnail ${index}`}
                      className={`w-20 h-20 border cursor-pointer object-cover rounded-lg ${
                        mainImage === image.url
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => setMainImage(image.url)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="md:h-1/2">
              <div className="mb-4">
                <img
                  src={
                    mainImage ||
                    "https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hZWJjZTkxNzEzM2Q1YjA0Mzg3NWNlYjg1YTJlYmZiNj9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.7WIjlhWrYzTo5e4HyOxyVWUks5RoBdP2ttTDRsPdAZY"
                  }
                  alt="main product"
                  className="w-[500px] h-[500px] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Mobile Thumbnail */}
            {selectedProduct?.images?.length > 0 && (
              <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `thumbnail ${index}`}
                    className={`w-20 h-20 border cursor-pointer object-cover rounded-lg ${
                      mainImage === image.url
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>
            )}

            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1">
                ${selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`inline-block w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.sizes?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`inline-block w-8 h-8 rounded border ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-3 py-1 bg-gray-200 rounded text-lg">
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-3 py-1 bg-gray-200 rounded text-lg">
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`w-full py-3 bg-black text-white rounded-lg ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}>
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
          {/* You May Also Like Section */}
          {similarProducts?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                You May Also Like
              </h2>
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
