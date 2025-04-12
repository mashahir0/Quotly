import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    register: builder.mutation<
      any,
      { name: string; email: string; password: string }
    >({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    sendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/send-otp",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<
      any,
      {  email: string;  otp: string }
    >({
      query: (user) => ({
        url: "/verify-otp",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation<any, { token: string }>({
      query: (googleData) => ({
        url: "/auth/google",
        method: "POST",
        body: googleData,
      }),
    }),
    getDetails: builder.query<any, void>({
      query: () => "/get-details",
    }),
    updateProfile: builder.mutation<{ message: string }, FormData>({
      query: (formData) => ({
        url: "/update-profile",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useGetDetailsQuery,
  useUpdateProfileMutation  ,
  useSendOtpMutation,
  useVerifyOtpMutation
} = userApi;
