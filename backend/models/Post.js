const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    caption: {
      type: String,
      default: "",
      maxlength: [2200, "Caption cannot exceed 2200 characters"],
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    hashtags: {
      type: [String],
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    savesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
    hideLikesCount: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

postSchema.index({ userId: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ likesCount: -1 });
postSchema.index({ deleted: 1 });

// Extract hashtags from caption
postSchema.methods.extractHashtags = function () {
  const regex = /#[\w]+/g;
  const matches = this.caption.match(regex);
  this.hashtags = matches ? matches.map((tag) => tag.toLowerCase()) : [];
};

// Hide sensitive data
postSchema.methods.toJSON = function () {
  const post = this.toObject();
  delete post.deleted;
  delete post.deletedAt;
  delete post.__v;
  return post;
};

// Extract hashtags before saving
postSchema.pre("save", function (next) {
  if (this.isModified("caption")) {
    this.extractHashtags();
  }
  next();
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
