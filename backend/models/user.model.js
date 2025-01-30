const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["client", "provider"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // Relevant for service providers
  skills: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  // URL to profile image
  profilePicture: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
