import { Request, Response } from "express";
import chatService from "../../usecases/chatServices";
import { io } from "../../server";
import mongoose from "mongoose";



interface AuthenticatedRequest extends Request {
    user?: { id: string; name: string; email: string; role: string }; 
  }


const chatController = {
  // ✅ Send a new message
//   async sendMessage(req: AuthenticatedRequest, res: Response) {
//     try {
//         console.log('send messag cont')
//       const { receiverId, message } = req.body;
//       const senderId = req.user?.id;
//       if (!senderId || !receiverId || !message) return res.status(400).json({ message: "Invalid data" });

//       const newMessage = await chatService.sendMessage(senderId, receiverId, message);
//       console.log(`📩 Sending message from ${senderId} to ${receiverId}`);
//         console.log(`Message Content:`, newMessage);

//     io.to(receiverId).emit("newMessage", newMessage);
//     io.to(senderId).emit("newMessage", newMessage);


//       res.status(201).json(newMessage);
//     } catch (error:any) {
//       res.status(500).json({ message: "Error sending message", error: error.message });
//     }
//   },
async sendMessage(req: AuthenticatedRequest, res: Response) {
    try {
        console.log('send message controller triggered');
        const { receiverId, message } = req.body;
        const senderId = req.user?.id;

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: "Invalid data" });
        }

        // Store message in DB
        const newMessage = await chatService.sendMessage(senderId, receiverId, message);
        console.log(`📩 Stored message from ${senderId} to ${receiverId}:`, newMessage);

        // ✅ Do NOT emit via WebSocket (handled separately)
        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(500).json({ message: "Error sending message", error: error.message });
    }
},



  // ✅ Get message history
  async getMessages(req: AuthenticatedRequest, res: Response) {
    try {
      const senderId = req.user?.id;

      const { receiverId } = req.params;
      if (!senderId || !receiverId) return res.status(400).json({ message: "Invalid data" });

      const messages = await chatService.getMessages(senderId, receiverId);
      res.status(200).json(messages);
    } catch (error :any) {
      res.status(500).json({ message: "Error fetching messages", error: error.message });
    }
  },

  // ✅ Mark messages as seen
  async markMessagesAsSeen(req: AuthenticatedRequest, res: Response) {
    try {
      const senderId = req.user?.id;
      const { receiverId } = req.params;
      if (!senderId) {
        return res.status(401).json({ message: "Unauthorized: No sender ID found" });
      }
      await chatService.markMessagesAsSeen(senderId, receiverId);
      res.status(200).json({ message: "Messages marked as seen" });
    } catch (error :any) {
      res.status(500).json({ message: "Error marking messages", error: error.message });
    }
  },

  async chatUserList(req:Request, res: Response){
    try {
        const users = await chatService.getChatusers()
        res.status(200).json(users)
    } catch (error: any) {
        console.log(error)
        res.status(401).json({message : 'users not found', error : error})
    }
  }
};

export default chatController;
