import React, { useEffect } from "react";
import blast from "../assets/blast.gif";

const Product = () => {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/products.pdf";
    link.download = "products.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-8 px-4 overflow-hidden">
      {/* Background GIF */}
      <img
        src={blast}
        alt="Fireworks Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none z-0"
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Our Products Catalog
        </h1>

        <iframe
          src="/products.pdf"
          title="Our Products PDF"
          className="w-full max-w-5xl h-[90vh] border-2 border-gray-900 rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Product;
