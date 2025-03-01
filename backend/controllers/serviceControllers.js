const Service = require("../models/Service");

// Create a new service
const create = async (req, res) => {
  try {
    const { title, description, price, provider, availability, category } =
      req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newService = new Service({
      title,
      description,
      provider,
      availability,
      category,
      price,
      image: imageUrl,
    });
    await newService.save();

    res
      .status(201)
      .json({ service: newService, message: "Service created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services
const viewAll = async (req, res) => {
  try {
    const services = await Service.find().populate(
      "provider",
      "name email location profilePicture"
    );
    res.json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    res.json({ service, message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, viewAll, remove };
