import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";
import type { RootState } from "../../app/store";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          if (action.payload.data) {
            state.user = action.payload.data;
          }
        }
      }
    );
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice;
