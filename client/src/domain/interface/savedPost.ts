export type PostType = {
    _id: string;
    userId: string; // or a full user object if needed
    text: string;
    likes: number;
    dislikes: number;
    // Add other fields as needed
  };
  