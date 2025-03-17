// import mongoose from "mongoose";
// import { IPost } from "../Post"; 


// const postSchema = new mongoose.Schema<IPost>({
//     userId : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     text : {type : String , required : true},
//     likes : {type :Number , default : 0},
//     dislikes : {type : Number ,default : 0},
//     likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default: [] }], 
//     dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default: [] }]
// },
// { timestamps: true } 
// )

// const  postModel = mongoose.model<IPost>('Post',postSchema)

// export default postModel



import mongoose, { Document, Schema } from "mongoose";

// Define Post Interface with TypeScript
export interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  likes: number;
  dislikes: number;
  likedBy: mongoose.Types.ObjectId[];
  dislikedBy: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  isPublic:boolean
}

// Define Post Schema
const postSchema = new Schema<IPost>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Fixed
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const postModel = mongoose.model<IPost>("Post", postSchema);
export default postModel;
