import { IPost, Post } from "../domain/Post";
import postRepository from "../infrastructure/repositories/postRepository";

const postServices = {
    async createPost(userId : string , text : string){
        const post = new Post(userId , text) 
        return await postRepository.save(post)
    },
    async getPost(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const total = await postRepository.count(); // Get total post count
    
        const posts = await postRepository.findWithPagination(skip, limit);
    
        return { posts, total };
      },
}


export default postServices