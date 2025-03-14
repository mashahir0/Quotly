import { Request, Response } from "express";
import postServices from "../../usecases/postService";

interface AuthenticatedRequest extends Request {
    user?: { id: string; name: string; email: string; role: string }; 
  }

const postController = {
    async addPost(req:AuthenticatedRequest,res:Response){
    try {
        const userId = req.user?.id
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
}

export default postController