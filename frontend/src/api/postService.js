import axios from "./axios";

const postService = {
  // Get all posts (feed)
  getAllPosts: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`/posts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch posts" };
    }
  },

  // Get single post by ID
  getPostById: async (postId) => {
    try {
      const response = await axios.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch post" };
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      const response = await axios.post("/posts", postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create post" };
    }
  },

  // Like/Unlike post
  toggleLike: async (postId) => {
    try {
      const response = await axios.post(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to toggle like" };
    }
  },

  // Add comment
  addComment: async (postId, commentText) => {
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        text: commentText,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add comment" };
    }
  },

  // Delete post
  deletePost: async (postId) => {
    try {
      const response = await axios.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete post" };
    }
  },
};

export default postService;
