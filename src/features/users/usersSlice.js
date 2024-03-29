import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const usersURL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(usersURL);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; //override users
    });
  },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
