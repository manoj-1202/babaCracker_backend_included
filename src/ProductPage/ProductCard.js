import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productData } from "./ProductData";
import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png";

const categories = ["All", ...new Set(productData.map((p) => p.category))];

export default function ProductFeaturePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [lastAddedId, setLastAddedId] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const { cartItems, addToCart } = useCart();

  const productGridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...productData];
    if (selectedCategory !== "All") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().replace(/\s+/g, "");
      products = products.filter((p) =>
        p.name.toLowerCase().replace(/\s+/g, "").includes(query)
      );
    }

    if (sortOrder === "asc") {
      products.sort((a, b) => a.rate - b.rate);
    } else if (sortOrder === "desc") {
      products.sort((a, b) => b.rate - a.rate);
    }
    return products;
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 2000);
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryMenuOpen(false);
    setTimeout(() => {
      productGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto min-h-screen">
      <div className="pb-6">
        <h2 className="text-3xl font-bold text-center">Our Products Catalog</h2>

        {/* Cart Icon */}
        <div className="flex justify-end fixed bottom-4 right-4 z-50">
          <Link to="/cart">
            <img
              src={cart}
              alt="Cart"
              className="w-10 h-15 sm:w-12 sm:h-10 object-contain"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Category Sidebar */}
        <div className="w-full sm:w-1/4 sm:bg-gray-100 text-white p-4 h-auto sm:h-full">
          {/* Mobile Toggle Button */}
          <button
            className="sm:hidden text-white bg-blue-600 px-4 py-2 rounded w-full mb-4 flex items-center justify-between"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
            Categories
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                isCategoryMenuOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Mobile Category Dropdown */}
          {isCategoryMenuOpen && (
            <ul className="sm:hidden p-4 rounded-lg shadow-md mt-2">
              {categories.map((cat) => (
                <li key={cat} className="mb-4">
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left p-3 rounded-lg text-black font-semibold hover:bg-blue-500 transition-colors ${
                      selectedCategory === cat ? "bg-blue-500" : "bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop Category Sidebar */}
          <div className="hidden sm:block">
            <h3 className="text-xl font-bold mb-4 text-black">Categories</h3>
            <ul>
              {categories.map((cat) => (
                <li key={cat} className="mb-3">
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left p-2 rounded hover:bg-blue-600 text-black font-semibold ${
                      selectedCategory === cat ? "bg-blue-500" : ""
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Section */}
        <div className="w-full sm:w-3/4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by name"
              className="p-2 border rounded shadow w-full sm:w-1/3 bg-white border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 rounded shadow bg-white border border-gray-300"
            >
              <option value="default">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div
            ref={productGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const added = isInCart(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="border p-4 rounded-lg shadow hover:shadow-lg bg-gray-100 relative"
                    >
                      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-gray-600">
                        Category: {product.category}
                      </p>
                      <p className="text-gray-800 font-bold">
                        ₹{product.rate} / {product.per}
                      </p>
                      <button
                        className={`mt-4 px-4 py-2 rounded transition-colors ${
                          added
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-green-600"
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={added}
                      >
                        {added ? "Added to Cart" : "Add to Cart"}
                      </button>

                      {lastAddedId === product.id && (
                        <div className="absolute top-2 right-1 bg-green-600 text-white text-xs px-2 py-1 rounded shadow z-10 animate-pulse">
                          {product.name} added!
                        </div>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <motion.p
                  className="text-center text-gray-600 text-lg col-span-full mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  No products found.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
