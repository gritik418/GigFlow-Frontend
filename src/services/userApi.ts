import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export default userApi;
