import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./interfaces/routes/userRoutes";
import adminRoutes from "./interfaces/routes/adminRoutes";
import postRoutes from './interfaces/routes/postRoutes'
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import http from "http"; // Required for Socket.io
import { Server } from "socket.io";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));


const server = http.createServer(app); // Create HTTP Server for WebSockets

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
});

// Listen for WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("updateLikes", (data) => {
    io.emit("updateLikes", data); // Broadcast like updates to all users
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



app.use("/api/user", authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/user/post',postRoutes)

connectDB();

export { server, io };
server.listen(process.env.PORT, () => console.log("Server running on port 3000"));
