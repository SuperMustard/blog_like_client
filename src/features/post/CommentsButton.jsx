import { useDispatch } from "react-redux";
import { commentsAdded } from "./postsSlice";

const commentsEmoji = {
  like: "👍",
  dislike: "👎",
};

import React from "react";

function CommentsButton({ post }) {
  const dispatch = useDispatch();

  const commentsButtons = Object.entries(commentsEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="commentsButton"
        onClick={() =>
          dispatch(commentsAdded({ postId: post.id, comments: name }))
        }
      >
        {emoji} {post.comments[name]}
      </button>
    );
  });

  return <div>{commentsButtons}</div>;
}

export default CommentsButton;
