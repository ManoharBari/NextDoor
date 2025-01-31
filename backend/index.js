const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Notebook Backend Working!");
});

module.exports = app;
