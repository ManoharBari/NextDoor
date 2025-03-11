require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      profilePicture: imageUrl,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ user, token, message: "User Signup successfully" });
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

    res.json({ user, token, message: "User Login successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

//get user details
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //select()- password does not include
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signup, login, getUser };
