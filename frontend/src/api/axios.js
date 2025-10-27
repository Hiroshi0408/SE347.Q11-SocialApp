import axios from "axios";
import {
  fakeUsersDB,
  fakePostsDB,
  fakeSuggestedUsers,
  fakeStoriesDB,
  getUserById,
  getPostsByUserId,
  formatPostWithUser,
} from "./fakeData";

const BASE_URL = process.env.REACT_APP_API_URL || "/api";
const USE_FAKE_API = true; // ← SET TRUE ĐỂ FAKE, FALSE ĐỂ DÙNG API THẬT

// Fake delay
const fakeDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ==================== REQUEST INTERCEPTOR ====================
axiosInstance.interceptors.request.use(
  async (config) => {
    // Thêm token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ==================== FAKE API LOGIC ====================
    if (USE_FAKE_API) {
      console.log(
        "🎭 FAKE API Request:",
        config.method.toUpperCase(),
        config.url
      );

      // Fake delay
      await fakeDelay(800);

      // Mock response based on endpoint
      const fakeResponse = handleFakeRequest(config);

      if (fakeResponse) {
        // Cancel real request
        config.adapter = () => {
          return Promise.resolve({
            data: fakeResponse.data,
            status: fakeResponse.status,
            statusText: "OK",
            headers: {},
            config: config,
          });
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== FAKE REQUEST HANDLER ====================
function handleFakeRequest(config) {
  const { method, url, data } = config;
  const currentUserId = getCurrentUserId();

  // ============ AUTH ENDPOINTS ============

  // Login
  if (method === "post" && url.includes("/auth/login")) {
    const { username, password } = data;
    const user = fakeUsersDB.find(
      (u) =>
        (u.username === username || u.email === username) &&
        u.password === password
    );

    if (!user) {
      return { status: 401, data: { message: "Invalid credentials" } };
    }

    const token = "fake-jwt-token-" + Date.now();
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        bio: user.bio,
      })
    );

    return {
      status: 200,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          bio: user.bio,
        },
      },
    };
  }

  // Register
  if (method === "post" && url.includes("/auth/register")) {
    const existingUser = fakeUsersDB.find(
      (u) => u.username === data.username || u.email === data.email
    );

    if (existingUser) {
      return {
        status: 400,
        data: {
          message: "Username or email already exists",
          errors: { username: "This username is already taken" },
        },
      };
    }

    const newUser = {
      id: fakeUsersDB.length + 1,
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      avatar: `images/Little wife.jpg`,
      bio: "",
      followers: 0,
      following: 0,
      postsCount: 0,
    };

    fakeUsersDB.push(newUser);

    return {
      status: 200,
      data: {
        message: "Registration successful",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
          avatar: newUser.avatar,
        },
      },
    };
  }

  // ============ POST ENDPOINTS ============

  // Get all posts
  if (
    method === "get" &&
    url.includes("/posts") &&
    !url.match(/\/posts\/\d+/)
  ) {
    const posts = fakePostsDB.map(formatPostWithUser);
    return {
      status: 200,
      data: { posts },
    };
  }

  // Get single post
  if (method === "get" && url.match(/\/posts\/(\d+)$/)) {
    const postId = parseInt(url.match(/\/posts\/(\d+)$/)[1]);
    const post = fakePostsDB.find((p) => p.id === postId);

    if (!post) {
      return { status: 404, data: { message: "Post not found" } };
    }
    return {
      status: 200,
      data: formatPostWithUser(post),
    };
  }

  // Toggle like
  if (method === "post" && url.match(/\/posts\/(\d+)\/like$/)) {
    const postId = parseInt(url.match(/\/posts\/(\d+)\/like$/)[1]);
    const post = fakePostsDB.find((p) => p.id === postId);

    if (!post) {
      return { status: 404, data: { message: "Post not found" } };
    }

    const userIndex = post.likedBy.indexOf(currentUserId);
    if (userIndex > -1) {
      // Unlike
      post.likedBy.splice(userIndex, 1);
      post.likes--;
      post.isLiked = false;
    } else {
      // Like
      post.likedBy.push(currentUserId);
      post.likes++;
      post.isLiked = true;
    }

    return {
      status: 200,
      data: {
        success: true,
        likes: post.likes,
        isLiked: post.isLiked,
      },
    };
  }

  // Add comment
  if (method === "post" && url.match(/\/posts\/(\d+)\/comments$/)) {
    const postId = parseInt(url.match(/\/posts\/(\d+)\/comments$/)[1]);
    const post = fakePostsDB.find((p) => p.id === postId);

    if (!post) {
      return { status: 404, data: { message: "Post not found" } };
    }

    const newComment = {
      id: post.comments.length + 1,
      userId: currentUserId,
      text: data.text,
      likes: 0,
      timestamp: new Date().toISOString(),
    };

    post.comments.push(newComment);

    const user = getUserById(currentUserId);
    return {
      status: 200,
      data: {
        comment: {
          ...newComment,
          user: user,
        },
      },
    };
  }

  // Create post
  if (
    method === "post" &&
    url.includes("/posts") &&
    !url.includes("/like") &&
    !url.includes("/comments")
  ) {
    const newPost = {
      id: fakePostsDB.length + 1,
      userId: currentUserId,
      image: data.image || "https://picsum.photos/600/600?random=" + Date.now(),
      caption: data.caption || "",
      likes: 0,
      likedBy: [],
      comments: [],
      timestamp: new Date().toISOString(),
      isLiked: false,
      isSaved: false,
    };

    fakePostsDB.push(newPost);
    console.log("📝 Fake Create Post:", newPost.id);

    return {
      status: 200,
      data: formatPostWithUser(newPost),
    };
  }

  // Delete post
  if (method === "delete" && url.match(/\/posts\/(\d+)$/)) {
    const postId = parseInt(url.match(/\/posts\/(\d+)$/)[1]);
    const index = fakePostsDB.findIndex((p) => p.id === postId);

    if (index === -1) {
      return { status: 404, data: { message: "Post not found" } };
    }

    fakePostsDB.splice(index, 1);
    console.log("🗑️ Fake Delete Post:", postId);

    return {
      status: 200,
      data: { message: "Post deleted successfully" },
    };
  }

  // ============ USER ENDPOINTS ============

  // Get user profile
  if (method === "get" && url.match(/\/users\/([^/]+)$/)) {
    const username = url.match(/\/users\/([^/]+)$/)[1];
    const user = fakeUsersDB.find((u) => u.username === username);

    if (!user) {
      return { status: 404, data: { message: "User not found" } };
    }

    const userPosts = getPostsByUserId(user.id).map((post) => ({
      id: post.id,
      image: post.image,
      likes: post.likes,
      comments: post.comments.length,
    }));

    console.log("✅ Fake Get Profile:", username);
    return {
      status: 200,
      data: {
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
        bio: user.bio,
        website: user.website || "",
        stats: {
          posts: userPosts.length,
          followers: user.followers,
          following: user.following,
        },
        posts: userPosts,
      },
    };
  }

  // Get suggested users
  if (method === "get" && url.includes("/users/suggestions")) {
    console.log("✅ Fake Get Suggestions");
    return {
      status: 200,
      data: fakeSuggestedUsers,
    };
  }

  // Follow user
  if (method === "post" && url.match(/\/users\/(\d+)\/follow$/)) {
    const userId = parseInt(url.match(/\/users\/(\d+)\/follow$/)[1]);
    console.log("➕ Fake Follow User:", userId);

    return {
      status: 200,
      data: { success: true, isFollowing: true },
    };
  }

  // Unfollow user
  if (method === "delete" && url.match(/\/users\/(\d+)\/follow$/)) {
    const userId = parseInt(url.match(/\/users\/(\d+)\/follow$/)[1]);
    console.log("➖ Fake Unfollow User:", userId);

    return {
      status: 200,
      data: { success: true, isFollowing: false },
    };
  }

  // Search users
  if (method === "get" && url.includes("/users/search")) {
    const query = new URL(url, "http://localhost").searchParams.get("q") || "";
    const results = fakeUsersDB.filter(
      (u) =>
        u.username.toLowerCase().includes(query.toLowerCase()) ||
        u.fullName.toLowerCase().includes(query.toLowerCase())
    );

    console.log("🔍 Fake Search Users:", query, results.length, "results");
    return {
      status: 200,
      data: results,
    };
  }

  // Nếu không match endpoint nào
  console.warn("⚠️ Unhandled fake endpoint:", method, url);
  return null;
}

// Helper: Get current user ID
function getCurrentUserId() {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.id;
  }
  return 1; // Default
}

// ==================== RESPONSE INTERCEPTOR ====================
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
