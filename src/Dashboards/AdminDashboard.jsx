import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Package,
  Users,
  ClipboardList,
  BarChart2,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [recentlyChangedProducts, setRecentlyChangedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    actualPrice: "",
    ourPrice: "",
    per: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);
  const [customerError, setCustomerError] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [productError, setProductError] = useState(null);
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access the dashboard.");
      navigate("/admin/login");
    } else {
      // Set axios default Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [navigate]);

  // Fetch products when products or addProducts section is active
  useEffect(() => {
    if (activeSection === "products" || activeSection === "addProducts") {
      const fetchProducts = async () => {
        try {
          setProductError(null);
          const response = await axios.get(
            "http://localhost:5001/api/products"
          );
          setProducts(response.data);
          if (response.data.length === 0) {
            toast.info("No products found in the database.");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          let errorMessage =
            error.response?.data?.message || "Failed to fetch product data.";
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            toast.error("Session expired. Please log in again.");
            navigate("/admin/login");
          } else {
            setProductError(errorMessage);
            toast.error(errorMessage);
          }
        }
      };
      fetchProducts();
    }
  }, [activeSection, navigate]);

  // Fetch customers when the customers section is active
  useEffect(() => {
    if (activeSection === "customers") {
      const fetchCustomers = async () => {
        try {
          setCustomerError(null);
          const response = await axios.get(
            "http://localhost:5001/api/customers"
          );
          setCustomers(response.data);
          if (response.data.length === 0) {
            toast.info("No customers found in the database.");
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
          let errorMessage =
            error.response?.data?.message || "Failed to fetch customer data.";
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            toast.error("Session expired. Please log in again.");
            navigate("/admin/login");
          } else {
            setCustomerError(errorMessage);
            toast.error(errorMessage);
          }
        }
      };
      fetchCustomers();
    }
  }, [activeSection, navigate]);

  // Fetch orders when the orders or dashboard section is active
  useEffect(() => {
    if (activeSection === "orders" || activeSection === "dashboard") {
      const fetchOrders = async () => {
        try {
          setOrderError(null);
          const response = await axios.get("http://localhost:5001/api/orders");
          setOrders(response.data);
          if (response.data.length === 0) {
            toast.info("No orders found in the database.");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          let errorMessage =
            error.response?.data?.message || "Failed to fetch order data.";
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            toast.error("Session expired. Please log in again.");
            navigate("/admin/login");
          } else {
            setOrderError(errorMessage);
            toast.error(errorMessage);
          }
        }
      };
      fetchOrders();
    }
  }, [activeSection, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add or update a product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    const { name, category, actualPrice, ourPrice, per } = newProduct;

    if (!name || !category || !per) {
      setAlertMessage("All fields are required.");
      toast.error("All fields are required.");
      return;
    }
    const parsedActualPrice = parseFloat(actualPrice);
    const parsedOurPrice = parseFloat(ourPrice);
    if (
      isNaN(parsedActualPrice) ||
      isNaN(parsedOurPrice) ||
      parsedActualPrice < 0 ||
      parsedOurPrice < 0
    ) {
      setAlertMessage("Prices must be valid non-negative numbers.");
      toast.error("Prices must be valid non-negative numbers.");
      return;
    }

    const productData = {
      name,
      category,
      actualPrice: parsedActualPrice,
      ourPrice: parsedOurPrice,
      per,
    };

    try {
      if (editingProductId) {
        const response = await axios.put(
          `http://localhost:5001/api/products/${editingProductId}`,
          productData
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProductId ? response.data : p))
        );
        setRecentlyChangedProducts((prev) => [
          ...prev.filter((p) => p._id !== editingProductId),
          { ...response.data, status: "updated", timestamp: Date.now() },
        ]);
        setAlertMessage("Product updated successfully!");
        toast.success("Product updated successfully!");
        setEditingProductId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/products",
          productData
        );
        setProducts((prev) => [...prev, response.data]);
        setRecentlyChangedProducts((prev) => [
          ...prev,
          { ...response.data, status: "added", timestamp: Date.now() },
        ]);
        setAlertMessage("Product added successfully!");
        toast.success("Product added successfully!");
      }
      setNewProduct({
        name: "",
        category: "",
        actualPrice: "",
        ourPrice: "",
        per: "",
      });
    } catch (error) {
      console.error("Error saving product:", error);
      const errorMessage =
        error.response?.data?.message ||
        (editingProductId
          ? "Failed to update product."
          : "Failed to add product.");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/admin/login");
      } else {
        setAlertMessage(errorMessage);
        toast.error(errorMessage);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };

  // Handle edit functionality
  const handleEdit = (productId) => {
    console.log("Edit clicked for product ID:", productId);
    const productToEdit = products.find((p) => p._id === productId);
    if (productToEdit) {
      setNewProduct({
        name: productToEdit.name,
        category: productToEdit.category,
        actualPrice: productToEdit.actualPrice.toString(),
        ourPrice: productToEdit.ourPrice.toString(),
        per: productToEdit.per,
      });
      setEditingProductId(productId);
      setAlertMessage(
        "Product loaded for editing. Update and submit to save changes."
      );
      toast.info("Product loaded for editing.");
      setActiveSection("addProducts");
    }
  };

  // Handle delete functionality
  const handleDelete = async (productId) => {
    try {
      const productToDelete = products.find((p) => p._id === productId);
      if (productToDelete) {
        await axios.delete(`http://localhost:5001/api/products/${productId}`);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        setRecentlyChangedProducts((prev) => [
          ...prev,
          { ...productToDelete, status: "deleted", timestamp: Date.now() },
        ]);
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete product.";
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/admin/login");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Toggle order details for a customer
  const toggleCustomerOrders = (customerId) => {
    setExpandedCustomerId(
      expandedCustomerId === customerId ? null : customerId
    );
  };

  // Calculate total sales from orders
  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount),
    0
  );

  // Get the 4 most recent orders
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      section: "dashboard",
    },
    { name: "Orders", icon: <Package size={20} />, section: "orders" },
    { name: "Customers", icon: <Users size={20} />, section: "customers" },
    {
      name: "All Products",
      icon: <ClipboardList size={20} />,
      section: "products",
    },
    {
      name: "Add Products",
      icon: <BarChart2 size={20} />,
      section: "addProducts",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <aside className="w-64 min-h-screen bg-white bg-opacity-90 p-6 hidden sm:block shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-8">
          BabaCrackers Admin
        </h1>
        <nav className="space-y-4 text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to="#"
              onClick={() => setActiveSection(item.section)}
              className={`flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors ${
                activeSection === item.section
                  ? "bg-red-500 text-white font-semibold"
                  : "text-gray-800"
              }`}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
          <button
            className="flex items-center gap-2 text-red-600 mt-10 hover:text-red-800"
            onClick={handleLogout}
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      <div className="sm:hidden">
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative z-50 w-64 bg-white bg-opacity-90 h-full p-6 overflow-y-auto shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-red-600">
                  BabaCrackers Admin
                </h1>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-4 text-lg">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to="#"
                    onClick={() => {
                      setActiveSection(item.section);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors ${
                      activeSection === item.section
                        ? "bg-red-500 text-white font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {item.icon} {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 mt-10 hover:text-red-800"
                >
                  <LogOut size={20} /> Logout
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 p-6 overflow-y-auto w-full">
        <div className="sm:hidden flex items-center justify-between mb-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-bold text-red-600">BabaCrackers Admin</h1>
        </div>

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          {activeSection === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard
              </h1>
              {orderError && (
                <div className="mb-4 text-center p-4 rounded bg-red-500 text-white">
                  {orderError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-6 px-4">
                <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-xl text-left">Total Sales</p>
                    <p className="text-2xl font-bold text-center w-full absolute left-1/2 transform -translate-x-1/2">
                      ₹{totalSales.toFixed(2)}
                    </p>
                    <p className="text-sm text-right ml-auto">All Time</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h2 className="font-semibold mb-4 text-lg text-gray-800">
                    Recent Orders
                  </h2>
                  {orders.length === 0 && !orderError ? (
                    <p className="text-gray-600">No recent orders found.</p>
                  ) : (
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left">S.No</th>
                          <th className="px-4 py-2 text-left">Customer Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Total Orders</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer, index) => {
                          const customerOrders = orders.filter(
                            (order) => order.customer?._id === customer._id
                          );

                          return (
                            <React.Fragment key={customer._id}>
                              <tr className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                  {index + 1}
                                </td>
                                <td className="border px-4 py-2">
                                  {customer.name}
                                </td>
                                <td className="border px-4 py-2">
                                  {customer.email}
                                </td>
                                <td className="border px-4 py-2">
                                  {customerOrders.length}
                                </td>
                                <td className="border px-4 py-2">
                                  <button
                                    onClick={() =>
                                      toggleCustomerOrders(customer._id)
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    {expandedCustomerId === customer._id
                                      ? "Hide Orders"
                                      : "View Orders"}
                                  </button>
                                </td>
                              </tr>

                              {expandedCustomerId === customer._id && (
                                <tr>
                                  <td colSpan="5" className="border px-4 py-2">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Order Details
                                      </h3>
                                      {customerOrders.length === 0 ? (
                                        <p className="text-gray-600">
                                          No orders found.
                                        </p>
                                      ) : (
                                        <table className="w-full border-collapse">
                                          <thead>
                                            <tr className="bg-gray-200">
                                              <th className="px-4 py-2 text-left">
                                                Date
                                              </th>
                                              <th className="px-4 py-2 text-left">
                                                Total
                                              </th>
                                              <th className="px-4 py-2 text-left">
                                                Products
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {customerOrders.map((order) => (
                                              <tr
                                                key={order._id}
                                                className="hover:bg-gray-100"
                                              >
                                                <td className="border px-4 py-2">
                                                  {order.orderDate}
                                                </td>
                                                <td className="border px-4 py-2">
                                                  ₹
                                                  {Number(
                                                    order.totalAmount
                                                  ).toFixed(2)}
                                                </td>
                                                <td className="border px-4 py-2">
                                                  <ul className="list-disc list-inside">
                                                    {order.cartItems.map(
                                                      (item, i) => (
                                                        <li key={i}>
                                                          {item.name} (Qty:{" "}
                                                          {item.qty}, ₹
                                                          {Number(
                                                            item.ourPrice
                                                          ).toFixed(2)}
                                                          )
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="mt-6 text-center text-gray-600">
                <p>Contact: +91 9445280054</p>
                <p>Email: jais1829@gmail.com</p>
              </div>
            </>
          )}
          {activeSection === "orders" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>
              {orderError && (
                <div className="mb-4 text-center p-4 rounded bg-red-500 text-white">
                  {orderError}
                </div>
              )}
              {orders.length === 0 && !orderError ? (
                <p className="text-gray-600">No orders found.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-center">S.No</th>
                      <th className="px-4 py-2 text-center">Customer</th>
                      <th className="px-4 py-2 text-center">Date/Time</th>
                      <th className="px-4 py-2 text-center">Total Amount</th>
                      <th className="px-4 py-2 text-center">Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          {order.customer?.name || "N/A"}
                        </td>
                        <td className="border px-4 py-2">{order.orderDate}</td>
                        <td className="border px-4 py-2">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc list-inside">
                            {order.cartItems.map((item, i) => (
                              <li key={i}>
                                {item.name} (Qty: {item.qty}, Price: ₹
                                {Number(item.ourPrice).toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "customers" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Customers
              </h1>
              {customerError && (
                <div className="mb-4 text-center p-4 rounded bg-red-500 text-white">
                  {customerError}
                </div>
              )}
              {customers.length === 0 && !customerError ? (
                <p className="text-gray-600">No customers found.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">S.No</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Total Orders</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <React.Fragment key={customer._id}>
                        <tr className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{customer.name}</td>
                          <td className="border px-4 py-2">{customer.email}</td>
                          <td className="border px-4 py-2">
                            {customer.phone || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {customer.orders?.length || 0}
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => toggleCustomerOrders(customer._id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              {expandedCustomerId === customer._id
                                ? "Hide Orders"
                                : "View Orders"}
                            </button>
                          </td>
                        </tr>
                        {expandedCustomerId === customer._id && (
                          <tr>
                            <td colSpan="7" className="border px-4 py-2">
                              <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                  Order Details
                                </h3>
                                {customer.orders?.length === 0 ? (
                                  <p className="text-gray-600">
                                    No orders found.
                                  </p>
                                ) : (
                                  <table className="w-full border-collapse">
                                    <thead>
                                      <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-center">
                                          Date/Time
                                        </th>
                                        <th className="px-4 py-2 text-center">
                                          Total Amount
                                        </th>
                                        <th className="px-4 py-2 text-center">
                                          Products
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {customer.orders.map((order) => (
                                        <tr
                                          key={order._id}
                                          className="hover:bg-gray-100"
                                        >
                                          <td className="border px-4 py-2">
                                            {order.orderDate}
                                          </td>
                                          <td className="border px-4 py-2">
                                            ₹
                                            {Number(order.totalAmount).toFixed(
                                              2
                                            )}
                                          </td>
                                          <td className="border px-4 py-2">
                                            <ul className="list-disc list-inside">
                                              {order.cartItems.map(
                                                (item, i) => (
                                                  <li key={i}>
                                                    {item.name} (Qty: {item.qty}
                                                    , Price: ₹
                                                    {Number(
                                                      item.ourPrice
                                                    ).toFixed(2)}
                                                    )
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "products" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                All Products
              </h1>
              {productError && (
                <div className="mb-4 text-center p-4 rounded bg-red-500 text-white">
                  {productError}
                </div>
              )}
              {products.length === 0 && !productError ? (
                <p className="text-gray-600">No products found.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">S.No</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Actual Price</th>
                      <th className="px-4 py-2 text-left">Our Price</th>
                      <th className="px-4 py-2 text-left">Per</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{product.name}</td>
                        <td className="border px-4 py-2">{product.category}</td>
                        <td className="border px-4 py-2">
                          ₹{product.actualPrice.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">
                          ₹{product.ourPrice.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">{product.per}</td>
                        <td className="border px-4 py-2 space-x-2">
                          <button
                            onClick={() => handleEdit(product._id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "addProducts" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Add Products
              </h1>
              {alertMessage && (
                <div
                  className={`mb-4 text-center p-4 rounded ${
                    alertMessage.includes("successfully")
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {alertMessage}
                </div>
              )}
              <form onSubmit={handleAddProduct} className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Actual Price</label>
                    <input
                      type="number"
                      name="actualPrice"
                      value={newProduct.actualPrice}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Our Price</label>
                    <input
                      type="number"
                      name="ourPrice"
                      value={newProduct.ourPrice}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Per (Units)</label>
                    <input
                      type="text"
                      name="per"
                      value={newProduct.per}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  {editingProductId ? "Update Product" : "Add Product"}
                </button>
              </form>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recently Changed Products
              </h2>
              {recentlyChangedProducts.length === 0 ? (
                <p className="text-gray-600">No recent changes to products.</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">S.No</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Actual Price</th>
                      <th className="px-4 py-2 text-left">Our Price</th>
                      <th className="px-4 py-2 text-left">Per</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentlyChangedProducts.map((product, index) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{product.name}</td>
                        <td className="border px-4 py-2">{product.category}</td>
                        <td className="border px-4 py-2">
                          ₹{product.actualPrice.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">
                          ₹{product.ourPrice.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">{product.per}</td>
                        <td className="border px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-xs ${
                              product.status === "added"
                                ? "bg-green-500"
                                : product.status === "updated"
                                ? "bg-blue-500"
                                : "bg-red-500"
                            }`}
                          >
                            {product.status.charAt(0).toUpperCase() +
                              product.status.slice(1)}
                          </span>
                        </td>
                        <td className="border px-4 py-2 space-x-2">
                          {product.status !== "deleted" ? (
                            <>
                              <button
                                onClick={() => handleEdit(product._id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-500">
                              No actions available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
