import { Request, Response } from "express";
import postServices from "../../usecases/postService";
import UserRepository from "../../infrastructure/repositories/userRepository";
import {io} from '../../server'

interface AuthenticatedRequest extends Request {
    user?: { id: string; name: string; email: string; role: string }; 
  }

const postController = {
    async addPost(req:AuthenticatedRequest,res:Response){
    try {
        const userId =   req.user?.id
        if(!userId) throw new Error('user is not authenticated ')
        const {text} = req.body
        const len = text.trim().length
        if(len > 200) return res.status(400).json({message:"string contain morethan 200 letters"})
        await postServices.createPost(userId,text)
        res.status(200).json({message :'post created successfully'})
    } catch (error :any) {
        res.status(400).json({error : error.message})
    }
    },
    async getPosts(req: Request, res: Response) {
        try {
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || 9;
    
          const { posts, total } = await postServices.getPost(page, limit);
    
          res.status(200).json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total,
          });
        } catch (error) {
          console.error("Error fetching posts:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      },

     async  toggleLikeDislike(req: AuthenticatedRequest, res: Response){
        try {
          const userId = req.user?.id; // Ensure user is authenticated
          const { postId, action } = req.body; // "like" or "dislike"

          if (!userId) return res.status(401).json({ message: "Unauthorized" });
      
          const updatedPost = await postServices.toggleLikeDislike(postId, userId, action);
          
          console.log("🔥 Emitting updateLikes event:", {
            postId,
            likes: updatedPost.likes,
            dislikes: updatedPost.dislikes,
          });

          // Emit like update event to all connected clients
          io.emit("updateLikes", { 
            postId, 
            likes: updatedPost.likes, 
            dislikes: updatedPost.dislikes 
          });

          const topProfiles = await postServices.getTopLikedProfiles(5);
          io.emit("updateScoreboard", topProfiles);
      
          res.status(200).json(updatedPost);
        } catch (error: any) {
          console.log(error)
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      },
      async getUserPosts(req: AuthenticatedRequest, res: Response) {
        try {
          const userId = req.user?.id;
          if (!userId) return res.status(401).json({ message: "Unauthorized" });
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || 5;
          const result = await postServices.getUserPosts(userId, page, limit);
          res.status(200).json(result);
        } catch (error :any) {
          res.status(500).json({ message: "Error fetching user posts", error: error.message });
        }
      },
    
      // ✅ Delete a post
      async deletePost(req: AuthenticatedRequest, res: Response) {
        try {
          const userId = req.user?.id;
          const { postId } = req.params;
          if (!userId) return res.status(401).json({ message: "Unauthorized" });
          const result = await postServices.deletePost(userId, postId);
          res.status(200).json(result);
        } catch (error : any) {
          res.status(400).json({ message: error.message });
        }
      },
    
      // ✅ Toggle post privacy
      async togglePostPrivacy(req: AuthenticatedRequest, res: Response) {
        try {
          const userId = req.user?.id;
          const { postId } = req.params;
          if (!userId) return res.status(401).json({ message: "Unauthorized" });
          const result = await postServices.togglePostPrivacy(userId, postId);
          res.status(200).json(result);
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
      },
      async getTopLikedProfiles(req: Request, res: Response) {
        try {
          const limit = parseInt(req.query.limit as string) || 5;
          const topProfiles = await postServices.getTopLikedProfiles(limit);
    
          // ✅ Emit live updates to clients
          io.emit("updateScoreboard", topProfiles);
    
          res.status(200).json(topProfiles);
        } catch (error: any) {
          res.status(500).json({ message: "Error fetching top profiles", error: error.message });
        }
      },
}

export default postController