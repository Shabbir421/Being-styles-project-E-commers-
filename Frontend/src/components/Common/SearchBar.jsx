/** @format */

import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productsSlice"; // ✅ Ensure correct imports

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Fixed casing
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => setIsOpen((prev) => !prev); // ✅ Improved toggle

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) return; // ✅ Prevent empty search submission

    dispatch(setFilters({ search: trimmedSearch }));
    dispatch(fetchProductsByFilters({ search: trimmedSearch }));
    navigate(`/collections/all?search=${encodeURIComponent(trimmedSearch)}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}>
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm} // ✅ Fixed casing
              className="bg-gray-100 px-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMagnifyingGlass />
            </button>
          </div>
          {/* Close icon */}
          <button
            onClick={handleSearchToggle}
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
