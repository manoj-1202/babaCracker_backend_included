import React from "react";
import banner from "../assets/banner.jpg";
import MobileBanner from "../assets/MobileBanner.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <section className="relative max-w-7xl  mx-auto font-poppins overflow-hidden">
      {/* Desktop Banner - hidden on small screens */}
      <img
        src={banner}
        alt="Fireworks Banner"
        className="w-full h-auto object-cover z-0 hidden sm:block"
      />

      {/* Mobile Banner - visible only on small screens */}
      <img
        src={MobileBanner}
        alt="Fireworks Mobile Banner"
        className="w-full h-auto object-cover z-0 block sm:hidden"
      />

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 md:px-20 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight text-gray-900">
            Celebrate this Diwali with Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700">
            Experience the joy and warmth of Diwali with our exclusive
            collection of decorations, gifts, and more.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/productCard"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg rounded-md font-semibold transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/downloadCart"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-2 text-lg rounded-md font-semibold transition duration-300"
            >
              Download priceList
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
