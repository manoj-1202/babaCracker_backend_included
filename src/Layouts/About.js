import {useEffect} from "react";
import { motion } from "framer-motion";
import aboutBanner from "../assets/aboutBanner.png";
import MoveImage from "./MoveImage";
import { Link } from "react-router-dom";
import shopNow from "../assets/shopNow.png";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* product cart icon */}
        <div className="fixed bottom-10 inset-x-0 z-50 sm:bottom-8 flex justify-end pr-4 sm:pr-6">
        <Link to="/productCard">
          <div className="rounded-full animate-pulse">
            <img
               src={shopNow}
              alt="New Product"
           className="w-32 h-36 object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left Section: Text and Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            About Baba Crackers
          </h2>
          <p className="text-lg sm:text-xl text-black mb-8 leading-relaxed">
            Founded in 2011, TravelSun has been responsible for providing guests
            with unforgettable, once in a lifetime, excursions for over a
            decade. Our personalized trips will cater to your needs and wants,
            without you having to stress about anything.
          </p>
          <Link to="/productCard">
            <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition-colors duration-300">
              Purchase Now...
            </button>
          </Link>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <img
            src={aboutBanner}
            alt="Scenic mountain path with tall grass and distant mountains under a cloudy sky"
            className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
      <MoveImage />
    </div>
  );
};

export default About;
