// import { useState } from "react";
// import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
// import { MdAccountCircle } from "react-icons/md";

// const PostCard = ({ post }: { post: any }) => {
//   // ✅ Each post maintains its own like/dislike state
//   const [liked, setLiked] = useState<"like" | "dislike" | null>(null);

//   // ✅ Toggle Like/Dislike
//   const handleLikeToggle = (type: "like" | "dislike") => {
//     setLiked((prev) => (prev === type ? null : type)); // Toggle state
//   };

//   // ✅ Share Post Function
//   const handleShare = () => {
//     const postUrl = `${window.location.origin}/post/${post.id}`;
//     navigator.clipboard.writeText(postUrl);
//     alert("Post link copied to clipboard!");
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between min-h-56 max-h-64 w-full">
//       {/* Profile Section */}
//       <div className="flex items-center gap-3">
//         {post.userId?.photo ? (
//           <img
//             src={post.userId?.photo}
//             alt="Profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//         ) : (
//           <MdAccountCircle className="text-white w-10 h-10" />
//         )}
//         <h3 className="text-lg font-bold text-white">{post.userId?.name}</h3>
//       </div>

//       {/* Post Content */}
//       <p className="text-lg text-gray-300 whitespace-pre-wrap break-words overflow-auto max-h-24 custom-scrollbar mt-3">
//         {post.text.length > 200 ? post.text.substring(0, 200) + "..." : post.text}
//       </p>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="flex gap-3">
//           {/* Like Button */}
//           <button
//             className={`transition ${liked === "like" ? "text-green-500" : "text-gray-400"}`}
//             onClick={() => handleLikeToggle("like")}
//           >
//             <FaThumbsUp size={18} />
//           </button>

//           {/* Dislike Button */}
//           <button
//             className={`transition ${liked === "dislike" ? "text-red-500" : "text-gray-400"}`}
//             onClick={() => handleLikeToggle("dislike")}
//           >
//             <FaThumbsDown size={18} />
//           </button>
//         </div>

//         {/* Share Button */}
//         <button className="text-blue-400 hover:text-blue-300 transition" onClick={handleShare}>
//           <FaShare size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useToggleLikeDislikeMutation } from "../../../data/api/postApi";
import socket from "../../../utils/socket"; // ✅ Import socket

const PostCard = ({ post }: { post: any }) => {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [liked, setLiked] = useState<"like" | "dislike" | null>(null);
  const [toggleLikeDislike] = useToggleLikeDislikeMutation();
  // ✅ Listen for real-time updates when other users like/dislike a post
  useEffect(() => {
    console.log("✅ Listening for updateLikes event...");
  
    // ✅ Reset likes/dislikes when post changes
    setLikes(post.likes);
    setDislikes(post.dislikes);
  
    const handleLikeUpdate = (data : any) => {
      if (data.postId === post._id) {
        console.log("🔥 Received updateLikes event:", data);
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    };
  
    socket.on("updateLikes", handleLikeUpdate);
  
    return () => {
      socket.off("updateLikes", handleLikeUpdate); // ✅ Clean up listener
    };
  }, [post._id]); 
  // ✅ Handle Like/Dislike Button Clicks
  const handleLikeToggle = async (action: "like" | "dislike") => {
    try {
      setLiked((prev) => (prev === action ? null : action));

      await toggleLikeDislike({ postId: post._id, action }).unwrap();
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        {post.userId?.photo ? (
          <img src={post.userId?.photo} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <MdAccountCircle className="text-white w-10 h-10" />
        )}
        <h3 className="text-lg font-bold text-white">{post.userId?.name}</h3>
      </div>

      {/* Post Content */}
      <p className="text-lg text-gray-300">{post.text}</p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`transition ${liked === "like" ? "text-green-500" : "text-gray-400"}`}
          onClick={() => handleLikeToggle("like")}
        >
          <FaThumbsUp size={18} /> {likes}
        </button>

        <button
          className={`transition ${liked === "dislike" ? "text-red-500" : "text-gray-400"}`}
          onClick={() => handleLikeToggle("dislike")}
        >
          <FaThumbsDown size={18} /> {dislikes}
        </button>

        <button className="text-blue-400 hover:text-blue-300 transition">
          <FaShare size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
