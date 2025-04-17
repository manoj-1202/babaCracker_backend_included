import React from "react";
import Main from "../MainPage/Main";
import MoveImage from "./MoveImage";
import ContactPage from "./Contact";
import OurService from "./OurService";

const Home = () => {
  return (
    <div>
      <Main />
      <MoveImage />
      <OurService />
      <ContactPage />
    </div>
  );
};

export default Home;
