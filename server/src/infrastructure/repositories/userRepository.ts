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
  async getUsersForChat(search: string, page: number, limit: number, lastId?: string) {
    const query: any = {};

    // ✅ Optimized Search using text index (if available)
    if (search) {
        query.name = { $regex: `^${search}`, $options: "i" }; // Starts with search term
    }

    // ✅ Efficient Pagination using `_id`
    if (lastId) {
        query._id = { $gt: lastId }; // Fetch users greater than last `_id`
    }

    const users = await userModel
        .find(query)
        .sort({ _id: 1 }) // ✅ Sorting by `_id` prevents overlaps
        .limit(limit)
        .select("_id name photo")
        .lean();

    return {
        users,
        lastId: users.length > 0 ? users[users.length - 1]._id : null, // ✅ Return last `_id` for frontend pagination
    };
}


};

export default UserRepository;
