require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role, location, skills } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      skills,
    });
    res.status(201).json({ message: "User Signup successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token, message: "User Login successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };
