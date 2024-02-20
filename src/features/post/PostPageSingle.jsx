import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeComp from "./TimeComp";
import CommentsButton from "./CommentsButton";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PostPageSingle() {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeComp timestamp={post.date} />
      </p>
      <CommentsButton post={post} />
    </article>
  );
}

export default PostPageSingle;
