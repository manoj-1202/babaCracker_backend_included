import React from "react";
import Main from "../MainPage/Main";
import MoveImage from "./MoveImage";
import ContactPage from "./Contact";
import OurService from "./OurService";
import Success from "./Success";
import Testimonial from "./Testimonial";
import shopNow from "../assets/shopNow.png";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* product cart icon */}
      <div className="fixed bottom-10 right-4 z-50 sm:bottom-8">
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

     

      <Main />
      <MoveImage />
      <Success />
      <OurService />
      <Testimonial />
      <ContactPage />
    </div>
  );
};

export default Home;
