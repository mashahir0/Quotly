
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./interfaces/routes/userRoutes";
import adminRoutes from "./interfaces/routes/adminRoutes";
import postRoutes from "./interfaces/routes/postRoutes";
import chatRoutes from "./interfaces/routes/chatRoutes";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import http from "http"; // Required for Socket.io
import { Server } from "socket.io";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // ✅ Correct frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

const server = http.createServer(app); // Create HTTP Server for WebSockets

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Fix: Match frontend URL
    methods: ["GET", "POST"],
    credentials: true, // ✅ Allow cross-origin cookies if needed
  },
});

// Store connected users
const users: { [key: string]: string } = {};

// Listen for WebSocket connections
io.on("connection", (socket) => {

  socket.on("register", (userId) => {
    if (!userId) return;
    users[userId] = socket.id;
    socket.join(userId);
  });

  // ✅ Handle typing event
  socket.on("typing", ({ receiverId }) => {
    if (!receiverId || !users[receiverId]) return;
    io.to(users[receiverId]).emit("typing");
  });
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    if (!senderId || !receiverId || !message) {
      return;
    }

  
    // Ensure users are in their rooms
    socket.join(senderId);
    socket.join(receiverId);

    // ✅ Emit message only ONCE to each recipient
    io.to(receiverId).emit("newMessage", data);
    io.to(senderId).emit("newMessage", data);
  });
  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) delete users[userId]; // Remove user on disconnect
  });
});

app.use("/api/user", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/post", postRoutes);
app.use("/api/user/chat", chatRoutes);

connectDB();

export { server, io };
server.listen(3000, () => console.log("🚀 Server running on port 3000"));


