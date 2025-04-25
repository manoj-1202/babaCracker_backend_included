import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import { useCart } from "../Cart/CartContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const navLinks = [
    { label: "Home", path: "/", description: "Explore our homepage" },
    { label: "About", path: "/about", description: "Learn our story" },
    { label: "Contact", path: "/contact", description: "Get in touch" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-200 shadow-xl text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-28">
            {/* Mobile View */}
            <div className="flex flex-col w-full md:hidden py-4">
              {/* First Row - Logo and Text */}
              <div className="flex flex-col items-center mb-4">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-16 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <h1 className="text-3xl font-bold text-red-600 mt-2">
                  Baba Crackers
                </h1>
                <div className="text-center text-blue-800 mt-2">
                  <p>XXXXXXX - 8754821960 </p>
                  <p>YYYYYYY - 8675006166</p>
                </div>
              </div>

              {/* Third Row - Menu Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="focus:outline-none p-2 rounded-full transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X size={24} color="black" />
                  ) : (
                    <Menu size={24} color="black" />
                  )}
                </button>

                <Link to="/cart" aria-label="View Cart">
                  <div className="relative">
                    <img
                      src={cart}
                      alt="Cart"
                      className="w-8 h-8 object-contain"
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar Menu */}
            <div
              className={`fixed top-0 left-0 h-full w-72 bg-white backdrop-blur-lg shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-200">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src={Logo} alt="Logo" className="h-16 object-contain" />
                </Link>
                <h1 className="text-red-600 font-serif text-xl">Baba Crackers</h1>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="px-6 py-6 bg-yellow-400">
                <p className=" text-base mb-6 font-semibold">
                  Welcome! Explore our world.
                </p>
                <ul className="flex flex-col gap-6 text-lg font-semibold text-black">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white bg-red-600 px-4 py-2 rounded-2xl"
                    >
                      Home
                    </Link>
                  </li>
                 
                  <li>
                    <Link
                      to="/productCard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white bg-red-600 px-4 py-2 rounded-2xl"
                    >
                      Our Pricelist
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white bg-red-600 px-4 py-2 rounded-2xl"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white bg-red-600 px-4 py-2 rounded-2xl"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/download"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white bg-red-600 px-4 py-2 rounded-2xl"
                    >
                      Download Pricelist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <div className="relative">
                        <img
                          src={cart}
                          alt="Cart"
                          className="w-10 h-10 object-contain"
                        />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </div>
                      <span>Cart</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex items-center justify-between w-full h-28">
              {/* Left - Logo and Text */}
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-24 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="ml-4">
                  <h1 className="text-3xl font-bold text-red-600">
                    Baba Crackers
                  </h1>
                  <div className="text-blue-800">
                    <p>XXXXXXX - 8754821960 </p>
                    <p>YYYYYYY - 8675006166</p>
                  </div>
                </div>
              </div>

              {/* Right - Nav Links and Cart */}
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-white bg-red-600 px-4 py-2 rounded-2xl hover:bg-red-700 transition-colors "
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-white bg-red-600 px-4 py-2 rounded-3xl hover:bg-red-700 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/productCard"
                  className="text-white bg-red-600 px-4 py-2 rounded-3xl hover:bg-red-700 transition-colors"
                >
                  Our Pricelist
                </Link>
                <Link
                  to="/contact"
                  className="text-white bg-red-600 px-4 py-2 rounded-3xl hover:bg-red-700 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  to="/download"
                  className="text-white bg-red-600 px-4 py-2 rounded-3xl hover:bg-red-700 transition-colors"
                >
                  Download Pricelist
                </Link>
                <Link to="/cart" aria-label="View Cart">
                  <div className="relative">
                    <img
                      src={cart}
                      alt="Cart"
                      className="w-10 h-10 object-contain"
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;
