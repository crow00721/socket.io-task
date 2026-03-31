const Message = require("../models/message");
const { encrypt, decrypt } = require("../middlewares/encryption");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { fromUserId, toUserId, content } = req.body;

    const encryptedContent = encrypt(content);

    const message = await Message.create({
      fromUserId,
      toUserId,
      contentEncrypted: encryptedContent,
    });

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Messages (Decrypted)
exports.getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    const messages = await Message.find({
      $or: [
        { fromUserId: user1, toUserId: user2 },
        { fromUserId: user2, toUserId: user1 },
      ],
    }).sort({ createdAt: 1 });

    const decryptedMessages = messages.map((msg) => ({
      ...msg._doc,
      content: decrypt(msg.contentEncrypted),
    }));

    res.json(decryptedMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};