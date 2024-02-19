import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const postURL = "https://jsonplaceholder.typicode.com/posts";

// const initialState = [
//   {
//     id: "1",
//     title: "test1",
//     content: "test content",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     comments: {
//       like: 0,
//       dislike: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "test2",
//     content: "test content 2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     comments: {
//       like: 0,
//       dislike: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1,
  postsPerpage: 5,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(postURL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(postURL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      //automaticly create an action with the same name
      reducer(state, action) {
        state.posts.push(action.payload); //in createSlice will make sure the operation is immutable
      },
      prepare(title, content, userId) {
        //use this function to prepar the data simplfy the code in addPostForm, when we use postAdded
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            comments: {
              like: 0,
              dislike: 0,
            },
          },
        };
      },
    },
    commentsAdded(state, action) {
      const { postId, comments } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.comments[comments]++;
      }
    },
    setCurrentPage(state, action) {
      const { currentPage } = action.payload;
      state.currentPage = currentPage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.comments = {
            like: 0,
            dislike: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        //state.posts = state.posts.concat(loadedPosts);
        state.posts = [...loadedPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        // const sortedPosts = state.posts.sort((a, b) => {
        //   if (a.id > b.id) return 1;
        //   if (a.id < b.id) return -1;
        //   return 0;
        // });
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.comments = {
          like: 0,
          dislike: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCurrentPage = (state) => state.posts.currentPage;
export const getPostsPerPage = (state) => state.posts.postsPerpage;

export const { postAdded, commentsAdded, setCurrentPage } = postsSlice.actions; //export the action

export default postsSlice.reducer;
