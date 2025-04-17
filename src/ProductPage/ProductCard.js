import React from "react";
import page1 from "../assets/products/page1.jpg";
import page2 from "../assets/products/page2.jpg";
import page3 from "../assets/products/page3.jpg";
import page4 from "../assets/products/page4.jpg";
import page5 from "../assets/products/page5.jpg";
import page6 from "../assets/products/page6.jpg";

const pages = [
  { id: 1, image: page1, title: " 1" },
  { id: 2, image: page2, title: "2" },
  { id: 3, image: page3, title: "3" },
  { id: 4, image: page4, title: "4" },
  { id: 5, image: page5, title: "5" },
  { id: 6, image: page6, title: "6" },
];

const ProductCard = () => {
  // Download function
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/products.pdf";
    link.download = "products.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-purple-900 py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-4">
        OUR PRODUCTS CATALOG
      </h2>

      {/* Download Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleDownload}
          className="bg-white text-purple-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-500 transition duration-300"
        >
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5 max-w-6xl mx-auto ">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-purple-900 text-white rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold">{page.title}</h3>
            </div>
            <img
              src={page.image}
              alt={`Product Page ${page.title}`}
              className="w-full h-100 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
