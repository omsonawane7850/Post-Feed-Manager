import { useContext } from "react";
import Post from "./Post";
import { PostListContext } from "../store/postListStore";
import Messege from "./Message";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);
  const onGetPostsClick = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => addInitialPosts(data.posts));
  };

  return (
    <>
      {postList.length === 0 && <Messege onGetPostsClick={onGetPostsClick} />}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
