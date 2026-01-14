import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const bidsApi = createApi({
  reducerPath: "bidsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/bids`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getBids: build.query<{ success: boolean; data?: Bid[] }, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetBidsQuery } = bidsApi;

export default bidsApi;
