const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/auth.middleware");

// All routes require authentication
router.use(authMiddleware);

// Post CRUD
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

// Interactions
router.post("/:id/like", postController.toggleLike);
router.post("/:id/comments", postController.addComment);
router.get("/:id/comments", postController.getComments);

module.exports = router;
