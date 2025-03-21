/** @format */

import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4  lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">News letter</h3>
          <p className="text-gray-500 mb-4">
            Be the firsrt to hear about new products, exclusive events, and
            online offers
          </p>
          <p className="font-medium text-sm text-gray-600 mb-3">
            Sign up and get 10% your first order.
          </p>
          {/* news letter form  */}
          <form className="flex" action="">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-3 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all">
              Subscribe
            </button>
          </form>
        </div>
        {/* shop links  */}
        <div>
          <h3 className="text-lg text-gray-800 mb-2">Shop</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 transition-colors capitalize">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600  capitalize transition-colors">
                women's top wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 capitalize transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 capitalize transition-colors">
                women's top wear
              </Link>
            </li>
          </ul>
        </div>
        {/* shopport links  */}
        <div className="">
          <h3 className="text-lg text-gray-800 mb-2">Support</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 transition-colors capitalize">
                contact us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600  capitalize transition-colors">
                about us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 capitalize transition-colors">
                fAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-600 capitalize transition-colors">
                features
              </Link>
            </li>
          </ul>
        </div>
        {/* follow us  */}
        <div className="">
          <h3 className="text-lg text-gray-800 mb-3 ">Follow Us</h3>
          <div className="flex items-center space-x-2 mb-4">
            <a
              href="https://x.com/"
              className="hover:text-gray-600 transition-colors">
              <RiTwitterXLine className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/"
              className="hover:text-gray-600 transition-colors">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              className="hover:text-gray-600 transition-colors">
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/"
              className="hover:text-gray-600 transition-colors">
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500 ">Call Us</p>
          <p className="">
            <FiPhoneCall className="inline-block mr-2" />
            +918577968150
          </p>
        </div>
      </div>
      {/* footer bottom  */}
      <div className="container mx-auto mt-10  lg:px-0 border-t justify-items-center border-gray-200 pt-4">
        <p className="text-gray-500 text-sm tracking-tighter ">
          &copy; {new Date().getFullYear()} All rights reserved. Made with love
          by{" "}
          <Link
            to="https://www.linkedin.com/in/md-shabbir-ansari-2636b320b/"
            className="text-gray-600 hover:text-gray-800 transition-colors">
            Being Shabbir
          </Link>{" "}
          and{" "}
          <Link
            to="#"
            className="text-gray-600 hover:text-gray-800 transition-colors">
            Your Friend
          </Link>{" "}
          |{" "}
          <Link
            to="#"
            className="text-gray-600 hover:text-gray-800 transition-colors">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            to="#"
            className="text-gray-600 hover:text-gray-800 transition-colors">
            Terms & Conditions
          </Link>{" "}
          |{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
