import mongoose from "mongoose";
import chatModel from "../../domain/models/chatModel";

const chatRepository = {
    // ✅ Save a new message
    async saveMessage(senderId: string, receiverId: string, message: string) {
      return await chatModel.create({ senderId, receiverId, message });
    },
  
    // ✅ Get chat history between two users
    async getMessages(senderId: string, receiverId: string) {
      return await chatModel
        .find({ 
          $or: [
            { senderId, receiverId }, 
            { senderId: receiverId, receiverId: senderId }
          ]
        })
        .sort({ createdAt: 1 }) // ✅ Sort messages in ascending order
        .populate("senderId", "name photo")
        .populate("receiverId", "name photo");
    },
  
    // ✅ Mark messages as seen
    async markMessagesAsSeen(senderId: string, receiverId: string) {
      return await chatModel.updateMany(
        { senderId: receiverId, receiverId: senderId, seen: false },
        { $set: { seen: true } }
      );
    },
    async getRecentChatUsers(userId: string) {
      const objectId = new mongoose.Types.ObjectId(userId);
    
      const recentChats = await chatModel.aggregate([
        {
          $match: {
            $or: [
              { senderId: objectId },
              { receiverId: objectId }
            ]
          }
        },
        {
          $sort: { createdAt: -1 } // or updatedAt if it's updated properly
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$senderId", objectId] },
                "$receiverId",
                "$senderId"
              ]
            },
            message: { $first: "$message" },
            createdAt: { $first: "$createdAt" }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        {
          $project: {
            _id: "$user._id",
            name: "$user.name",
            photo: "$user.photo",
            lastMessage: "$message",
            lastMessageAt: "$createdAt"
          }
        },
        { $sort: { lastMessageAt: -1 } } // final sort for UI
      ]);
    
      return recentChats;
    }
    
    
  };
  
  export default chatRepository;
  