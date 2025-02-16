const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const { userId, serviceId, amount } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: `order_rcptid_${Math.random().toString(36).substring(7)}`,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      serviceId,
      amount,
      currency: "INR",
      status: "created",
    });

    await newOrder.save();

    res.json({ success: true, order, orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpay_order_id },
        { paymentId: razorpay_payment_id, status: "paid" }
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification error" });
  }
};

module.exports = { createOrder, verifyPayment };
