/** @format */

import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/mens-casual-accessories.jpg.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-14  px-4 lg:px-0">
    
     <div className="container  mx-auto flex items-center flex-col-reverse lg:flex-row rounded-3xl bg-green-50 transition duration-500 ease-in-out transform hover:scale-105">
        {/* left content  */}
        <div
          className="lg:w-1/2 p-8 
         text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your evreyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, comforatble clothing that effortlessly blends
            faishion and function. Designed to make you look and feel great
            evrey day.{" "}
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 ">
            Shop Now
          </Link>
        </div>
        {/* right content  */}
        <div className="lg:w-1/2 ">
          <img
            src={featured}
            alt=""
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
