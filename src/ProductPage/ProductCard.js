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
  const [lastRemovedId, setLastRemovedId] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useCart();

  const productGridRef = useRef(null);

  const categoryCounts = useMemo(() => {
    const counts = productData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, { All: productData.length });
    return counts;
  }, []);

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

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setLastRemovedId(productId);
    setTimeout(() => setLastRemovedId(null), 2000);
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
    <div className="p-4 sm:p-10 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="pb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Our Products Catalog
        </h2>

        {/* Cart Icon */}
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
          <Link to="/cart" aria-label="View Cart">
            <div className="relative">
              <img
                src={cart}
                alt="Cart"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:opacity-80 transition-opacity"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Category Sidebar */}
        <div className="w-full sm:w-1/4 sm:bg-white sm:shadow-md p-4 sm:p-6">
          {/* Mobile Toggle Button */}
          <button
            className="sm:hidden bg-blue-600 text-white px-4 py-2 rounded w-full mb-4 flex items-center justify-between hover:bg-blue-700 transition-colors"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            aria-expanded={isCategoryMenuOpen}
            aria-controls="category-menu"
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
            <ul
              id="category-menu"
              className="sm:hidden p-4 rounded-lg shadow-md mt-2 bg-white"
            >
              {categories.map((cat) => (
                <li key={cat} className="mb-4">
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left p-3 rounded-lg text-gray-800 font-semibold hover:bg-blue-500 hover:text-white transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {cat} ({categoryCounts[cat] || 0})
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop Category Sidebar */}
          <div className="hidden sm:block">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
            <ul>
              {categories.map((cat) => (
                <li key={cat} className="mb-3">
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left p-2 rounded text-gray-800 font-semibold hover:bg-blue-500 hover:text-white transition-colors ${
                      selectedCategory === cat ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {cat} ({categoryCounts[cat] || 0})
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
              className="p-2 border rounded shadow w-full sm:w-1/3 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products by name"
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 rounded shadow bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Sort products by price"
            >
              <option value="default">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="w-full overflow-x-auto" ref={productGridRef}>
            {/* Header Row */}
            <div className="grid grid-cols-[60px_2fr_1fr_1fr] gap-4 font-semibold text-gray-700 bg-gray-100 p-4 rounded-t-md">
              <div>S.No</div>
              <div>Name of the Product</div>
              <div>Rate (₹)</div>
              <div>Quantity</div>
            </div>

            <AnimatePresence>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                  const added = isInCart(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-[60px_2fr_1fr_1fr] gap-4 items-center border-b p-4 relative"
                    >
                      <div>{index + 1}</div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-gray-700">₹{product.rate}</div>
                      <div className="text-gray-700">{product.per}</div>

                      <div className="col-span-4 mt-2 flex justify-center relative">
                        <button
                          className={`px-4 py-2 rounded transition-colors ${
                            added
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          onClick={() =>
                            added
                              ? handleRemoveFromCart(product.id)
                              : handleAddToCart(product)
                          }
                          disabled={false}
                          aria-label={
                            added
                              ? `Remove ${product.name} from cart`
                              : `Add ${product.name} to cart  cart`
                          }
                        >
                          {added ? "Remove from Cart" : "Add to Cart"}
                        </button>

                        {lastAddedId === product.id && (
                          <div className="absolute top-[-2rem] bg-green-600 text-white text-xs px-2 py-1 rounded shadow z-10 animate-pulse">
                            {product.name} added!
                          </div>
                        )}

                        {lastRemovedId === product.id && (
                          <div className="absolute top-[-2rem] bg-red-600 text-white text-xs px-2 py-1 rounded shadow z-10 animate-pulse">
                            {product.name} removed!
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.p
                  className="text-center text-gray-600 text-lg mt-10 col-span-full"
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