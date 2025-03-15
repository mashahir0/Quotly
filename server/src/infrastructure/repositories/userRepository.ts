import UserModel from "../../domain/models/userModel";
import { IUser, User } from "../../domain/User";
import userModel from "../../domain/models/userModel";
import postRepository from "./postRepository";

const UserRepository = {
  async save(user: User) {
    return await new UserModel(user).save();
  },
  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  },
  async findById(id: string) {
    return await UserModel.findById(id).select('-password').exec();
  },
  async getAllUsers() {
    return await UserModel.find().select('-password').exec();
  },
  async findAndDelete(id: string) {
    // Step 1: Delete all posts by this user
    await postRepository.deletePostsByUser(id);

    // Step 2: Delete the user
    return await userModel.findByIdAndDelete(id);
  },
  async updateProfile(userId: string, updateData: Partial<IUser>) {
    return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
  },
};

export default UserRepository;
