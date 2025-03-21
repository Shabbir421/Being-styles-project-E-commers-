/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    size: [],
    color: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id)); // Fetch product details on component mount
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct && selectedProduct._id === id) {
      setProductData((prevData) => ({
        ...prevData,
        ...selectedProduct,
      }));
    }
  }, [selectedProduct, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (e) => {
    setProductData({ ...productData, size: e.target.value.split(",") });
  };

  const handleColorChange = (e) => {
    setProductData({ ...productData, color: e.target.value.split(",") });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      setUploading(true);
      setUploadError("");
  
      // Get token from Redux or localStorage
      const token = localStorage.getItem("token"); // Adjust if using Redux
  
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
  
      console.log("Upload Success:", data);
  
      if (data.imageUrl) {
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, { url: data.imageUrl, altText: "" }],
        }));
      } else {
        throw new Error("Invalid image response from server.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      console.error("Error Response:", error.response?.data || error.message);
      
      alert(`Upload failed: ${error.response?.data?.msg || error.message}`);
      setUploadError("Failed to upload image. Please check the server logs.");
    } finally {
      setUploading(false);
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: productData._id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-w-full mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="rounded-lg shadow-md p-4">
        <div className="mb-6">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Stock Count</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Size (comma separated)</label>
          <input
            type="text"
            name="size"
            value={productData.size.join(",")}
            onChange={handleSizeChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Color (comma separated)</label>
          <input
            type="text"
            name="color"
            value={productData.color.join(",")}
            onChange={handleColorChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          <div className="mt-2 flex gap-2 flex-wrap">
            {productData.images.length > 0 &&
              productData.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-32 h-32 object-cover border rounded-md"
                />
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
