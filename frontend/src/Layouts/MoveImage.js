import React from "react";
import ElephantBrand from "../assets/ElephantBrand-BSeymwL9.jpg";
import FooterBg from "../assets/footer-bg-gUbA41dN.jpg";

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
import Sunrise from "../assets/Sunrise-DLHzxyjv.jpg";
import Sunshine from "../assets/Sunshine-Cr6zROxI.jpg";
import TwoDoves from "../assets/Two Doves-DjbzlvJ2.jpg";
import Vanitha from "../assets/Vanitha-D8BDdskF.png";
import VilvamTree from "../assets/Vilvam-KMgVM8nb.jpg";
import Winner from "../assets/Winner-CA_PAo8m.jpg";
import FireGif from "../assets/fireGif.gif";

import { motion } from "framer-motion";

const logos = [
  ElephantBrand,
  FooterBg,
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
    <div className=" bg-white py-8 overflow-hidden relative">
      <div>
        {/* Heading with fade-in animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-4xl sm:text-4xl md:text-5xl font-bold mb-6"
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
                className="h-36 w-auto object-contain"
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
          <div className="flex animate-rtl w-max gap-10 mt-16">
            {[...bottomLogos, ...bottomLogos].map((logo, index) => (
              <img
                key={index + half}
                src={logo}
                alt={`Bottom Logo ${index + half}`}
                className="h-36 w-auto object-contain"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoveImage;
