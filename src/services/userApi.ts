import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export default userApi;
