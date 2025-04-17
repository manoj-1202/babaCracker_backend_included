import React from "react";
import Logo from "../assets/logo.png";
import hero2 from "../assets/hero2.png";
import fireGif from "../assets/fireGif.gif";
import click from "../assets/click.gif";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <>
      <section className="relative bg-black text-white min-h-screen flex items-center justify-center px-4 overflow-hidden font-poppins">
        {/* Fireworks GIF as background */}
        <img
          src={fireGif}
          alt="Fireworks Animation"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5 lg:-mt-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left mt-[10px] md:mt-0 lg:ml-20"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
              Celebrate this Diwali <br /> with{" "}
              <span className="inline-block mt-2">
                <img
                  src={Logo}
                  alt="Baba Crackers"
                  className="h-20 sm:h-24 md:h-28 inline-block align-middle"
                />
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              Best quality crackers at factory price
            </p>

            {/* Our Products Button */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img
                src={click}
                alt="Click here"
                className="h-10 sm:h-15 w-18 sm:w-18 object-contain"
              />

              <Link
                to="/productCard"
                className="bg-yellow-400 hover:bg-red-500 text-black px-5 py-2.5 sm:px-6 sm:py-3 text-lg sm:text-xl rounded-full font-semibold transition duration-300 inline-block"
              >
                Our Products
              </Link>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end lg:mr-20"
          >
            <img
              src={hero2}
              alt="Happy Diwali"
              className="w-full max-w-lg sm:max-w-2xl md:max-w-2xl lg:max-w-3xl"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Main;
