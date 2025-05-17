import { useEffect } from "react";
import shopNow from "../assets/shopNow.png";
import phonecall from "../assets/phone-call.png";
import whatsapp from "../assets/whatsapp.png";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
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

const DownloadCard = () => {
  // Download function
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/products.pdf";
    link.download = "products.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen  bg-gray-100 py-10 px-4">
      {/* product cart icon */}
      <div className="fixed bottom-10 inset-x-0 z-50 sm:bottom-8 flex justify-end pr-4 sm:pr-6">
        <Link to="/productCard">
          <div className="rounded-full animate-pulse">
            <img
              src={shopNow}
              alt="New Product"
              className="w-32 h-36 object-contain"
            />
          </div>
        </Link>
      </div>

      {/* WhatsApp and Call Buttons */}
      <div className="fixed top-1/2 left-3 transform -translate-y-1/2 z-50 flex flex-col gap-8">
        <a href="tel:+9445280054" className="rounded-full animate-pulse">
          <img
            src={phonecall}
            alt="Call Now"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=9444813377"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full animate-pulse"
        >
          <img
            src={whatsapp}
            alt="WhatsApp"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </a>
      </div>

       {/* scrool top */}
                     <div className="fixed bottom-5 right-14 z-50">
                    <button
                      onClick={handleScrollTop}
                      className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-200 "
                      aria-label="Scroll to top"
                    >
                      <FaArrowUp className="text-lg text-gray-700" />
                    </button>
                  </div>

      <h2 className="text-3xl font-bold text-center mb-4">
        OUR PRODUCTS CATALOG
      </h2>

      {/* Download Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleDownload}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-700 transition duration-300"
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

export default DownloadCard;
