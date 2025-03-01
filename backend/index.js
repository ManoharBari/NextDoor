require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { authMiddleware } = require("./middleware/authMiddleware");

// middleware
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);
app.use("/services", express.static("uploads"), serviceRoutes);
app.use("/review", reviewRoutes);
app.use("/chat", authMiddleware, chatRoutes);
app.use("/payments", authMiddleware, paymentRoutes);
app.use("/orders", authMiddleware, orderRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("NextDoor Backend Working!");
});

module.exports = app;
