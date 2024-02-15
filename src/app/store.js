import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
