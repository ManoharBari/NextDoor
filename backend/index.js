require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { authMiddleware } = require("./middleware/authMiddleware");
const apiLimiter = require("./middleware/apiLimiter");

// middleware
const corsOptions = {
  origin: ["http://localhost:8080", "https://next-door-app.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Apply rate limiter to all routes
app.use(apiLimiter);
app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/chat", authMiddleware, chatRoutes);
app.use("/orders", authMiddleware, orderRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("NextDoor Backend Working!");
});

module.exports = app;
