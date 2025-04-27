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
      <div className="fixed bottom-4 inset-x-0 z-50 sm:bottom-6 flex justify-end pr-4 sm:pr-6">
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

      <div className="fixed bottom-4 inset-x-0 z-50 hidden md:flex justify-start pr-4">
  <Link to="/productCard">
    <div className="rounded-full">
      <img
        src={download}
        alt="New Product"
        className="w-[200px] h-[400px] object-contain"
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
