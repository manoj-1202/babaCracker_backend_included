import React from "react";
import Main from "../MainPage/Main";
import MoveImage from "./MoveImage";
import ContactPage from "./Contact";
import OurService from "./OurService";
import Success from "./Success";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Main />
      <MoveImage />
      <Success/>
      <OurService />
      <Testimonial/>
      <ContactPage />
    </div>
  );
};

export default Home;
