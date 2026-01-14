import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";
import type { RootState } from "../../app/store";
import authApi from "../../services/authApi";

interface UserState {
  user: UserInterface | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.data) {
            state.user = action.payload.data;
          }
        }
      })
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice;
