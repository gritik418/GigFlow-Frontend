import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const gigsApi = createApi({
  reducerPath: "gigsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/gigs`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getGigs: build.query<
      { success: boolean; data?: Gig[] },
      { search?: string }
    >({
      query: ({ search }) => ({
        url: `/?search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createGig: build.mutation<LoginResponse, CreateGigData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetGigsQuery, useCreateGigMutation } = gigsApi;

export default gigsApi;
