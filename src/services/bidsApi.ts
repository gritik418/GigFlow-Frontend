import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const bidsApi = createApi({
  reducerPath: "bidsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/bids`,
    credentials: "include",
  }),
  tagTypes: ["Bids"],
  endpoints: (build) => ({
    getBids: build.query<{ success: boolean; data?: Bid[] }, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Bids"],
    }),
    placeBid: build.mutation<PlaceBidResponse, PlaceBidData>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    hireFreelancer: build.mutation<BaseResponse, string>({
      query: (id: string) => ({
        url: `/${id}/hire`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Bids"],
    }),
  }),
});

export const {
  useGetBidsQuery,
  usePlaceBidMutation,
  useHireFreelancerMutation,
} = bidsApi;

export default bidsApi;
