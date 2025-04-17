import React from "react";
import ElephantBrand from "../assets/ElephantBrand-BSeymwL9.jpg";
import FooterBg from "../assets/footer-bg-gUbA41dN.jpg";
import Godown from "../assets/godown-CthQew7E.jpg";
import GreenElephant from "../assets/GreenElephan-BHJH-EQH.jpg";
import Hero from "../assets/hero.png";
import Hoopoe from "../assets/Hoopoe-ZHgOQKg3.jpg";
import LIMA from "../assets/LIMA_New-Cne7Ai4H.jpg";
import LimaBrand from "../assets/LIMA_New-Cne7Ai4H.jpg";
import UniqueLogo from "../assets/logo.png";
import Mithra from "../assets/Mithra-C4OQMuKM.jpg";
import NSV from "../assets/nsv-EjQRz6HM.jpg";
import Panther from "../assets/Panther-By-vXvBa.jpg";
import RatBrand from "../assets/Rat Brand-Cp5WXLdQ.jpg";
import SkyKing from "../assets/SkyKing-BZhLNLl-.jpg";
import Sony from "../assets/sony-BfVWyfDy.png";
import StandardFireworks from "../assets/Standard_fireworks-CcxVkAXu.png";
import StarIndia from "../assets/StarIndia-DUINv-ua.jpg";
import Starvell from "../assets/Starvell-DmC-ofTg.jpg";
import Store from "../assets/store-DeyGel4W.jpg";
import Sunrise from "../assets/Sunrise-DLHzxyjv.jpg";
import Sunshine from "../assets/Sunshine-Cr6zROxI.jpg";
import Transport from "../assets/transport-BmEpZ0wX.jpg";
import TwoDoves from "../assets/Two Doves-DjbzlvJ2.jpg";
import Vanitha from "../assets/Vanitha-D8BDdskF.png";
import VilvamTree from "../assets/Vilvam-KMgVM8nb.jpg";
import Winner from "../assets/Winner-CA_PAo8m.jpg";
import FireGif from "../assets/fireGif.gif";
import fire from "../assets/fire.gif";
import happy from "../assets/happy.png";
import retail from "../assets/retail.png";
import godown from "../assets/godown.png";
import transport from "../assets/transport.png";
import { motion } from "framer-motion";

const logos = [
  ElephantBrand,
  FooterBg,
  Godown,
  Hero,
  GreenElephant,
  Hoopoe,
  LIMA,
  LimaBrand,
  UniqueLogo,
  Mithra,
  NSV,
  Panther,
  RatBrand,
  SkyKing,
  Sony,
  StandardFireworks,
  StarIndia,
  Starvell,
  Sunrise,
  Sunshine,
  Store,
  Transport,
  TwoDoves,
  Vanitha,
  VilvamTree,
  Winner,
  FireGif,
];

const MoveImage = () => {
  const half = Math.ceil(logos.length / 2);
  const topLogos = logos.slice(0, half);
  const bottomLogos = logos.slice(half);

  return (
    <div className="w-full bg-white py-8 overflow-hidden relative">
      <div>
        {/* Heading with fade-in animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold mb-6"
        >
          Our Partners
        </motion.h2>

        {/* Inline styles for scroll animations */}
        <style>{`
    @keyframes scrollLTR {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
    @keyframes scrollRTL {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-ltr {
      animation: scrollLTR 90s linear infinite;
    }
    .animate-rtl {
      animation: scrollRTL 90s linear infinite;
    }
  `}</style>

        {/* Top Scroll Left to Right with fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <div className="flex animate-ltr w-max gap-10">
            {[...topLogos, ...topLogos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Top Logo ${index}`}
                className="h-24 w-auto object-contain"
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Scroll Right to Left with fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
          className="overflow-hidden mt-6"
        >
          <div className="flex animate-rtl w-max gap-10">
            {[...bottomLogos, ...bottomLogos].map((logo, index) => (
              <img
                key={index + half}
                src={logo}
                alt={`Bottom Logo ${index + half}`}
                className="h-24 w-auto object-contain"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Our Reason For Success */}

      <div className="relative bg-black text-white py-12 px-4 md:px-10 text-center mt-10 overflow-hidden">
        {/* Background GIF */}
        <img
          src={fire}
          alt="Fireworks Animation"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
        />

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <p className="text-sm md:text-base mb-2">Our Reason For Success</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Having 30+ years of experience in Fireworks Industry
          </h2>
          <p className="text-sm md:text-base max-w-3xl mx-auto mb-10 text-gray-300">
            Let's take the first step together and help you build your presence.
            We are here every step of the way.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                logo: happy,
                title: "10,000+ Happy Customers",
                desc: "We are privileged to serve more than 10,000 customers during the festival seasons.",
              },
              {
                logo: retail,
                title: "Retail @ Whole sale price",
                desc: "We have showrooms in Sivakasi and we own the largest godown, transporting crackers all over India.",
              },
              {
                logo: godown,
                title: "Largest Godown",
                desc: "We own the largest godown in Sivakasi, capable of storing tons of fireworks throughout the year.",
              },
              {
                logo: transport,
                title: "No #1 Transporter",
                desc: "We are the major transporter for Maharashtra, Madhya Pradesh, Delhi, Karnataka, Andhra and of course Tamil Nadu.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-left"
              >
                <img
                  src={item.logo}
                  alt={item.title}
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}

      <div className="bg-white text-black py-5 px-4 md:px-10 text-center">
        {/* Heading motion */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium max-w-5xl mx-auto mb-12"
        >
          <span className="font-semibold">BaBa CRACKERS</span> can sell you the
          best quality crackers at cheap price because our large storage
          facility enables us to buy quality crackers at competitive prices, and
          our large transport fleet helps us deliver them affordably.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={Godown}
              alt="Storage Facility"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">
                Our Storage Facility
              </h3>
              <p className="text-sm text-gray-700">
                We own one of the largest storage facilities in Sivakasi, with a
                capacity of more than 10,00,000 Kgs of fireworks.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={Transport}
              alt="Transport Fleets"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">
                Our Transport Fleets
              </h3>
              <p className="text-sm text-gray-700">
                We have our own and partnered fleets transporting crackers all
                over India.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={Store}
              alt="Showroom"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">Our Showroom</h3>
              <p className="text-sm text-gray-700">
                You can directly buy from our Showroom in Sivakasi (2 more
                coming soon).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MoveImage;
