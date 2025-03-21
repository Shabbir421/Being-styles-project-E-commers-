/** @format */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      requestAnimationFrame(() => {
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
      });
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.scrollLeft + container.clientWidth
      );
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  const handleImageError = (e) => {
    e.target.src = "/fallback.jpg"; // Replace with default fallback
  };

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4 capitalize">
          Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-35px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-disabled={!canScrollLeft}
            aria-label="Scroll Left"
            className={`rounded border p-2 transition ${
              canScrollLeft
                ? "bg-white text-black hover:bg-gray-100 active:bg-gray-200"
                : "bg-gray-300 text-gray-400"
            }`}>
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-disabled={!canScrollRight}
            aria-label="Scroll Right"
            className={`rounded border p-2 transition ${
              canScrollRight
                ? "bg-white text-black hover:bg-gray-100 active:bg-gray-200"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }`}>
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div>
        <div
          ref={scrollRef}
          className={`container mx-auto overflow-x-auto flex space-x-6 relative ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}>
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
              <img
                src={product.images?.[0]?.url || "/fallback.jpg"}
                alt={product.name}
                onError={handleImageError}
                className="object-cover w-full h-[400px] rounded-lg"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link to={`/products/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
