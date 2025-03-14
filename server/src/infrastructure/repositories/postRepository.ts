import { IPost } from "../../domain/Post";
import postModel from "../../domain/models/postModel";

const postRepository =  {
 async save(post : IPost){
    return await new postModel(post).save()
 },
 async count() {
   return await postModel.countDocuments();
 },

 async findWithPagination(skip: number, limit: number) {
   return await postModel
     .find()
     .sort({ createdAt: -1 }) // Newest posts first
     .skip(skip)
     .limit(limit)
     .populate("userId", "name"); // Get only `name` from User model
 }
}

export default postRepository