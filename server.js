const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to handle cart order submission
app.post("/place-order", async (req, res) => {
  const { name, email, mobile, address, cartItems, totalAmount } = req.body;

  if (!name || !email || !mobile || !address || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Incomplete order data" });
  }

  const MINIMUM_ORDER_AMOUNT = 3000;
  if (Number(totalAmount) < MINIMUM_ORDER_AMOUNT) {
    return res.status(400).json({ 
      message: `Minimum order amount is ₹${MINIMUM_ORDER_AMOUNT}.`
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ttsapplications2025@gmail.com",
        pass: "djor ksrg pkzt zznd",
      },
    });

    // Generate order number and date
   
    const orderDate = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemList = cartItems
      .map(
        (item, index) =>
          `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td><s>₹${Number(item.actualPrice).toFixed(2)}</s> / ₹${Number(item.ourPrice).toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>₹${(Number(item.ourPrice) * Number(item.qty)).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    const htmlContent = `
      <h2>New Order Placed</h2>
     
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
      subject: `New Customer Order Received - ${orderNumber}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: "Order placed and email sent successfully!",
      orderNumber: orderNumber
    });
  } catch (error) {
    console.error("Error sending order email:", error);
    res.status(500).json({ message: "Failed to send order email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});