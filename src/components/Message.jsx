import React from "react";

const Message = ({ onGetPostsClick }) => {
  return (
    <center className="message">
      <h3>There are no posts... </h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onGetPostsClick}
      >
        Get posts from server
      </button>
    </center>
  );
};

export default Message;
