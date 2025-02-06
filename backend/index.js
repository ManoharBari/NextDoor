const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const auth = require("./routes/authRoutes");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", auth);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("NextDoor Backend Working!");
});

module.exports = app;
