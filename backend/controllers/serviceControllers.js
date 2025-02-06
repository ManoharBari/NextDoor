const express = require("express");
const Service = require("../models/Service");

// Create a new service
const create = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services
const viewAll = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, viewAll };
