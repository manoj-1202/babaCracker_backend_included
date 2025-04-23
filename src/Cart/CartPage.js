import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem, totalItems } = useCart();
  const [lastRemoved, setLastRemoved] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.rate * item.qty,
    0
  );

  const handleIncrement = (item) => {
    updateCartItem(item.id, item.qty + 1);
  };

  const handleDecrement = (item) => {
    if (item.qty > 1) {
      updateCartItem(item.id, item.qty - 1);
    } else {
      setLastRemoved({ id: item.id, name: item.name });
      removeFromCart(item.id);
      setTimeout(() => setLastRemoved(null), 2000);
    }
  };

  const handleQuantityChange = (item, value) => {
    const newQty = parseInt(value, 10);
    if (isNaN(newQty) || newQty < 1) {
      setLastRemoved({ id: item.id, name: item.name });
      removeFromCart(item.id);
      setTimeout(() => setLastRemoved(null), 2000);
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
    setIsPlacingOrder(true);
    try {
      const response = await axios.post("http://localhost:5000/place-order", {
        email,
        mobile,
        cartItems,
        totalAmount,
      });
  
      navigate("/thank-you");
    } catch (error) {
      setOrderStatus({ success: false, message: "Failed to place order." });
      console.error("Order error:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };
  

  const isPlaceOrderDisabled = cartItems.length === 0 || !email || !mobile;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Your Shopping Cart
        </h2>

        {lastRemoved && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow z-10 animate-pulse">
            {lastRemoved.name} removed!
          </div>
        )}

        <p>
          <Link
            to="/ProductCard"
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            Products
          </Link>{" "}
          |{" "}
          <Link to="/cart" className="text-gray-600 hover:underline">
            Cart
          </Link>
        </p>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600 mt-32">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="w-full overflow-x-auto mt-5">
              <div className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_100px] gap-4 font-semibold text-gray-700 bg-gray-100 p-4 rounded-t-md">
                <div>S.No</div>
                <div>Product Name</div>
                <div>Rate (₹)</div>
                <div>Quantity</div>
                <div>Total (₹)</div>
                <div>Actions</div>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_100px] gap-4 items-center border-b p-4"
                >
                  <div>{index + 1}</div>
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-gray-700">₹{item.rate}</div>
                  <div className="flex items-center gap-2 border rounded px-2 py-1">
                    <button
                      className="text-lg font-bold text-gray-700 px-2"
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleQuantityChange(item, e.target.value)
                      }
                      className="w-12 text-center text-gray-800 font-medium border-none focus:ring-0"
                      min="1"
                    />
                    <button
                      className="text-lg font-bold text-gray-700 px-2"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-700">₹{item.rate * item.qty}</div>
                  <div>
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Summary Row */}
              <div className="mt-10 border-t pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-lg sm:text-xl font-bold">
                  Total Items:{" "}
                  <span className="text-blue-600 font-bold">{totalItems}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  Total Amount: ₹
                  <span className="text-blue-600 font-bold">
                    {totalAmount}
                  </span>
                </div>
                <div className="flex flex-col gap-2 w-full lg:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="p-2 border rounded shadow bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  disabled={isPlaceOrderDisabled || isPlacingOrder}
                  onClick={handlePlaceOrder}
                  className={`w-full sm:w-auto px-6 py-3 text-lg rounded transition ${
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
                  className={`mt-4 text-center font-semibold ${
                    orderStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {orderStatus.message}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
