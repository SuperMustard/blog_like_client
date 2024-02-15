import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "test1", content: "test content" },
  { id: "2", title: "test2", content: "test 2" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        //automaticly create an action with the same name
        state.push(action.payload); //in createSlice will provide the operation is immutable
      },
      prepare(title, content) {
        //use this function to prepar the data simplfy the code in addPostForm, when we use postAdded
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions; //export the action

export default postsSlice.reducer;
