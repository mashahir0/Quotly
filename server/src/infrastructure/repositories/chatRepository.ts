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
    async getRecentChatUsers(userId: string, limit: number) {
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
          $addFields: {
            chatWith: {
              $cond: [
                { $eq: ["$senderId", objectId] },
                "$receiverId",
                "$senderId"
              ]
            },
            isSender: { $eq: ["$senderId", objectId] }
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: "$chatWith",
            seen: { $first: "$seen" },
            isSender: { $first: "$isSender" },
            lastMessageAt: { $first: "$createdAt" }
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
            seen: 1,
            isSender: 1,
            lastMessageAt: 1
          }
        },
        { $sort: { lastMessageAt: -1 } },
        { $limit: limit }
      ]);
    
      return { users: recentChats };
    }
    
    
  };
  
  export default chatRepository;
  