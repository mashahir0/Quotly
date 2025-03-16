// import { IPost } from "../../domain/Post";
// import postModel from "../../domain/models/postModel";

// const postRepository =  {
//  async save(post : IPost){
//     return await new postModel(post).save()
//  },
//  async count(filter = {}) {
//    return await postModel.countDocuments(filter);
//  },

//  async findWithPagination(skip: number, limit: number) {
//    return await postModel
//      .find()
//      .sort({ createdAt: -1 }) // Newest posts first
//      .skip(skip)
//      .limit(limit)
//      .populate("userId", "name"); // Get only `name` from User model
//  },
//  async deletePostsByUser(userId: string) {
//   return await postModel.deleteMany({ userId: userId }); // Delete all posts of the user
// },
// async updateLikeDislike(postId: string, userId: string, action: "like" | "dislike") {
//   const post = await postModel.findById(postId);
//   if (!post) throw new Error("Post not found");

//   // ✅ Ensure likedBy and dislikedBy exist
//   if (!post.likedBy) post.likedBy = [];
//   if (!post.dislikedBy) post.dislikedBy = [];

//   const hasLiked = post.likedBy.includes(userId);
//   const hasDisliked = post.dislikedBy.includes(userId);

//   if (action === "like") {
//     if (hasLiked) {
//       post.likes -= 1;
//       post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
//     } else {
//       post.likes += 1;
//       post.likedBy.push(userId);
//       if (hasDisliked) {
//         post.dislikes -= 1;
//         post.dislikedBy = post.dislikedBy.filter((id) => id.toString() !== userId);
//       }
//     }
//   } else if (action === "dislike") {
//     if (hasDisliked) {
//       post.dislikes -= 1;
//       post.dislikedBy = post.dislikedBy.filter((id) => id.toString() !== userId);
//     } else {
//       post.dislikes += 1;
//       post.dislikedBy.push(userId);
//       if (hasLiked) {
//         post.likes -= 1;
//         post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
//       }
//     }
//   }

//   return await post.save();
// }
// }

// export default postRepository



import mongoose from "mongoose";
import postModel ,{IPost} from "../../domain/models/postModel";

const postRepository = {
  async save(postData: { userId: string; text: string }) {
    return await postModel.create({
      userId: new mongoose.Types.ObjectId(postData.userId),
      text: postData.text,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    });
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
      .populate("userId", "name photo"); // Get only `name` from User model
  },

  async deletePostsByUser(userId: string) {
    return await postModel.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });
  },

  async updateLikeDislike(postId: string, userId: string, action: "like" | "dislike") {
    const post = await postModel.findById(postId);
    if (!post) throw new Error("Post not found");

    const userObjectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId

    // Convert `ObjectId[]` to `string[]` before using `.includes()`
    const likedBy = post.likedBy.map((id : any) => id.toString());
    const dislikedBy = post.dislikedBy.map((id :any) => id.toString());

    const hasLiked = likedBy.includes(userId);
    const hasDisliked = dislikedBy.includes(userId);

    if (action === "like") {
      if (hasLiked) {
        post.likes -= 1;
        post.likedBy = post.likedBy.filter((id : any) => id.toString() !== userId);
      } else {
        post.likes += 1;
        post.likedBy.push(userObjectId);
        if (hasDisliked) {
          post.dislikes -= 1;
          post.dislikedBy = post.dislikedBy.filter((id : any) => id.toString() !== userId);
        }
      }
    } else if (action === "dislike") {
      if (hasDisliked) {
        post.dislikes -= 1;
        post.dislikedBy = post.dislikedBy.filter((id : any) => id.toString() !== userId);
      } else {
        post.dislikes += 1;
        post.dislikedBy.push(userObjectId);
        if (hasLiked) {
          post.likes -= 1;
          post.likedBy = post.likedBy.filter((id : any) => id.toString() !== userId);
        }
      }
    }

    return await post.save();
  }
};

export default postRepository;
