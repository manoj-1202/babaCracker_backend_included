const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const Customer = require("../models/customer");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateTrackingId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 10);
  return `${timestamp}-${randomStr}`.toUpperCase();
};

const MINIMUM_ORDER_AMOUNT = 3000;

router.post("/create-payment-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < MINIMUM_ORDER_AMOUNT * 100) {
      return res.status(400).json({ message: `Minimum order amount is ₹${MINIMUM_ORDER_AMOUNT}.` });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    res.json({
      razorpayOrderId: razorpayOrder.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Error creating payment order:", err);
    res.status(500).json({ message: "Failed to create payment order", error: err.message });
  }
});

router.post("/place-order", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      address,
      cartItems,
      totalAmount,
      orderDate,
      paymentDetails,
    } = req.body;

    console.log("Received place-order request:", {
      name,
      email,
      mobile,
      address,
      totalAmount,
      orderDate,
      cartItems,
      paymentDetails,
    });

    // Basic validation
    if (
      !name ||
      !email ||
      !mobile ||
      !address ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0 ||
      !totalAmount ||
      !orderDate ||
      !paymentDetails
    ) {
      return res.status(400).json({ message: "Incomplete order data" });
    }

    if (Number(totalAmount) < MINIMUM_ORDER_AMOUNT) {
      return res.status(400).json({ message: `Minimum order amount is ₹${MINIMUM_ORDER_AMOUNT}.` });
    }

    // Verify payment
    const crypto = require("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        `${paymentDetails.razorpay_order_id}|${paymentDetails.razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== paymentDetails.razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Validate and enrich cart items
    const enrichedCartItems = [];
    for (const item of cartItems) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: `Invalid productId: ${item.productId}` });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }

      enrichedCartItems.push({
        productId: item.productId,
        name: item.name || product.name,
        actualPrice: product.actualPrice,
        ourPrice: item.ourPrice,
        per: item.per,
        qty: item.qty,
      });
    }

    // Create or update customer
    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = new Customer({ name, email, phone: mobile, address });
      try {
        await customer.save();
        console.log("New customer created:", customer);
      } catch (err) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Customer creation error:", err);
        return res.status(400).json({ message: "Failed to create customer", error: err.message });
      }
    } else if (address && address.trim() !== "") {
      customer.address = address;
      await customer.save();
      console.log("Customer address updated:", { _id: customer._id, email, address });
    }

    const order = new Order({
      orderDate,
      totalAmount,
      cartItems: enrichedCartItems,
      customer: customer._id,
      trackingId: null,
      paymentDetails: {
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_order_id: paymentDetails.razorpay_order_id,
      },
    });

    let savedOrder = null;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const trackingId = generateTrackingId();
        console.log(`Attempt ${attempt}: Generated trackingId: ${trackingId}`);

        const existingOrder = await Order.findOne({ trackingId });
        if (existingOrder) {
          console.log(`Attempt ${attempt}: trackingId ${trackingId} already exists, retrying...`);
          continue;
        }

        order.trackingId = trackingId;
        savedOrder = await order.save();
        console.log(`Order saved successfully with trackingId: ${trackingId}`);
        break;
      } catch (err) {
        console.error(`Attempt ${attempt}: Failed to save order`, err);
        if (attempt === 5 || err.code !== 11000) {
          throw new Error(`Failed to save order after ${attempt} attempts: ${err.message}`);
        }
      }
    }

    customer.orders.push(savedOrder._id);
    await customer.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "ttsapplications2025@gmail.com",
        pass: process.env.EMAIL_PASS || "djor ksrg pkzt zznd",
      },
    });

    const itemList = enrichedCartItems
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td><s>₹${Number(item.actualPrice).toFixed(2)}</s> / ₹${Number(
          item.ourPrice
        ).toFixed(2)}</td>
          <td>${item.qty}</td>
          <td>₹${(Number(item.ourPrice) * Number(item.qty)).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const htmlContent = `
      <h2>New Order Placed</h2>
      <p><strong>Order ID:</strong> ${savedOrder._id}</p>
      <p><strong>Tracking ID:</strong> ${savedOrder.trackingId}</p>
      <p><strong>Payment ID:</strong> ${paymentDetails.razorpay_payment_id}</p>
      <p><strong>Order Date:</strong> ${orderDate}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Address:</strong> ${address}</p>
      <h3>Order Details:</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Actual Price / Our Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemList}
        </tbody>
      </table>
      <p><strong>Total Amount:</strong> ₹${Number(totalAmount).toFixed(2)}</p>
    `;

    const mailOptions = {
      from: `Order from ${name} <${email}>`,
      to: "manojpolevault1202@gmail.com",
      subject: `New Customer Order Received - ${savedOrder._id}`,
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    res.json({
      message: "Order placed successfully!",
      orderId: savedOrder._id.toString(),
      trackingId: savedOrder.trackingId,
      name,
      totalAmount,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({
      message: "Failed to place order. Please try again later.",
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("customer").lean();
    console.log("Orders fetched:", {
      count: orders.length,
      orders: orders.map((o) => ({
        _id: o._id,
        customer: o.customer?.email,
        trackingId: o.trackingId,
      })),
    });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});

module.exports = router;