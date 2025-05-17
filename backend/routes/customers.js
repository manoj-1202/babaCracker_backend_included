const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

// Get all customers
router.get("/", async (req, res) => {
  try {
    console.log("Fetching customers...");
    const customers = await Customer.find().populate("orders").lean();
    console.log("Customers fetched:", {
      count: customers.length,
      customers: customers.map((c) => ({
        _id: c._id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        address: c.address,
        orderCount: c.orders.length,
      })),
    });
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({
      message: "Failed to fetch customers",
      error: err.message,
    });
  }
});

module.exports = router;