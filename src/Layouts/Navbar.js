import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import { Phone, MessageSquareText } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/", description: "Explore our homepage" },
    { label: "About", path: "/about", description: "Learn our story" },
    { label: "Contact", path: "/contact", description: "Get in touch" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900 backdrop-blur-lg shadow-xl text-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-28 lg:h-32">
            {/* Left - Phone Numbers */}
            <div className="flex flex-col items-start z-10 text-yellow-300 font-medium space-y-1">
              <div className="flex items-center space-x-2 hover:text-yellow-400 transition">
                <Phone size={14} className="shrink-0" />
                <span className="text-[10px] sm:text-sm lg:text-xl">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center space-x-2 hover:text-yellow-400 transition">
                <MessageSquareText size={14} className="shrink-0" />
                <span className="text-[10px] sm:text-sm lg:text-xl">
                  +91 91234 56789
                </span>
              </div>
            </div>
            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10 text-center">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-20 sm:h-24 lg:h-28 object-contain mx-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 z-10 h-full">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative text-lg font-medium transition-colors duration-300 hover:text-yellow-400 ${
                    location.pathname === item.path ? "text-yellow-400" : ""
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-yellow-400 rounded-full transition-all duration-300"></span>
                  )}
                </Link>
              ))}
              <div className="relative group">
                <Link
                  to="/ProductCard"
                  className="px-2 py-2.5 bg-yellow-400 text-gray-900 rounded-full font-semibold text-base hover:bg-yellow-500 transition-all duration-300 hover:shadow-lg"
                >
                  Our Products
                </Link>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Discover Exclusive Deals
                </span>
              </div>

              <div>
                <Link to="/cart">
                  <img
                    src={cart}
                    alt="Cart"
                    className="w-10 h-10  object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
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

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={Logo} alt="Logo" className="h-16 object-contain" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-6 py-6">
          <p className="text-yellow-200 text-sm mb-6 font-medium">
            Welcome! Explore our world.
          </p>
          <ul className="flex flex-col gap-6 text-lg font-medium text-white">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block transition-colors duration-300 hover:text-yellow-400 ${
                    location.pathname === item.path
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                  <span className="block text-sm text-gray-400 mt-1">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}

            <li>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src={cart}
                  alt="Cart"
                  className="w-10 h-10 object-contain"
                />
                <span>Cart</span>
              </Link>
            </li>

            <li>
              <Link
                to="/ProductCard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-full text-center font-semibold hover:bg-yellow-500 transition-all"
              >
                Our Products
                <span className="block text-xs text-gray-800 mt-1">
                  Exclusive Deals Await
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
