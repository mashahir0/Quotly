import mongoose from "mongoose";

export interface IPost {
    _id ?: string,
    userId : mongoose.Schema.Types.ObjectId | string ,
    text : string,
    likes ?: number,
    dislikes ?: number,
} 


export class Post {
    constructor(
        public userId : string,
        public text : string
    ){}
}