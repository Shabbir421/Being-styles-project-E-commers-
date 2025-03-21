/** @format */
import { Link } from "react-router-dom";
import pngtree from "../../assets/pngtree-ecommerce-development-at-a-glance-on-the-internet-with-all-of-picture-image_3171281.jpg";

import React from "react";

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Content */}
      <img
        src={pngtree}
        alt=""
        className="w-full h-[400px] md:h-[500px] lg:h-[750px] object-cover "
      />
      <div className=" absolute inset-0 bg-black flex bg-opacity-5 items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 ">
            Vacation
          </h1>
          <p className="text-sm md:text-lg  tracking-tighter  mb-4 capitalize">
            {" "}
            Explore our vaction-ready outfits with fast worldwide shipping.{" "}
          </p>
          <Link
            to="#"
            className=" bg-white text-gray-900 px-6 py-3 rounded-sm text-lg ">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
