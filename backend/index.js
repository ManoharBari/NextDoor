require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/booking", bookingRoutes);
app.use("/review", reviewRoutes);
app.use("/chat", chatRoutes);
app.use("/payments", paymentRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("NextDoor Backend Working!");
});

module.exports = app;
