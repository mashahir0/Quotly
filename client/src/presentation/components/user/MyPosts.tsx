import { useState } from "react";
import { FaTrash, FaShare, FaEye, FaEyeSlash } from "react-icons/fa";
import { useGetUserPostsQuery, useDeletePostMutation, useTogglePostPrivacyMutation } from "../../../data/api/postApi";

const MyPosts = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetUserPostsQuery({ page, limit: 5 });
  const [deletePost] = useDeletePostMutation();
  const [togglePostPrivacy] = useTogglePostPrivacyMutation();

  if (isLoading) return <p className="text-center text-white">Loading your posts...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching your posts</p>;

  // ✅ Handle Delete
  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deletePost({ postId }).unwrap();
    refetch();
  };

  // ✅ Handle Toggle Privacy
  const handleTogglePrivacy = async (postId: string) => {
    await togglePostPrivacy({ postId }).unwrap();
    refetch();
  };

  // ✅ Handle Share Button
  const handleShare = async (postId: string) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      alert("🔗 Post link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="bg-white/10 text-white rounded-2xl shadow-lg p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Posts</h2>

      {data?.posts?.length === 0 ? (
        <p className="text-center text-gray-300">You haven't posted anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.posts.map((post: any) => (
            <div key={post._id} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between ">
              {/* Post Text */}
              <p className="text-lg text-gray-300 whitespace-pre-wrap break-words overflow-auto max-h-36 p-2 rounded-md custom-scrollbar">
                {post.text.length > 300 ? post.text.substring(0, 300) + "..." : post.text}
              </p>

              {/* Likes & Dislikes */}
              <div className="flex justify-between mt-3">
                <span className="text-green-400">👍 {post.likes}</span>
                <span className="text-red-400">👎 {post.dislikes}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-3">
                {/* Toggle Privacy */}
                <button
                  className={`transition ${post.isPublic ? "text-green-400" : "text-yellow-400"}`}
                  onClick={() => handleTogglePrivacy(post._id)}
                >
                  {post.isPublic ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>

                {/* Share Button */}
                <button onClick={() => handleShare(post._id)} className="text-blue-400 hover:text-blue-300 transition">
                  <FaShare size={18} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === data?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
