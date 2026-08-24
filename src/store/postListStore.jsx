import { useReducer } from "react";

import { createContext } from "react";

export const PostListContext = createContext({
  postList: [],

  addPost: () => {},

  deletePost: () => {},

  addInitialPosts: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const DEFAULT_POST_LIST = [
    {
      id: 1,
      title: "Learning React",
      body: "Spent the whole evening learning React hooks and state management. Coding is getting more interesting every day!",
      reactions: { likes: 21, dislikes: 4 },
      userId: "user-5",
      tags: ["react", "coding", "learning"],
    },
    {
      id: 2,
      title: "Morning Workout",
      body: "Started my day with a refreshing workout session. Feeling energetic and motivated for the rest of the day!",
      reactions: { likes: 90, dislikes: 51 },
      userId: "user-3",
      tags: ["fitness", "workout", "health"],
    },
  ];

  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, likes, dislikes, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: { likes, dislikes },
        userId: userId,
        tags: tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",

      payload: { postId },
    });
  };

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
