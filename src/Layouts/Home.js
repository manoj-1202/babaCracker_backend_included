import React from "react";
import Main from "../MainPage/Main";
import MoveImage from "./MoveImage";
import ContactPage from "./Contact";
import OurService from "./OurService";
import Success from "./Success";
import Testimonial from "./Testimonial";
import shopNow from "../assets/shopNow.png";
import phonecall from "../assets/phone-call.png";
import whatsapp from "../assets/whatsapp.png";

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

      {/* WhatsApp and Call Buttons */}
      <div className="fixed top-1/2 left-3 transform -translate-y-1/2 z-50 flex flex-col gap-8">
        <a href="tel:+9445280054" className="rounded-full animate-pulse">
          <img
            src={phonecall}
            alt="Call Now"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=9444813377"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full animate-pulse"
        >
          <img
            src={whatsapp}
            alt="WhatsApp"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </a>
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
