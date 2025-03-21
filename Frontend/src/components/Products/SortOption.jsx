/** @format */

import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setsearchParams({ sort: e.target.value });
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <span className="mr-2 text-sm font-medium text-gray-600">Sort by:</span>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border border-gray-300 px-4 py-2 text-sm rounded-md">
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option className=" capitalize" value="priceDesc">
          Price:High to low
        </option>
        <option className=" capitalize" value="priceAsc">
          Price:Low to high
        </option>
      </select>
    </div>
  );
};

export default SortOption;
