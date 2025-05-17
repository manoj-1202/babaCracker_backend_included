import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function ThankYouPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        We appreciate your purchase. Our team will contact you shortly for confirmation and delivery.
      </p>
      <Link
        to="/ProductCard"
        className="inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
