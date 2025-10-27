// Mock data cho Stories
export const storiesData = [
  {
    id: 1,
    username: "your_story",
    avatar: "images/Little wife.jpg",
    isOwn: true, // Story của chính mình
    seen: false,
  },
  {
    id: 2,
    username: "john_doe",
    avatar: "https://i.pravatar.cc/150?img=2",
    isOwn: false,
    seen: false,
  },
  {
    id: 3,
    username: "jane_smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOwn: false,
    seen: true,
  },
  {
    id: 4,
    username: "mike_wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOwn: false,
    seen: false,
  },
  {
    id: 5,
    username: "sarah_jones",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOwn: false,
    seen: false,
  },
  {
    id: 6,
    username: "david_brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    isOwn: false,
    seen: true,
  },
  {
    id: 7,
    username: "emma_davis",
    avatar: "https://i.pravatar.cc/150?img=7",
    isOwn: false,
    seen: false,
  },
  {
    id: 8,
    username: "chris_martin",
    avatar: "https://i.pravatar.cc/150?img=8",
    isOwn: false,
    seen: false,
  },
];

// Mock data cho Posts
// Update postsData - thêm comments array
export const postsData = [
  {
    id: 1,
    user: {
      username: "john_doe",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    image: "images/Collection/Jia-001.png",
    caption: "Chess time!!",
    likes: 1234,
    comments: 89,
    timestamp: "2 hours ago",
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: {
          username: "jane_smith",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        text: "Wow, this is amazing! 😍",
        likes: 23,
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        user: {
          username: "mike_wilson",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        text: "Where is this place?",
        likes: 5,
        timestamp: "45 minutes ago",
      },
    ],
  },
  {
    id: 2,
    user: {
      username: "jane_smith",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    image: "https://picsum.photos/600/600?random=2",
    caption: "Living my best life 💫 #happy #blessed",
    likes: 2341,
    comments: 156,
    timestamp: "5 hours ago",
    isLiked: true,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: {
          username: "john_doe",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        text: "You look so happy! 🥰",
        likes: 12,
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: 3,
    user: {
      username: "mike_wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    image: "https://picsum.photos/600/600?random=3",
    caption: "Good vibes only ✨",
    likes: 892,
    comments: 43,
    timestamp: "1 day ago",
    isLiked: false,
    isSaved: true,
    commentsList: [],
  },
];

export const suggestedUsers = [
  {
    id: 1,
    username: "alex_parker",
    avatar: "https://i.pravatar.cc/150?img=10",
    subtitle: "Followed by john_doe + 2 more",
    isFollowing: false,
  },
  {
    id: 2,
    username: "olivia_james",
    avatar: "https://i.pravatar.cc/150?img=11",
    subtitle: "Followed by jane_smith",
    isFollowing: false,
  },
  {
    id: 3,
    username: "noah_garcia",
    avatar: "https://i.pravatar.cc/150?img=13",
    subtitle: "Followed by mike_wilson + 3 more",
    isFollowing: false,
  },
  {
    id: 4,
    username: "sophia_lee",
    avatar: "https://i.pravatar.cc/150?img=14",
    subtitle: "New to SocialApp",
    isFollowing: false,
  },
  {
    id: 5,
    username: "liam_chen",
    avatar: "https://i.pravatar.cc/150?img=15",
    subtitle: "Followed by sarah_jones",
    isFollowing: false,
  },
];

// Mock data cho current user (người đang đăng nhập)
export const currentUser = {
  username: "your_username",
  fullName: "Your Name",
  avatar: "images/Little wife.jpg",
};

// Mock data cho User Profile
export const userProfile = {
  username: "jiashin",
  fullName: "Shin Jia",
  avatar: "images/Little wife.jpg",
  bio: "✨ Living my best life 🌟\n📍 Ho Chi Minh City\n💼 Web Developer",
  website: "https://yourwebsite.com",
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
  },
  posts: [
    {
      id: 1,
      image: "https://picsum.photos/400/400?random=10",
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      image: "https://picsum.photos/400/400?random=11",
      likes: 456,
      comments: 23,
    },
    {
      id: 3,
      image: "https://picsum.photos/400/400?random=12",
      likes: 789,
      comments: 34,
    },
    {
      id: 4,
      image: "https://picsum.photos/400/400?random=13",
      likes: 123,
      comments: 45,
    },
    {
      id: 5,
      image: "https://picsum.photos/400/400?random=14",
      likes: 567,
      comments: 56,
    },
    {
      id: 6,
      image: "https://picsum.photos/400/400?random=15",
      likes: 890,
      comments: 67,
    },
    {
      id: 7,
      image: "https://picsum.photos/400/400?random=16",
      likes: 234,
      comments: 78,
    },
    {
      id: 8,
      image: "https://picsum.photos/400/400?random=17",
      likes: 456,
      comments: 89,
    },
    {
      id: 9,
      image: "https://picsum.photos/400/400?random=18",
      likes: 678,
      comments: 90,
    },
  ],
};
