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

const updateService = async (req, res) => {
  try {
    const { id } = req.params; // Get service ID from URL
    const { title, description, provider, price, category, availability } =
      req.body;

    let updatedData = {
      title,
      description,
      provider,
      price,
      category,
      availability,
    };

    // If there's a new image uploaded, update the image field
    if (req.file) {
      updatedData.image = `uploads/${req.file.filename}`;
    }

    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
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
    res.json({ service, message: "Service deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, viewAll, updateService, remove };
