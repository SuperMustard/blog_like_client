import PostAuthor from "./PostAuthor";
import TimeComp from "./TimeComp";
import CommentsButton from "./CommentsButton";

import { Link } from "react-router-dom";

function PostsSingle({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p className="singlePost">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeComp timeST={post.date} />
      </p>
      <CommentsButton post={post} />
    </article>
  );
}

export default PostsSingle;
