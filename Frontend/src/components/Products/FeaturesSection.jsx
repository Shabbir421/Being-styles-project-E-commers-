/** @format */

import React from "react";
import { HiOutlineCreditCard, HiShoppingBag, } from "react-icons/hi";
import { HiArrowPathRoundedSquare, } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* features 1  */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">
            Free International Shipping
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter ">
            On all orders over $100.00
          </p>
        </div>
        {/* features 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">
          45 Days Return 
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter capitalize ">
           money back guarantee
          </p>
        </div>
        {/* features 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">
            Fsecure chekout
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter capitalize ">
           100% secured chekout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
