import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto bg-yellow-400 text-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="font-bold text-lg mb-2">
            CrackersShope | Wholesale Cracker Dealers
          </h2>
          <p className="text-sm leading-relaxed">
            BABA CRACKERS can sell you the best quality crackers at cheap price
            because our large storage facility enables us to buy quality
            crackers at competitive prices, and our large transport fleet helps
            us deliver them affordably.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h2 className="font-bold text-lg mb-2">Our Policies</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                Shipping & Delivery Policy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-blue-800"
                onClick={() => window.scrollTo(0, 0)}
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-bold text-lg mb-2">Reach Us On</h2>
          <div className="flex gap-4 mt-2">
            <button
              className="bg-yellow-400 border border-black p-2 rounded-full hover:text-blue-800 transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </button>
            <button
              className="bg-yellow-400 border border-black p-2 p-2 rounded-full hover:text-blue-800 transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </button>
            <button
              className="bg-yellow-400 border border-black p-2 p-2 rounded-full hover:text-blue-800 transition"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 text-center text-sm text-black">
        © {new Date().getFullYear()} Baba Crackers. All rights reserved.
        <p className="mt-1">@ S Cube Innovation</p>
      </div>
    </footer>
  );
};

export default Footer;
