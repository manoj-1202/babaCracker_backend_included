import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Layouts/About";
import Contact from "./Layouts/Contact";
import Footer from "./Layouts/Footer";
import Navbar from "./Layouts/Navbar";
import Main from "./MainPage/Main";
import MoveImage from "./Layouts/MoveImage";
import Home from "./Layouts/Home";
import OurService from "./Layouts/OurService";
import Product from "./ProductPage/Product";
import ProductCard from "./ProductPage/ProductCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Router>
        <Navbar />
        
        <div className="flex-1">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="main" element={<Main />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="moveImage" element={<MoveImage />} />
            <Route path="service" element={<OurService />} />
            <Route path="ourProduct" element={<Product />} />
            <Route path="ProductCard" element={<ProductCard />} />


          </Routes>
        </div>
     
        <Footer />
      </Router>
    </div>
  );
}

export default App;
