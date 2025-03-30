import express from "express";
import postController from "../controllers/postController";
import { authorizeRoles, verifyToken } from "../../infrastructure/middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/add-post",
  verifyToken(),
  authorizeRoles(["user","admin"]),
  postController.addPost
);
router.get('/get-post',verifyToken(),authorizeRoles(["user","admin"]),postController.getPosts)
router.put("/toggle-like-dislike",verifyToken(),postController.toggleLikeDislike);
router.get("/my-posts", verifyToken(), postController.getUserPosts);
router.delete("/:postId", verifyToken(), postController.deletePost);
router.put("/toggle-privacy/:postId", verifyToken(), postController.togglePostPrivacy);
router.get("/top-liked-profiles", postController.getTopLikedProfiles);
router.get('/quotes/:shareId',postController.getSharedQuote)

export default router;
