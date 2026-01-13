import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const gigsApi = createApi({
  reducerPath: "gigsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/gigs`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getGigs: build.query<{ success: boolean; data?: Gig[] }, void>({
      query: () => ({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetGigsQuery } = gigsApi;

export default gigsApi;
