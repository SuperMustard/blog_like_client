import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  getCurrentPage,
  getPostsPerPage,
  setCurrentPage,
} from "./postsSlice";
import PostsSingle from "./PostsSingle";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const currentPage = useSelector(getCurrentPage);
  const postsPerPage = useSelector(getPostsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    const perPagePost = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);
    content = perPagePost.map((post) => (
      <PostsSingle key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      {content}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {pageNumbers.map((pageNum, index) => (
          <span
            key={index}
            className={currentPage === pageNum ? "currentPage" : "otherPage"}
            onClick={() => {
              dispatch(setCurrentPage({ currentPage: pageNum }));
            }}
          >
            {pageNum}
          </span>
        ))}
      </div>
    </section>
  );
};

export default PostsList;
