import { useReducer } from "react";

import { createContext } from "react";

export const PostListContext = createContext({
  postList: [],

  addPost: () => {},

  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const DEFAULT_POST_LIST = [
    {
      id: 1,
      title: "Learning React",
      body: "Spent the whole evening learning React hooks and state management. Coding is getting more interesting every day!",
      reactions: { like: 21, dislike: 4 },
      userId: "user-5",
      tags: ["react", "coding", "learning"],
    },
    {
      id: 2,
      title: "Morning Workout",
      body: "Started my day with a refreshing workout session. Feeling energetic and motivated for the rest of the day!",
      reactions: { like: 90, dislike: 51 },
      userId: "user-3",
      tags: ["fitness", "workout", "health"],
    },
  ];

  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST,
  );

  const addPost = (userId, postTitle, postBody, like, dislike, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: { like, dislike },
        userId: userId,
        tags: tags,
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
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
