import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Layouts/About";
import Contact from "./Layouts/Contact";
import Footer from "./Layouts/Footer";
import Navbar from "./Layouts/Navbar";
import Main from "./MainPage/Main";
import MoveImage from "./Layouts/MoveImage";
import Home from "./Layouts/Home";
import OurService from "./Layouts/OurService";
import CartPage from "./Cart/CartPage";
import ProductFeaturePage from "./ProductPage/ProductCard";
import ThankYouPage from "./Cart/ThankYouPage";
import Success from "./Layouts/Success";
import Testimonial from "./Layouts/Testimonial";
import DownloadCard from "./ProductPage/DownloadCard";
import { CartProvider } from "./Cart/CartContext";
import AdminDashboard from "./Dashboards/AdminDashboard";
import AdminLogin from "./Dashboards/AdminLogin";

function App() {
  return (
    <div className="min-h-screen font-poppins overflow-x-hidden">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/main" element={<Main />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/moveImage" element={<MoveImage />} />
              <Route path="/success" element={<Success />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/service" element={<OurService />} />
              <Route path="/ProductCard" element={<ProductFeaturePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/downloadCart" element={<DownloadCard />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </div>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
