import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/authApi";
import userSlice from "../features/user/userSlice";
import userApi from "../services/userApi";
import gigsApi from "../services/gigsApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [gigsApi.reducerPath]: gigsApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(gigsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
