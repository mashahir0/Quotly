// import { motion } from "framer-motion";
// import { FaTimes, FaBookmark, FaCopy } from "react-icons/fa";
// import { MdAccountCircle } from "react-icons/md";
// import { useState } from "react";
// import toast from "react-hot-toast"; // ✅ Import react-hot-toast

// const PostModal = ({ post, onClose }: { post: any; onClose: () => void }) => {
//   const [saved, setSaved] = useState(false);

//   // ✅ Function to Copy Text
//   const handleCopyText = async () => {
//     try {
//       await navigator.clipboard.writeText(post.text);
//       toast.success("📋 Post text copied!");
//     } catch (error) {
//       toast.error("❌ Failed to copy text!");
//       console.error("Copy Error:", error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
//     >
//       <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full text-white relative">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
//           <FaTimes size={20} />
//         </button>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3 mb-3">
//           {post.userId?.photo ? (
//             <img src={post.userId?.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-gray-500" />
//           ) : (
//             <MdAccountCircle className="text-white w-12 h-12" />
//           )}
//           <h3 className="text-lg font-bold">{post.userId?.name}</h3>
//         </div>

//         {/* Post Content */}
//         <div className="max-h-96 overflow-y-auto p-3 text-gray-300 whitespace-pre-wrap break-words custom-scrollbar relative">
//           {post.text}
          
//         </div>

//         {/* Save & Close Buttons */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => setSaved(!saved)}
//             className={`flex items-center gap-2 px-3 py-2 rounded-md ${
//               saved ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
//             }`}
//           >
//             <FaBookmark size={18} /> {saved ? "Saved" : "Save Post"}
//           </button>
//           <button
//             onClick={handleCopyText}
//             className=" bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition"
//             title="Copy Post Text"
//           >
//             <FaCopy size={18} />
//           </button>

//           <button
//             onClick={onClose}
//             className="bg-red-600 px-3 py-2 rounded-md text-white hover:bg-red-700 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default PostModal;



import { motion } from "framer-motion";
import { FaTimes, FaBookmark, FaCopy } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveQuoteMutation, useSaveQuoteMutation } from "../../../data/api/postApi";
import { RootState } from "../../../domain/redux/store";
import { addQuote, removeSavedQuote ,} from "../../../domain/redux/slilce/savedQuotesSlice";

const PostModal = ({ post, onClose }: { post: any; onClose: () => void }) => {
  const dispatch = useDispatch();
  const savedQuotes = useSelector((state: RootState) => state.savedQuotes.savedQuotes);
  const [saveQuote] = useSaveQuoteMutation();
  const [removeQuote] = useRemoveQuoteMutation();

  const isSaved = savedQuotes.includes(post._id);

  const handleSavePost = async () => {
    if (isSaved) {
      dispatch(removeSavedQuote(post._id));
      await removeQuote({ postId: post._id });
      toast.success("Removed from saved posts!");
    } else {
      dispatch(addQuote(post._id));
      await saveQuote({ postId: post._id });
      toast.success("Saved successfully!");
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(post.text);
      toast.success("📋 Post text copied!");
    } catch (error) {
      toast.error("❌ Failed to copy text!");
      console.error("Copy Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full text-white relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
          <FaTimes size={20} />
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-3">
          {post.userId?.photo ? (
            <img src={post.userId?.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-gray-500" />
          ) : (
            <MdAccountCircle className="text-white w-12 h-12" />
          )}
          <h3 className="text-lg font-bold">{post.userId?.name}</h3>
        </div>

        {/* Post Content */}
        <div className="max-h-96 overflow-y-auto p-3 text-gray-300 whitespace-pre-wrap break-words custom-scrollbar relative">
          {post.text}
        </div>

        {/* Save & Close Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSavePost}
            className={`flex items-center gap-2 px-3 py-2 rounded-md ${
              isSaved ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            <FaBookmark size={18} /> {isSaved ? "Saved" : "Save Post"}
          </button>
          <button
            onClick={handleCopyText}
            className=" bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition"
            title="Copy Post Text"
          >
            <FaCopy size={18} />
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 px-3 py-2 rounded-md text-white hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostModal;
