import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import shopNow from "../assets/shopNow.png";
import phonecall from "../assets/phone-call.png";
import whatsapp from "../assets/whatsapp.png";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem, totalItems, clearCart } = useCart();
  const [lastRemoved, setLastRemoved] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (Number(item.ourPrice) || 0) * (Number(item.qty) || 0),
    0
  ).toFixed(2);

  const MINIMUM_ORDER_AMOUNT = 3000;

  const handleQuantityChange = (item, value) => {
    const newQty = parseInt(value, 10);
    if (isNaN(newQty) || newQty <= 0) {
      updateCartItem(item.id, "");
    } else {
      updateCartItem(item.id, newQty);
    }
  };

  const handleRemoveFromCart = (item) => {
    setLastRemoved({ id: item.id, name: item.name });
    removeFromCart(item.id);
    setTimeout(() => setLastRemoved(null), 2000);
  };

  const handlePlaceOrder = async () => {
    if (Number(totalAmount) < MINIMUM_ORDER_AMOUNT) {
      setOrderStatus({
        success: false,
        message: `Minimum order amount is ₹${MINIMUM_ORDER_AMOUNT}. Please add more items to your cart.`,
      });
      return;
    }

    setIsPlacingOrder(true);
    try {
      // Generate order date in the same format as the backend
      const orderDate = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const response = await axios.post("http://localhost:5000/place-order", {
        name,
        email,
        mobile,
        address,
        cartItems,
        totalAmount,
        orderDate, 
      });
      clearCart();
      navigate("/thank-you", {
        state: {
          orderNumber: response.data.orderNumber,
          name: response.data.name,           
          totalAmount: response.data.totalAmount 
        }
      });
      
    } catch (error) {
      setOrderStatus({ success: false, message: "Failed to place order." });
      console.error("Order error:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const isPlaceOrderDisabled = cartItems.length === 0 || !email || !mobile || !name || !address;

  return (
    <div className="px-4 py-6 sm:py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Your Shopping Cart
        </h2>

        {/* Product cart icon */}
        <div className="fixed bottom-10 inset-x-0 z-50 sm:bottom-8 flex justify-end pr-4 sm:pr-6">
          <Link to="/productCard">
            <div className="rounded-full">
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

        {lastRemoved && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded shadow z-10 animate-pulse">
            {lastRemoved.name} removed!
          </div>
        )}

        <p className="text-center mb-4">
          <Link
            to="/ProductCard"
            className="text-red-600 text-base sm:text-lg font-semibold hover:underline"
          >
            <span className="text-xl">←</span> Products
          </Link>{" "}
          |{" "}
          <Link
            to="/cart"
            className="text-gray-600 text-base sm:text-lg hover:underline"
          >
            Cart
          </Link>
        </p>

        {cartItems.length === 0 ? (
          <p className="text-center text-base sm:text-lg text-gray-600 mt-12 sm:mt-32">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Table for medium and larger screens */}
            <div className="hidden sm:block w-full mt-5">
              <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_80px] gap-2 sm:gap-4 font-semibold text-gray-700 bg-gray-100 p-3 sm:p-4 rounded-t-md">
                <div>S.No</div>
                <div>Product Name</div>
                <div>Actual Price / Our Price (₹)</div>
                <div>Quantity</div>
                <div>Total (₹)</div>
                <div>Actions</div>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_80px] gap-2 sm:gap-4 items-center border-b p-3 sm:p-4 border-gray-400"
                >
                  <div>{index + 1}</div>
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-gray-700">
                    <span className="line-through">₹{Number(item.actualPrice).toFixed(2)}</span> / ₹{Number(item.ourPrice).toFixed(2)}
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="w-14 sm:w-16 text-center text-gray-800 font-medium border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    ₹{(Number(item.ourPrice) * Number(item.qty)).toFixed(2)}
                  </div>
                  <div>
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Card layout for small screens */}
            <div className="sm:hidden mt-5 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-md p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {index + 1}. {item.name}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Price:</span>
                    <span>
                      <span className="line-through">₹{Number(item.actualPrice).toFixed(2)}</span> / ₹{Number(item.ourPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700 text-sm">Quantity:</span>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="w-14 text-center text-gray-800 font-medium border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div className="flex justify-between text-blue-600 font-semibold mt-2">
                    <span>Total:</span>
                    <span>₹{(Number(item.ourPrice) * Number(item.qty)).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="mt-6 sm:mt-10 border-t pt-4 sm:pt-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-base sm:text-lg font-bold">
                  Total Items:{" "}
                  <span className="text-blue-600 font-bold">{totalItems}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold">
                  Total Amount: ₹
                  <span className="text-blue-600 font-bold">{totalAmount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address (e.g., example@domain.com)"
                  required
                />
                <input
                  type="tel"
                  placeholder="Enter your Mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  title="Please enter a 10-digit mobile number"
                  required
                />
                <textarea
                  placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  rows="4"
                  required
                />
              </div>

              <button
                disabled={isPlaceOrderDisabled || isPlacingOrder}
                onClick={handlePlaceOrder}
                className={`w-full px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg rounded transition ${
                  isPlaceOrderDisabled || isPlacingOrder
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isPlacingOrder ? "Placing..." : "Place Order"}
              </button>
            </div>

            {orderStatus && (
              <div
                className={`mt-4 text-center font-semibold text-sm sm:text-base ${
                  orderStatus.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {orderStatus.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}