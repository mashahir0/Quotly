import { baseQueryWithReauth } from "../connectionApis/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    // sendMessage: builder.mutation({
    //     query: (body) => ({
    //       url: "/chat/send-message",
    //       method: "POST",
    //       body,
    //     }),
    //   }),
    //   getMessages: builder.query({
    //     query: ({ receiverId }) => `/chat/messages?userId=${localStorage.getItem("userId")}&otherUserId=${receiverId}`,
    //   }),
    //   getUsersChat: builder.query({
    //     query: () => `/chat/users`, // No parameters needed
    //   }),

    sendMessage: builder.mutation<void, { receiverId: string; message: string }>({
        query: ({ receiverId, message }) => ({
          url: "/chat/send",
          method: "POST",
          body: { receiverId, message }, // ✅ Fix key name
        }),
        invalidatesTags: ["Messages"],
      }),
      
      // ✅ Get Chat Messages for a User
      getMessages: builder.query<any[], string>({
        query: (receiverId) => `/chat/${receiverId}`,
        providesTags: ["Messages"],
      }),
  
      // ✅ Mark Messages as Seen
      markMessagesAsSeen: builder.mutation<void, string>({
        query: (receiverId) => ({
          url: `/chat/mark-seen/${receiverId}`,
          method: "PUT",
        }),
        invalidatesTags: ["Messages"],
      }),
      // getUsersChat: builder.query<any, void>({
      //   query: () => "/chat/user-list",
      // }),
      getUsersChat: builder.query<{
        users: { users: any[]; lastId: string | null };
      }, { search?: string; page?: number; limit?: number; lastId?: string | null }>({
        query: ({ search = "", page = 1, limit = 10, lastId = null }) => ({
          url: `/chat/user-list`,
          params: { search, page, limit, lastId },
        }),
        keepUnusedDataFor: 5,
      }),
      
      
      
  }),
});

export const {
//   useGetMessagesQuery,
//   useGetUsersChatQuery,
//   useSendMessageMutation
useGetMessagesQuery,
useMarkMessagesAsSeenMutation,
useSendMessageMutation,
// useGetUsersChatQuery
useLazyGetUsersChatQuery
} = chatApi;
