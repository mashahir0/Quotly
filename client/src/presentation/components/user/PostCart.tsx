


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

  useEffect(() => {
    console.log("✅ Listening for updateLikes event...");

    // ✅ Reset likes/dislikes when post changes
    setLikes(post.likes);
    setDislikes(post.dislikes);

    const handleLikeUpdate = (data: any) => {
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

  // ✅ Handle Share Button (Copy post link)
  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      alert("🔗 Post link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col justify-between h-80 max-h-80">
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-2">
        {post.userId?.photo ? (
          <img src={post.userId?.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-gray-500" />
        ) : (
          <MdAccountCircle className="text-white w-12 h-12" />
        )}
        <h3 className="text-lg font-bold text-white">{post.userId?.name}</h3>
      </div>

      {/* Post Content (Larger View Area) */}
      <div className="max-h-36 overflow-y-auto p-3rounded-md text-gray-300 whitespace-pre-wrap break-words custom-scrollbar">
        {post.text.length > 300 ? post.text.substring(0, 300) + "..." : post.text}
      </div>

      {/* Action Buttons with More Spacing */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-6"> {/* ✅ Added more spacing between like & dislike */}
          <button
            className={`transition flex items-center gap-2 ${liked === "like" ? "text-green-500" : "text-gray-400"}`}
            onClick={() => handleLikeToggle("like")}
          >
            <FaThumbsUp size={18} /> {likes}
          </button>

          <button
            className={`transition flex items-center gap-2 ${liked === "dislike" ? "text-red-500" : "text-gray-400"}`}
            onClick={() => handleLikeToggle("dislike")}
          >
            <FaThumbsDown size={18} /> {dislikes}
          </button>
        </div>

        <button onClick={handleShare} className="text-blue-400 hover:text-blue-300 transition">
          <FaShare size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
