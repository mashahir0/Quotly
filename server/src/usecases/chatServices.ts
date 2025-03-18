import chatRepository from "../infrastructure/repositories/chatRepository";
import UserRepository from "../infrastructure/repositories/userRepository";


const chatService = {
  async sendMessage(senderId: string, receiverId: string, message: string) {
    return await chatRepository.saveMessage(senderId, receiverId, message);
  },

  async getMessages(senderId: string, receiverId: string) {
    return await chatRepository.getMessages(senderId, receiverId);
  },

  async markMessagesAsSeen(senderId: string, receiverId: string) {
    return await chatRepository.markMessagesAsSeen(senderId, receiverId);
  },
  async getChatusers(){
    return await UserRepository.getAllUsers()
  }
};

export default chatService;
