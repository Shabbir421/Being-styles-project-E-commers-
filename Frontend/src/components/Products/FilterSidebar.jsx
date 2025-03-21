/** @format */

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: [],
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Green",
    "Blue",
    "Navy",
    "Yellow",
    "Black",
    "Maroon",
    "White",
    "Orange",
    "Pink",
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const materials = ["Cotton", "Wool", "Denim", "Silk", "Linen", "Viscose"];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "New Balance",
    "Asics",
    "Vans",
    "Converse",
    "Balenciaga",
  ];
  const genders = [
    "Men",
    "Women",
    "Kids",
    "Unisex",
    "Boys",
    "Girls",
    "Accessories",
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseInt(params.minPrice) || 0,
      maxPrice: parseInt(params.maxPrice) || 100,
    });
  }, [searchParams]);

  const handleCheckboxChange = (filterKey, value) => {
    const updatedValues = filters[filterKey].includes(value)
      ? filters[filterKey].filter((item) => item !== value)
      : [...filters[filterKey], value];

    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      [filterKey]: updatedValues.join(","),
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              name="category"
              checked={filters.category === category}
              onChange={() =>
                setSearchParams({
                  ...Object.fromEntries([...searchParams]),
                  category,
                })
              }
            />
            <label htmlFor={category} className="ml-2 capitalize text-gray-600">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Gender
        </label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="radio"
              id={gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              name="gender"
              checked={filters.gender === gender}
              onChange={() =>
                setSearchParams({
                  ...Object.fromEntries([...searchParams]),
                  gender,
                })
              }
            />
            <label htmlFor={gender} className="ml-2 capitalize text-gray-600">
              {gender}
            </label>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                filters.color.includes(color)
                  ? "border-gray-900 scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleCheckboxChange("color", color)}></div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={size}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              checked={filters.size.includes(size)}
              onChange={() => handleCheckboxChange("size", size)}
            />
            <label htmlFor={size} className="ml-2 capitalize text-gray-600">
              {size}
            </label>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Material
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={material}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              checked={filters.material.includes(material)}
              onChange={() => handleCheckboxChange("material", material)}
            />
            <label htmlFor={material} className="ml-2 capitalize text-gray-600">
              {material}
            </label>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={brand}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              checked={filters.brand.includes(brand)}
              onChange={() => handleCheckboxChange("brand", brand)}
            />
            <label htmlFor={brand} className="ml-2 capitalize text-gray-600">
              {brand}
            </label>
          </div>
        ))}
      </div>
      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Price Range: ${filters.minPrice} - ${filters.maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.minPrice}
          onChange={(e) =>
            setSearchParams({
              ...Object.fromEntries([...searchParams]),
              minPrice: e.target.value,
            })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
