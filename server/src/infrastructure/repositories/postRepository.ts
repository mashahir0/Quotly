import { IPost } from "../../domain/Post";
import postModel from "../../domain/models/postModel";

const postRepository =  {
 async save(post : IPost){
    return await new postModel(post).save()
 },
 async count(filter = {}) {
   return await postModel.countDocuments(filter);
 },

 async findWithPagination(skip: number, limit: number) {
   return await postModel
     .find()
     .sort({ createdAt: -1 }) // Newest posts first
     .skip(skip)
     .limit(limit)
     .populate("userId", "name"); // Get only `name` from User model
 },
 async deletePostsByUser(userId: string) {
  return await postModel.deleteMany({ userId: userId }); // Delete all posts of the user
},
}

export default postRepository