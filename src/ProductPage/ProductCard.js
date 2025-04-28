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
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [inputValues, setInputValues] = useState({}); // Store input values

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
      removeFromCart(product.id);  // Remove the item if quantity is invalid
      return;
    }

    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      updateCartItem(product.id, qty);
    } else {
      addToCart({ ...product, qty });
    }
  };

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

  const getItemQuantity = (id) => {
    const inputValue = inputValues[id];
    if (inputValue !== undefined) {
      return inputValue;
    }
    const item = cartItems.find((i) => i.id === id);
    return item ? item.qty.toString() : "";
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
      <div className="pb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Products Catalog
        </h2>
      </div>

      {/* Cart Floating */}
      <div className="fixed bottom-4 inset-x-0 z-50 sm:bottom-6 flex justify-center">
        <Link to="/cart">
          <div className="relative flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-4 py-2 shadow-lg">
            <div className="relative">
              <img src={cart} alt="Cart" className="w-8 h-8 sm:w-10 sm:h-10" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
            <p>Items: {cartItems.length}</p>
            <p>Total: ₹{totalAmount}</p>
          </div>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Category */}
        <div className="w-full sm:w-1/4 bg-white p-4 rounded shadow-md">
          <button
            className="sm:hidden bg-blue-600 text-white px-4 py-2 rounded w-full mb-4 flex justify-between items-center"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
            Categories
            <span>{isCategoryMenuOpen ? "▲" : "▼"}</span>
          </button>

          {(isCategoryMenuOpen || window.innerWidth >= 640) && (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {cat} ({categoryCounts[cat]})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product List */}
        <div className="w-full sm:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Product Table Header */}
          <div
            ref={productGridRef}
            className="grid grid-cols-[50px_2fr_1fr_1fr_160px] gap-4 bg-gray-200 p-3 rounded-t-md font-bold text-gray-700 text-sm sm:text-base"
          >
            <div>S.No</div>
            <div>Product Name</div>
            <div>Rate (₹)</div>
            <div>Unit</div>
            <div>Quantity</div>
          </div>

          {/* Product Items */}
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-[50px_2fr_1fr_1fr_160px] gap-4 border-b p-3 items-center text-sm sm:text-base"
              >
                <div>{index + 1}</div>
                <div className="font-medium">{product.name}</div>
                <div className="text-red-600">₹{product.rate}</div>
                <div>{product.per}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={getItemQuantity(product.id)}  // Bind value to the input
                    onChange={(e) =>
                      handleQuantityChange(product, e.target.value)
                    }
                    onBlur={() => handleInputBlur(product)}  // Handle blur to save the value
                    className="w-20 text-center border rounded border-black"
                    min="0"
                    placeholder="Qty"
                    
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
