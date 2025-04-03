import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes:['Post','My-Post'],
  endpoints: (builder) => ({
    addPost: builder.mutation<{ message: string }, { text: string }>({
        query: (newPost) => ({
          url: "/post/add-post",
          method: "POST",
          body: newPost,
        }),
        invalidatesTags :['Post']
      }),
      getPosts: builder.query<any, { page: number; limit: number }>({
        query: ({ page, limit }) => `/post/get-post?page=${page}&limit=${limit}`,
        providesTags:['Post']
      }),
      toggleLikeDislike: builder.mutation<
      { postId: string; likes: number; dislikes: number }, // Expected Response
      { postId: string; action: "like" | "dislike" } // Expected Request Payload
    >({
      query: ({ postId, action }) => ({
        url: "/post/toggle-like-dislike",
        method: "PUT",
        body: { postId, action },
      }),
      
    }),
    getUserPosts: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `/post/my-posts?page=${page}&limit=${limit}`,
      providesTags: ["My-Post"],
    }),

    deletePost: builder.mutation<{ message: string }, { postId: string }>({
      query: ({ postId }) => ({
        url: `/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    togglePostPrivacy: builder.mutation<{ message: string }, { postId: string }>({
      query: ({ postId }) => ({
        url: `/post/toggle-privacy/${postId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Post"],
    }),
    getTopLikedProfiles: builder.query<any, void>({
      query: () => `/post/top-liked-profiles`,
     
    }),
    getSharedQuote: builder.query<any, string>({
      query: (shareId) => `/post/quotes/${shareId}`, 
    }),
    getSavedQuotes: builder.query<any, void>({
      query: () => `/post/saved-quotes`,
    }),
    saveQuote: builder.mutation<void, {  postId: string }>({
      query: (data) => ({
        url: "/post/saved-quotes/save",
        method: "POST",
        body: data,
      }),
    }),
    removeSavedQuote: builder.mutation<void, { postId: string }>({
      query: (data) => ({
        url: "/post/saved-quotes/remove",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useToggleLikeDislikeMutation,
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useGetUserPostsQuery,
  useTogglePostPrivacyMutation,
  useGetTopLikedProfilesQuery,
  useGetSharedQuoteQuery,
  useSaveQuoteMutation,
  useRemoveSavedQuoteMutation,
  useGetSavedQuotesQuery
} = postApi;
