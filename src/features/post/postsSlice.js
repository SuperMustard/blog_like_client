import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "test1",
    content: "test content",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    comments: {
      like: 0,
      dislike: 0,
    },
  },
  {
    id: "2",
    title: "test2",
    content: "test 2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    comments: {
      like: 0,
      dislike: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      //automaticly create an action with the same name
      reducer(state, action) {
        state.push(action.payload); //in createSlice will make sure the operation is immutable
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.comments[comments]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, commentsAdded } = postsSlice.actions; //export the action

export default postsSlice.reducer;
