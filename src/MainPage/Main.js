import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../Cart/CartContext"; // Make sure path is correct
import cart from "../assets/cart.png"; // Cart image

import banner from "../assets/banner.jpg";
import MobileBanner from "../assets/MobileBanner.png";
import sparkler from "../assets/main/sparkler.jpg";
import chakkara from "../assets/main/chakkra.jpg";
import flowerpot from "../assets/main/flowerpot.jpg";
import paperbomb from "../assets/main/paperbomb.jpg";
import peacock from "../assets/main/PEACOCK.jpg";
import skyshot from "../assets/main/skyshot.jpg";
import lakshmi from "../assets/main/lakshmi.jpg";
import bijili from "../assets/main/bijili.jpeg";

const Main = () => {
  const { cartItems, addToCart, removeFromCart, updateCartItem } = useCart();
  // Initialize inputValues state
  const [inputValues, setInputValues] = useState({});

  const featuredProducts = [
    {
      id: 1,
      category: "7 CM SPARKLERS",
      name: "7 cm Electric Sparklers",
      rate: 24,
      per: "Box (10 Pcs)",
      image: sparkler,
    },
    {
      id: 25,
      category: "FLORAL FLOWER POTS",
      name: "Flower Pot Small",
      rate: 130,
      per: "Box (10 Pcs)",
      image: flowerpot,
    },
    {
      id: 37,
      category: "CHAKKAR PREMIUM",
      name: "Wire Chakkar",
      rate: 320,
      per: "Box (10 Pcs)",
      image: chakkara,
    },
    {
      id: 44,
      category: "ONE SOUND CRACKERS",
      name: "4'' Lakshmi Super Deluxe",
      rate: 90,
      per: "Pkt (5 Pcs)",
      image: lakshmi,
    },
    {
      id: 49,
      category: "HOT BIJILI PACKS",
      name: "Red Bijili",
      rate: 80,
      per: "Bag (100 Pcs)",
      image: bijili,
    },
    {
      id: 64,
      category: "PAPER BOMB",
      name: "1/4 Kg Paper Bomb - Jumbo",
      rate: 120,
      per: "Box (1 Pcs)",
      image: paperbomb,
    },
    {
      id: 73,
      category: "PEACOCK DANCES",
      name: "Magical Peacock - 5 Face",
      rate: 300,
      per: "Box (1 Pcs)",
      image: peacock,
    },
    {
      id: 87,
      category: "COLOUR FOUNTAIN",
      name: "Ice Cream Fountain - TIN",
      rate: 200,
      per: "Box (1 Pcs)",
      image: skyshot,
    },
  ];

  // Define handleInputBlur outside handleQuantityChange
  const handleInputBlur = (product) => {
    const value = inputValues[product.id] || "";
    const qty = parseInt(value, 10);
    if (isNaN(qty) || qty <= 0) {
      setInputValues((prev) => ({
        ...prev,
        [product.id]: "",
      }));
      removeFromCart(product.id);
    } else {
      // If valid quantity, update the cart
      updateCartItem(product.id, qty);
    }
  };

  const handleQuantityChange = (product, value) => {
    // Update local input value
    setInputValues((prev) => ({
      ...prev,
      [product.id]: value,
    }));

    if (value === "") {
      removeFromCart(product.id);
      return;
    }

    const qty = parseInt(value, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(product.id); // Remove the item if quantity is invalid
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateCartItem(product.id, qty);
    } else {
      addToCart({ ...product, qty });
    }
  };

  const getItemQuantity = (id) => {
    // Prioritize inputValues for real-time input
    if (inputValues[id] !== undefined) {
      return inputValues[id];
    }
    const item = cartItems.find((i) => i.id === id);
    return item ? item.qty.toString() : "";
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.rate * item.qty,
    0
  );

  return (
    <section className="relative max-w-7xl mx-auto font-poppins overflow-hidden">
      {/* Desktop Banner */}
      <img
        src={banner}
        alt="Fireworks Banner"
        className="w-full h-auto object-cover z-0 hidden sm:block"
      />

      {/* Mobile Banner */}
      <img
        src={MobileBanner}
        alt="Fireworks Mobile Banner"
        className="w-full h-auto object-cover z-0 block sm:hidden"
      />

      {/* Banner Bottom Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 md:px-20 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight text-gray-900">
            Celebrate this Diwali with Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700">
            Experience the joy and warmth of Diwali with our exclusive
            collection of decorations, gifts, and more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/productCard"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg rounded-md font-semibold transition duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/downloadCart"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-2 text-lg rounded-md font-semibold transition duration-300"
            >
              Download priceList
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Featured Products */}
      <div className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-sm text-gray-600 mb-1">{product.per}</p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="text-lg font-bold text-red-600">
                  ₹{product.rate}
                </p>
                <input
                  type="number"
                  value={getItemQuantity(product.id)}
                  onChange={(e) =>
                    handleQuantityChange(product, e.target.value)
                  }
                  onBlur={() => handleInputBlur(product)}
                  className="w-16 text-center border rounded border-black"
                  min="0"
                  placeholder="Qty"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/productCard"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-3xl font-semibold text-lg transition duration-300"
          >
            Explore More Products
          </Link>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center">
          <Link to="/cart">
            <div className="relative flex items-center gap-3 bg-red-600 text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:bg-red-700 transition duration-300">
              <div className="relative">
                <img src={cart} alt="Cart" className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
              <p>Items: {cartItems.length}</p>
              <p>Total: ₹{totalAmount}</p>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Main;
