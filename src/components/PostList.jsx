import { useContext, useEffect } from "react";
import Post from "./Post";
import { PostListContext } from "../store/postListStore";
import Messege from "./Message";
import { useLoaderData } from "react-router-dom";

const PostList = () => {
  const initialPosts = useLoaderData();

  const { postList, addInitialPosts } = useContext(PostListContext);

  useEffect(() => {
    addInitialPosts(initialPosts);
  }, [initialPosts]);

  return (
    <>
      {postList.length === 0 && <Messege />}

      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export const PostLoader = () => {
  return fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((data) => {
      return data.posts;
    });
};

export default PostList;
