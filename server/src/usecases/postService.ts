import { IPost, Post } from "../domain/Post";
import postRepository from "../infrastructure/repositories/postRepository";
import UserRepository from "../infrastructure/repositories/userRepository";

const postServices = {
    async createPost(userId : string , text : string){
        if(!userId) throw new Error('user not found')
        const user =await  UserRepository.findById(userId)
        if(!user) throw new Error('user not found')
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