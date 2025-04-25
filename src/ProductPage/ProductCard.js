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

  const { cartItems, addToCart, removeFromCart, updateCartItem } = useCart();

  const productGridRef = useRef(null);

  const categoryCounts = useMemo(() => {
    const counts = productData.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      },
      { All: productData.length }
    );
    return counts;
  }, []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.rate * item.qty,
    0
  );

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

  const handleIncrement = (product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem && typeof updateCartItem === "function") {
      updateCartItem(product.id, cartItem.qty + 1);
    }
  };

  const handleDecrement = (product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem && typeof updateCartItem === "function") {
      if (cartItem.qty > 1) {
        updateCartItem(product.id, cartItem.qty - 1);
      } else {
        handleRemoveFromCart(product.id);
      }
    }
  };

  const handleQuantityChange = (product, value) => {
    const qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 1) {
      handleRemoveFromCart(product.id);
    } else if (typeof updateCartItem === "function") {
      updateCartItem(product.id, qty);
    }
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const getItemQuantity = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    return cartItem ? cartItem.qty : 0;
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryMenuOpen(false);
    setTimeout(() => {
      productGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="pb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Our Products Catalog
        </h2>
      </div>

      {/* Cart Icon */}
      <div className="fixed bottom-4 inset-x-0 z-50 sm:bottom-6 flex justify-center">
        <Link to="/cart" aria-label="View Cart">
          <div className="relative flex items-center gap-3 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full px-4 py-2 shadow-lg">
            {/* Cart Icon */}
            <div className="relative">
              <img
                src={cart}
                alt="Cart"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain hover:opacity-80 transition-opacity"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-1">
              <p>Items:</p>
              <span>{cartItems.length}</span>
            </div>

            {/* Total */}
            <div className="flex items-center gap-1">
              <p>Total:</p>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </Link>
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
            <div className="grid grid-cols-[50px_2fr_1fr_1fr_120px] gap-4 sm:gap-4 font-semibold text-gray-700 bg-gray-100 p-2 sm:p-4 rounded-t-md text-xs sm:text-sm lg:text-xl">
              <div>S.No</div>
              <div>Name of the Product</div>
              <div>Rate (₹)</div>
              <div>Quantity</div>
              <div>Action</div>
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
                      className="grid grid-cols-[50px_2fr_1fr_1fr_120px] gap-2 sm:gap-4 items-center border-b p-2 sm:p-4 text-xs sm:text-sm lg:text-base"
                    >
                      <div>{index + 1}</div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-gray-700">₹{product.rate}</div>
                      <div className="text-gray-700">{product.per}</div>
                      <div className="flex justify-center items-center relative">
                        {added ? (
                          <div className="flex items-center gap-1 sm:gap-2 border rounded px-1 sm:px-2 py-1">
                            <button
                              className="text-sm sm:text-base font-bold text-gray-700 px-1 sm:px-2"
                              onClick={() => handleIncrement(product)}
                              aria-label={`Increment quantity of ${product.name}`}
                            >
                              +
                            </button>
                            <input
                              type="number"
                              value={getItemQuantity(product.id)}
                              onChange={(e) =>
                                handleQuantityChange(product, e.target.value)
                              }
                              className="w-8 sm:w-12 text-center text-gray-800 font-medium border-none focus:ring-0 text-xs sm:text-sm"
                              min="1"
                              aria-label={`Quantity of ${product.name}`}
                            />
                            <button
                              className="text-sm sm:text-base font-bold text-gray-700 px-1 sm:px-2"
                              onClick={() => handleDecrement(product)}
                              aria-label={`Decrement quantity of ${product.name}`}
                            >
                              −
                            </button>
                          </div>
                        ) : (
                          <button
                            className="px-2 sm:px-4 py-1 sm:py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                            onClick={() => handleAddToCart(product)}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            Add to Cart
                          </button>
                        )}

                        {lastAddedId === product.id && (
                          <div className="absolute top-[-1.5rem] bg-green-600 text-white text-xs px-1 sm:px-2 py-1 rounded shadow z-10 animate-pulse">
                            {product.name} added!
                          </div>
                        )}

                        {lastRemovedId === product.id && (
                          <div className="absolute top-[-1.5rem] bg-red-600 text-white text-xs px-1 sm:px-2 py-1 rounded shadow z-10 animate-pulse">
                            {product.name} removed!
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.p
                  className="text-center text-gray-600 text-sm sm:text-lg lg:text-xl mt-6 sm:mt-10 col-span-full"
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
