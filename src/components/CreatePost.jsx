import React, { useContext, useRef } from "react";
import { PostListContext } from "../store/postListStore";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const likeElement = useRef();
  const dislikeElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const like = likeElement.current.value;
    const dislike = dislikeElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    addPost(userId, postTitle, postBody, like, dislike, tags);

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    likeElement.current.value = "";
    dislikeElement.current.value = "";
    tagsElement.current.value = "";
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
          <label htmlFor="like" className="form-label">
            Likes
          </label>
          <input
            type="number"
            className="form-control"
            id="like"
            placeholder="Number of likes"
            min="0"
            ref={likeElement}
          />
        </div>

        <div className="col">
          <label htmlFor="dislike" className="form-label">
            Dislikes
          </label>
          <input
            type="number"
            className="form-control"
            id="dislike"
            placeholder="Number of dislikes"
            min="0"
            ref={dislikeElement}
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
