import { useReducer, useState, useEffect } from "react";

import { createContext } from "react";

export const PostListContext = createContext({
  postList: [],

  addPost: () => {},

  deletePost: () => {},

  fetching: false,
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

// else if (action.type === "ADD_INITIAL_POSTS") {
//   const existingIds = new Set(currentPostList.map((post) => post.id));

//   const newPosts = action.payload.posts.filter(
//     (post) => !existingIds.has(post.id)
//   );

//   newPostList = [...newPosts, ...currentPostList];
// }

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
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

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
      console.log("unmount");
    };
  }, []);
  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, fetching }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
