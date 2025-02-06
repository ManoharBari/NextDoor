require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const auth = require("./routes/authRoutes");
const service = require("./routes/serviceRoutes");
const booking = require("./routes/bookingRoutes");

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", auth);
app.use("/services", service);
app.use("/booking", booking);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("NextDoor Backend Working!");
});

module.exports = app;
