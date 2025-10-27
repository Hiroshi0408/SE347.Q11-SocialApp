import axios from "./axios";

const userService = {
  // Get user profile
  getUserProfile: async (username) => {
    try {
      const response = await axios.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch profile" };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put("/users/profile", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update profile" };
    }
  },

  // Follow user
  followUser: async (userId) => {
    try {
      const response = await axios.post(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to follow user" };
    }
  },

  // Unfollow user
  unfollowUser: async (userId) => {
    try {
      const response = await axios.delete(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to unfollow user" };
    }
  },

  // Get suggested users
  getSuggestedUsers: async () => {
    try {
      const response = await axios.get("/users/suggestions");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch suggestions" };
    }
  },

  // Search users
  searchUsers: async (query) => {
    try {
      const response = await axios.get(`/users/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to search users" };
    }
  },
};

export default userService;
