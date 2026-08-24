import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { BiSolidDislike } from "react-icons/bi";
import { PostListContext } from "../store/postListStore";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);

  return (
    <>
      <div className="card post-card" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
            <span className="visually-hidden">unread messages</span>
          </span>

          <p className="card-text">{post.body}</p>

          {post.tags.map((tag) => (
            <span className="badge text-bg-primary hashtag" key={tag}>
              {tag}
            </span>
          ))}

          <div className="reaction">
            <div className="like">
              <FcLike /> {post.reactions.like}
            </div>

            <div className="dislike">
              <BiSolidDislike />
              {post.reactions.dislike}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
