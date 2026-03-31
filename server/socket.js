const jwt = require("jsonwebtoken");
const Message = require("./models/message");
const { encrypt } = require("./middlewares/encryption");

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Unauthorized"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    socket.on("send_message", async ({ toUserId, content }) => {
      const fromUserId = socket.user.id;

      const encryptedContent = encrypt(content);

      const msg = await Message.create({
        fromUserId,
        toUserId,
        contentEncrypted: encryptedContent,
      });

      io.emit("receive_message", {
        ...msg._doc,
        content,
      });
    });
  });
};