const Chat = require("../models/Chat");

// Send a message
const send = async (req, res) => {
  try {
    const message = await Chat.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get chat messages between two users
const getChat = async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { sender: req.params.senderId, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.params.senderId },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { send, getChat };
