import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterData>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyEmail: builder.mutation<
      EmailVerificationResponse,
      EmailVerificationData
    >({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resendOtp: builder.mutation<BaseResponse, { email: string }>({
      query: (data) => ({
        url: "/resend-otp",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
} = authApi;

export default authApi;
