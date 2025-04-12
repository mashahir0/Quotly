import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["LoadUser"],
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

    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags : ["LoadUser"]
    }),
    googleLogin: builder.mutation<any, { token: string }>({
      query: (googleData) => ({
        url: "/auth/google",
        method: "POST",
        body: googleData,
      }),
      invalidatesTags : ["LoadUser"]
    }),
    getDetails: builder.query<any, void>({
      query: () => "/get-details",
      providesTags :["LoadUser"]
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
  useUpdateProfileMutation  
} = userApi;
