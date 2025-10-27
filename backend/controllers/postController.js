const Post = require("../models/Post");
const User = require("../models/User");
const Like = require("../models/Like");
const Comment = require("../models/Comment");

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log(`📋 Get posts - Page: ${page}, Limit: ${limit}`);

    // Get posts with user info populated
    const posts = await Post.find({ deleted: false })
      .populate("userId", "username fullName avatar") // Populate user info
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Convert to plain JS object (faster)

    // Check which posts current user has liked
    const userId = req.user.id;
    const postIds = posts.map((p) => p._id);

    const likes = await Like.find({
      userId,
      postId: { $in: postIds },
    }).select("postId");

    const likedPostIds = new Set(likes.map((l) => l.postId.toString()));

    // Format posts with user info and isLiked status
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      user: {
        _id: post.userId._id,
        username: post.userId.username,
        fullName: post.userId.fullName,
        avatar: post.userId.avatar,
      },
      isLiked: likedPostIds.has(post._id.toString()),
      isSaved: false, // TODO: Implement saved posts
      timestamp: getTimeAgo(post.createdAt),
      commentsList: [], // Will be loaded separately when needed
    }));

    // Total count for pagination
    const total = await Post.countDocuments({ deleted: false });

    console.log(`✅ Retrieved ${postsWithMetadata.length} posts`);

    res.json({
      success: true,
      posts: postsWithMetadata,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + postsWithMetadata.length < total,
      },
    });
  } catch (error) {
    console.error("❌ Get posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get posts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [GET] /api/posts/:id - Get Single Post ====================
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    console.log(`📄 Get post by ID: ${postId}`);

    const post = await Post.findOne({
      _id: postId,
      deleted: false,
    }).populate("userId", "username fullName avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user liked this post
    const like = await Like.findOne({
      userId: req.user.id,
      postId: postId,
    });

    // Get comments
    const comments = await Comment.find({
      postId: postId,
      deleted: false,
      parentCommentId: null, // Only top-level comments
    })
      .populate("userId", "username fullName avatar")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      post: {
        ...post.toJSON(),
        user: post.userId,
        isLiked: !!like,
        timestamp: getTimeAgo(post.createdAt),
        commentsList: comments,
      },
    });
  } catch (error) {
    console.error("❌ Get post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [POST] /api/posts - Create Post ====================
exports.createPost = async (req, res) => {
  try {
    const { image, caption, location } = req.body;
    const userId = req.user.id;

    console.log(`📝 Create post - User: ${req.user.username}`);

    // Validation
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Create post
    const post = new Post({
      userId,
      image,
      caption: caption || "",
      location: location || "",
    });

    await post.save();

    // Increment user's posts count
    await User.findByIdAndUpdate(userId, {
      $inc: { postsCount: 1 },
    });

    // Populate user info
    await post.populate("userId", "username fullName avatar");

    console.log(`✅ Post created - ID: ${post._id}`);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: {
        ...post.toJSON(),
        user: post.userId,
        isLiked: false,
        timestamp: "Just now",
      },
    });
  } catch (error) {
    console.error("❌ Create post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [PUT] /api/posts/:id - Update Post ====================
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { caption, location } = req.body;
    const userId = req.user.id;

    console.log(`✏️ Update post - ID: ${postId}`);

    // Find post
    const post = await Post.findOne({
      _id: postId,
      deleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    // Update fields
    if (caption !== undefined) post.caption = caption;
    if (location !== undefined) post.location = location;

    await post.save();

    await post.populate("userId", "username fullName avatar");

    console.log(`✅ Post updated - ID: ${postId}`);

    res.json({
      success: true,
      message: "Post updated successfully",
      post: {
        ...post.toJSON(),
        user: post.userId,
      },
    });
  } catch (error) {
    console.error("❌ Update post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [DELETE] /api/posts/:id - Delete Post ====================
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    console.log(`🗑️ Delete post - ID: ${postId}`);

    // Find post
    const post = await Post.findOne({
      _id: postId,
      deleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    // Soft delete
    post.deleted = true;
    post.deletedAt = new Date();
    await post.save();

    // Decrement user's posts count
    await User.findByIdAndUpdate(userId, {
      $inc: { postsCount: -1 },
    });

    console.log(`✅ Post deleted - ID: ${postId}`);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [POST] /api/posts/:id/like - Toggle Like ====================
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    console.log(`❤️ Toggle like - Post: ${postId}, User: ${req.user.username}`);

    // Check if post exists
    const post = await Post.findOne({
      _id: postId,
      deleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if already liked
    const existingLike = await Like.findOne({
      userId,
      postId,
    });

    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, {
        $inc: { likesCount: -1 },
      });

      console.log(`💔 Post unliked - ID: ${postId}`);

      return res.json({
        success: true,
        message: "Post unliked",
        isLiked: false,
        likesCount: Math.max(0, post.likesCount - 1),
      });
    } else {
      // Like
      const like = new Like({
        userId,
        postId,
        targetType: "post",
        targetId: postId,
      });

      await like.save();
      await Post.findByIdAndUpdate(postId, {
        $inc: { likesCount: 1 },
      });

      console.log(`❤️ Post liked - ID: ${postId}`);

      // TODO: Create notification for post owner

      return res.json({
        success: true,
        message: "Post liked",
        isLiked: true,
        likesCount: post.likesCount + 1,
      });
    }
  } catch (error) {
    console.error("❌ Toggle like error:", error);

    // Handle duplicate key error (race condition)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to toggle like",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [POST] /api/posts/:id/comments - Add Comment ====================
exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user.id;

    console.log(`💬 Add comment - Post: ${postId}, User: ${req.user.username}`);

    // Validation
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    // Check if post exists
    const post = await Post.findOne({
      _id: postId,
      deleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if comments are allowed
    if (!post.allowComments) {
      return res.status(403).json({
        success: false,
        message: "Comments are disabled for this post",
      });
    }

    // Create comment
    const comment = new Comment({
      userId,
      postId,
      text: text.trim(),
    });

    await comment.save();

    // Increment post's comments count
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    // Populate user info
    await comment.populate("userId", "username fullName avatar");

    console.log(`✅ Comment added - ID: ${comment._id}`);

    // TODO: Create notification for post owner

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: {
        ...comment.toJSON(),
        user: comment.userId,
        timestamp: "Just now",
      },
    });
  } catch (error) {
    console.error("❌ Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== [GET] /api/posts/:id/comments - Get Comments ====================
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    console.log(`💬 Get comments - Post: ${postId}`);

    // Get comments
    const comments = await Comment.find({
      postId,
      deleted: false,
      parentCommentId: null, // Only top-level comments
    })
      .populate("userId", "username fullName avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Format comments
    const formattedComments = comments.map((comment) => ({
      ...comment,
      user: comment.userId,
      timestamp: getTimeAgo(comment.createdAt),
    }));

    const total = await Comment.countDocuments({
      postId,
      deleted: false,
      parentCommentId: null,
    });

    res.json({
      success: true,
      comments: formattedComments,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + formattedComments.length < total,
      },
    });
  } catch (error) {
    console.error("❌ Get comments error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== HELPER FUNCTIONS ====================
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1)
    return interval + " year" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1)
    return interval + " month" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return interval + " day" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

  return "Just now";
}
