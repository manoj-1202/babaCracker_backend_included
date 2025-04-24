const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to handle cart order submission
app.post("/place-order", async (req, res) => {
  const { email, mobile, cartItems, totalAmount } = req.body;

  if (!email || !mobile || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Incomplete order data" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ttsapplications2025@gmail.com", // Gmail id
        pass: "djor ksrg pkzt zznd", //   App Password
      },
    });

    const itemList = cartItems
      .map(
        (item, index) =>
          `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.rate}</td>
            <td>${item.qty}</td>
            <td>${item.rate * item.qty}</td>
          </tr>`
      )
      .join("");

    const htmlContent = `
      <h2>New Order Placed</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <h3>Order Details:</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemList}
        </tbody>
      </table>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    `;

    const mailOptions = {
      from: `"Order from Cart" <${email}>`,
      to: "manojpolevault1202@gmail.com",
      subject: "New Customer Order Received",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order placed and email sent successfully!" });
  } catch (error) {
    console.error("Error sending order email:", error);
    res.status(500).json({ message: "Failed to send order email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
