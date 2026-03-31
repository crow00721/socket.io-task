require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // ✅ ADD THIS

const connectDB = require("./config/db");

const chatRoutes = require("./routes/chatRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ ENABLE CORS HERE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);

// Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // socket CORS (fine)
});

require("./socket")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});