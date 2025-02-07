const Review = require("../models/Review");

// Add a review
const create = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a provider
const viewAll = async (req, res) => {
  try {
    const reviews = await Review.find({
      provider: req.params.providerId,
    }).populate("client", "name");
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, viewAll };
