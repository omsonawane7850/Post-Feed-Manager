import React, { useContext, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { PostListContext } from "../store/postListStore";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const createdPost = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (createdPost) {
      addPost(createdPost);
      navigate("/");
    }
  }, [createdPost]);

  return (
    <Form method="POST" className="create-post">
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your user id here
        </label>

        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your user id"
          name="userId"
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
          name="title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>

        <textarea
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it.."
          name="body"
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
            name="likes"
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
            name="dislikes"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here..
        </label>

        <input
          type="text"
          className="form-control"
          id="tags"
          placeholder="please enter tags using space"
          name="tags"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </Form>
  );
};

export const CreatePostAction = async (data) => {
  const formData = await data.request.formData();

  const postData = Object.fromEntries(formData);

  postData.tags = postData.tags.split(" ");

  postData.reactions = {
    likes: Number(postData.likes),
    dislikes: Number(postData.dislikes),
  };

  delete postData.likes;
  delete postData.dislikes;

  const response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const post = await response.json();

  return post;
};

export default CreatePost;
