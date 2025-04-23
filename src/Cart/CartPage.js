import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem, totalItems } = useCart();

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
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Your Shopping Cart
        </h2>

{/* Back buttons */}
        <p>
          <Link to="/ProductCard" className="text-blue-600 text-xl font-semibold hover:underline">
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
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded shadow border gap-4 mt-5"
                >
                  <div className="flex flex-col gap-1 w-full sm:w-2/3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">
                      ₹ {item.rate} / {item.per}
                    </p>
                    <p className=" font-medium">
                      Total: ₹ {item.rate * item.qty}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2 border rounded px-2 py-1">
                      <button
                        className="text-lg font-bold text-gray-700 px-2"
                        onClick={() => handleDecrement(item)}
                      >
                        −
                      </button>
                      <span className="text-gray-800 font-medium">
                        {item.qty}
                      </span>
                      <button
                        className="text-lg font-bold text-gray-700 px-2"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full sm:w-auto"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t pt-6 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-4 lg:gap-10">
              <div className="text-lg sm:text-xl font-bold ">
                Total Items:{" "}
                <span className="text-blue-600 font-bold">{totalItems}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                Total Amount: ₹
                <span className="text-blue-600 font-bold"> {totalAmount}</span>
              </div>

              <button
                disabled={cartItems.length === 0}
                className={`w-full sm:w-auto px-6 py-3 text-lg rounded transition ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
