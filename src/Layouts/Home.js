import React from "react";
import Main from "../MainPage/Main";
import MoveImage from "./MoveImage";
import ContactPage from "./Contact";
import OurService from "./OurService";
import Success from "./Success";
import Testimonial from "./Testimonial";
import newproduct from "../assets/newproduct.png";
import download from "../assets/download.gif";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* product cart icon */}
      <div className="fixed bottom-10 right-4 z-50 sm:bottom-8">
        <Link to="/productCard">
          <div className="rounded-full animate-pulse">
            <img
              src={newproduct}
              alt="New Product"
              className="w-12 h-12 object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Download GIF on left side for medium and above screens */}
      <div className="fixed bottom-4 left-4 z-50 hidden md:block">
        <div className="rounded-full">
          <img
            src={download}
            alt="Download"
            className="w-[200px] h-[400px] object-contain"
          />
        </div>
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
