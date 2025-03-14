

import { useState } from "react";
import { useGetPostsQuery } from "../../../data/api/postApi";
import { FaTrash, FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import icons

const PostsList = () => {
  const [page, setPage] = useState(1); // Current page state

  // Fetch posts with pagination (handled in backend)
  const { data, isLoading, isError } = useGetPostsQuery({ page, limit: 9 }); // Sending `page` and `limit: 9`
  console.log(data)
//   const [deletePost] = useDeletePostMutation();
  const [loadingPostId, setLoadingPostId] = useState(null);

//   const handleDelete = async (postId: string) => {
//     setLoadingPostId(postId);
//     try {
//       await deletePost(postId).unwrap();
//     } catch (err) {
//       console.error("Error deleting post", err);
//     } finally {
//       setLoadingPostId(null);
//     }
//   };

  if (isLoading) return <p className="text-center text-white">Loading posts...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading posts</p>;

  return (
    <div className="bg-white/10 text-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Recent Posts</h2>

      {data?.posts?.length === 0 ? (
        <p className="text-center text-gray-300">No posts available.</p>
      ) : (
        <div>
          {/* Post Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data.posts.map((post: any) => (
    <div
      key={post.id}
      className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between h-48 max-h-48"
    >
      <h3 className="text-lg font-bold text-white">{post.userId?.name}</h3>
      <p
  className="text-lg text-gray-300 whitespace-pre-wrap break-words overflow-auto max-h-24 custom-scrollbar"
>
  {post.text.length > 200 ? post.text.substring(0, 200) + "..." : post.text}
</p>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          <button className="text-green-400 hover:text-green-300 transition">
            <FaThumbsUp size={18} />
          </button>
          <button className="text-red-400 hover:text-red-300 transition">
            <FaThumbsDown size={18} />
          </button>
        </div>
        <button
          className="text-red-500 hover:text-red-400 transition"
          // onClick={() => handleDelete(post.id)}
          disabled={loadingPostId === post.id}
        >
          {loadingPostId === post.id ? "..." : <FaTrash size={18} />}
        </button>
      </div>
    </div>
  ))}
</div>


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
              disabled={!data.hasMore} // Disable if no more posts
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
