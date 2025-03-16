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

export default router;
