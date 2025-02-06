const Booking = require("../models/Booking");

// Create a new booking
const create = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings for a user
const viewAll = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.params.userId }).populate(
      "service provider"
    );
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking for a user
const update = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.userId,
      { status: req.body.status },
      { new: true }
    );
    res.json({ booking, message: "Order updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, viewAll, update };
