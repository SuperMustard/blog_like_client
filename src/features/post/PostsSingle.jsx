import PostAuthor from "./PostAuthor";
import TimeComp from "./TimeComp";
import CommentsButton from "./CommentsButton";

function PostsSingle({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeComp timeST={post.date} />
      </p>
      <CommentsButton post={post} />
    </article>
  );
}

export default PostsSingle;
