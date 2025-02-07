const express = require("express");
const Payment = require("../models/Payment");
const router = express.Router();

// Process a payment
const processPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payments for a user
const getAllPayment = async (req, res) => {
  try {
    const payments = await Payment.find({ client: req.params.userId }).populate(
      "service provider"
    );
    res.json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { processPayment, getAllPayment };
