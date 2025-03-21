import mongoose from "mongoose";
import { IPost } from "../domain/models/postModel";
import postRepository from "../infrastructure/repositories/postRepository";
import UserRepository from "../infrastructure/repositories/userRepository";

const postServices = {
    async  createPost(userId: string, text: string) {
        if (!userId) throw new Error("User not found");
      
        const user = await UserRepository.findById(userId);
        if (!user) throw new Error("User not found");
        if (user.userStatus === "Blocked") throw new Error("User is unable to send a post");
      
        return await postRepository.save({ userId, text });
      },
    async getPost(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const total = await postRepository.count(); // Get total post count
    
        const posts = await postRepository.findWithPagination(skip, limit);
    
        return { posts, total };
      },
      async toggleLikeDislike(postId: string, userId: string, action: "like" | "dislike") {
        return await postRepository.updateLikeDislike(postId, userId, action);
      },
      async getUserPosts(userId: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        return await postRepository.findUserPosts(userId, skip, limit);
      },
    
      // ✅ Delete a post
      async deletePost(userId: string, postId: string) {
        const deletedPost = await postRepository.deletePost(postId, userId);
        if (!deletedPost) throw new Error("Post not found or unauthorized");
        return { message: "Post deleted successfully" };
      },
    
      // ✅ Toggle privacy
      async togglePostPrivacy(userId: string, postId: string) {
        const updatedPost = await postRepository.togglePostPrivacy(postId, userId);
        return { message: `Post is now ${updatedPost.isPublic ? "Public" : "Private"}` };
      },
      async getTopLikedProfiles(limit: number) {
        return await postRepository.getTopLikedProfiles(limit);
      },
}


export default postServices