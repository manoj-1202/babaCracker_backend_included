import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png";
import phonecall from "../assets/phone-call.png";
import whatsapp from "../assets/whatsapp.png";
import { FaArrowUp } from "react-icons/fa";

export default function ProductFeaturePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, addToCart, removeFromCart, updateCartItem } = useCart();

  const productGridRef = useRef(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5001/api/products", {
          headers: {
            'Accept': 'application/json',
          },
        });

        // Log response for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.get('content-type'));

        if (!response.ok) {
          const text = await response.text();
          console.error('Response body:', text);
          throw new Error(`HTTP error ${response.status}: ${text.slice(0, 100)}...`);
        }

        if (!response.headers.get('content-type')?.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error('Server returned non-JSON response');
        }

        const data = await response.json();
        // Map _id to id for compatibility
        const formattedProducts = data.map(product => ({
          id: product._id,
          category: product.category,
          name: product.name,
          actualPrice: product.actualPrice,
          ourPrice: product.ourPrice,
          per: product.per
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      },
      { All: products.length }
    );
    return counts;
  }, [products]);

  const totalAmount = useMemo(() => {
    return cartItems
      .reduce(
        (acc, item) => acc + (Number(item.ourPrice) || 0) * (Number(item.qty) || 0),
        0
      )
      .toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase().replace(/\s+/g, "");
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().replace(/\s+/g, "").includes(query)
      );
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => (Number(a.ourPrice) || 0) - (Number(b.ourPrice) || 0));
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => (Number(b.ourPrice) || 0) - (Number(a.ourPrice) || 0));
    }
    return filtered;
  }, [products, selectedCategory, searchQuery, sortOrder]);

  // Group products by category when "All" is selected
  const groupedProducts = useMemo(() => {
    if (selectedCategory !== "All") return null;
    const grouped = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [filteredProducts, selectedCategory]);

  const handleQuantityChange = (product, value) => {
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
      removeFromCart(product.id);
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

  if (isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
        <p>Please check if the backend server is running and the API endpoint is correct.</p>
      </div>
    );
  }
   const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gray-50">
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
       <div className="fixed bottom-20 right-10 z-50">
      <button
        onClick={handleScrollTop}
        className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-200 "
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg text-gray-700" />
      </button>
    </div>

      {/* Main Catalog Title */}
      <div className="pb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Products Catalog
        </h2>
      </div>

      {/* Selected Category Title */}
      <div className="pb-4 text-center">
        <h3 className="text-2xl font-semibold text-gray-700">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h3>
      </div>

      {/* Cart Floating */}
      <div className="fixed bottom-4 inset-x-0 z-50 sm:bottom-6 flex justify-center">
        <Link to="/cart">
          <div className="relative flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-4 py-2 shadow-lg">
            <div className="relative">
              <img src={cart} alt="Cart" className="w-8 h-8 sm:w-10 sm:h-10" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
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
            className="sm:hidden bg-red-600 text-white px-4 py-2 rounded w-full mb-4 flex justify-between items-center"
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
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    {cat} ({categoryCounts[cat] || 0})
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
              className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500"
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
            <div>Actual Price / Our Price (₹)</div>
            <div>Unit</div>
            <div>Quantity</div>
          </div>

          {/* Product Items */}
          <AnimatePresence>
            {selectedCategory === "All" && groupedProducts ? (
              Object.entries(groupedProducts).map(([category, products], catIndex) => (
                <div key={category}>
                  {/* Category Title for Each Group */}
                  <div className="bg-gray-300 p-3 mt-4 rounded font-bold text-gray-800 text-lg">
                    {category}
                  </div>
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-[50px_2fr_1fr_1fr_160px] gap-4 border-b p-3 items-center text-sm sm:text-base"
                    >
                      <div>{filteredProducts.indexOf(product) + 1}</div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-red-600">
                        <span className="line-through">
                          ₹{Number(product.actualPrice).toFixed(2)}
                        </span>{" "}
                        / ₹{Number(product.ourPrice).toFixed(2)}
                      </div>
                      <div>{product.per}</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={getItemQuantity(product.id)}
                          onChange={(e) => handleQuantityChange(product, e.target.value)}
                          onBlur={() => handleInputBlur(product)}
                          className="w-20 text-center border rounded border-black"
                          min="0"
                          placeholder="Qty"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))
            ) : (
              filteredProducts.map((product, index) => (
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
                  <div className="text-red-600">
                    <span className="line-through">
                      ₹{Number(product.actualPrice).toFixed(2)}
                    </span>{" "}
                    / ₹{Number(product.ourPrice).toFixed(2)}
                  </div>
                  <div>{product.per}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={getItemQuantity(product.id)}
                      onChange={(e) => handleQuantityChange(product, e.target.value)}
                      onBlur={() => handleInputBlur(product)}
                      className="w-20 text-center border rounded border-black"
                      min="0"
                      placeholder="Qty"
                    />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}