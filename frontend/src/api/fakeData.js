// ==================== FAKE DATABASE ====================

// Users
export let fakeUsersDB = [
  {
    id: 1,
    username: "test",
    email: "test@example.com",
    password: "password123",
    fullName: "Shin Jia",
    avatar: "images/Little wife.jpg",
    bio: "✨ Test account\n📍 Ho Chi Minh City",
    followers: 234,
    following: 123,
    postsCount: 12,
  },
  {
    id: 2,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    fullName: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Living my best life 🌟",
    followers: 1234,
    following: 567,
    postsCount: 42,
  },
  {
    id: 3,
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    fullName: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Travel lover 🌍",
    followers: 2341,
    following: 890,
    postsCount: 67,
  },
];

// Posts
export let fakePostsDB = [
  {
    id: 1,
    userId: 2,
    content: {
      url: "images/Collection/EP-10.mp4",
      type: "video",
    },
    caption: "Ending 10 episodes of a series 🎬",
    likes: 1234,
    likedBy: [],
    comments: [
      {
        id: 1,
        userId: 3,
        text: "Wow, this is amazing! 😍",
        likes: 23,
        timestamp: "2024-01-15T11:00:00Z",
      },
      {
        id: 2,
        userId: 1,
        text: "Where is this place?",
        likes: 5,
        timestamp: "2024-01-15T11:30:00Z",
      },
    ],
    timestamp: "2024-01-15T10:30:00Z",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    userId: 3,
    content: {
      url: "images/Collection/EP-05.mp4",
      type: "video",
    },
    caption: "Auld Lang Syne",
    likes: 2341,
    likedBy: [1],
    comments: [
      {
        id: 1,
        userId: 2,
        text: "You look so happy! 🥰",
        likes: 12,
        timestamp: "2024-01-14T13:00:00Z",
      },
    ],
    timestamp: "2024-01-14T12:20:00Z",
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    userId: 2,
    content: {
      url: "images/Collection/Jia-002.jpg",
      type: "image",
    },
    caption: "Star gazing night",
    likes: 892,
    likedBy: [],
    comments: [],
    timestamp: "2024-01-13T09:15:00Z",
    isLiked: false,
    isSaved: true,
  },
  {
    id: 4,
    userId: 1,
    content: {
      url: "images/Collection/Jia-Video-001.mp4",
      type: "video",
    },
    caption: "Study focus ",
    likes: 456,
    likedBy: [2, 3],
    comments: [],
    timestamp: "2024-01-12T08:00:00Z",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 5,
    userId: 3,
    content: {
      url: "images/Collection/Jia-004.jpeg",
      type: "image",
    },
    caption: "Weekend mood 🎉",
    likes: 678,
    likedBy: [],
    comments: [],
    timestamp: "2024-01-11T16:45:00Z",
    isLiked: false,
    isSaved: false,
  },
];

// Suggested Users
export const fakeSuggestedUsers = [
  {
    id: 4,
    username: "alex_parker",
    avatar: "https://i.pravatar.cc/150?img=10",
    fullName: "Alex Parker",
    subtitle: "Followed by john_doe + 2 more",
    isFollowing: false,
  },
  {
    id: 5,
    username: "olivia_james",
    avatar: "https://i.pravatar.cc/150?img=11",
    fullName: "Olivia James",
    subtitle: "Followed by jane_smith",
    isFollowing: false,
  },
  {
    id: 6,
    username: "noah_garcia",
    avatar: "https://i.pravatar.cc/150?img=13",
    fullName: "Noah Garcia",
    subtitle: "Followed by test + 3 more",
    isFollowing: false,
  },
];

// Stories
export const fakeStoriesDB = [
  {
    id: 1,
    userId: 1,
    username: "your_story",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOwn: true,
    seen: false,
  },
  {
    id: 2,
    userId: 2,
    username: "john_doe",
    avatar: "https://i.pravatar.cc/150?img=2",
    isOwn: false,
    seen: false,
  },
  {
    id: 3,
    userId: 3,
    username: "jane_smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOwn: false,
    seen: true,
  },
];

// Helper functions
export const getUserById = (userId) => {
  return fakeUsersDB.find((u) => u.id === userId);
};

export const getPostsByUserId = (userId) => {
  return fakePostsDB.filter((p) => p.userId === userId);
};

export const formatPostWithUser = (post) => {
  const user = getUserById(post.userId);
  return {
    ...post,
    _id: post.id,
    user: {
      username: user?.username || "unknown",
      avatar: user?.avatar || "https://i.pravatar.cc/150?img=1",
    },
    commentsList: post.comments.map((c) => ({
      ...c,
      user: getUserById(c.userId),
    })),
    timestamp: getTimeAgo(post.timestamp),
  };
};

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};
