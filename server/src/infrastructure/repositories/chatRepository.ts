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
    }
  };
  
  export default chatRepository;
  