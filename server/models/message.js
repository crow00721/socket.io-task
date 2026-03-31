const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contentEncrypted: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);