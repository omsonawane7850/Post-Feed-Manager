import React, { useContext, useRef } from "react";
import { PostListContext } from "../store/postListStore";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const likes = Number(likesElement.current.value);
    const dislikes = Number(dislikesElement.current.value);
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: { likes, dislikes },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="useId" className="form-label">
          Enter your user id here
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your user id"
          ref={userIdElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today..?"
          ref={postTitleElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it.."
          ref={postBodyElement}
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="likes" className="form-label">
            Likes
          </label>
          <input
            type="number"
            className="form-control"
            id="likes"
            placeholder="Number of likes"
            min="0"
            ref={likesElement}
          />
        </div>

        <div className="col">
          <label htmlFor="dislikes" className="form-label">
            Dislikes
          </label>
          <input
            type="number"
            className="form-control"
            id="dislikes"
            placeholder="Number of dislikes"
            min="0"
            ref={dislikesElement}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here..
        </label>
        <input
          type="text"
          rows="4"
          className="form-control"
          id="tags"
          placeholder="please enter tags using space"
          ref={tagsElement}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
