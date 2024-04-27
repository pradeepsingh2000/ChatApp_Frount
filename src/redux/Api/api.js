import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
    tagTypes: ["Chat", "Users", "Message"],
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/myChat",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
      }),
      providesTags: ["Users"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `user/sendRequest`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/user/notification`,
      }),
      keepUnusedDataFor: 0,
    }),
    acceptRequest: builder.mutation({
      query: (data) => ({
        url: `/user/acceptRequest`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/getMessages/${chatId}?page=${page}`,
      }),
      keepUnusedDataFor: 0,
    }),
    myGroup: builder.query({
      query: () => ({
        url: "/chat/myGroup",
      }),
      providesTags: ["Chat"],
    }),
    availableFriend: builder.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
        };
      },
      providesTags: ["Chat"],
    }),
    addGroup: builder.mutation({
      query: ({members,name}) => ({
        url: `/chat/addGroupChat`,
        method: "POST",
        body: {members,name},
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({chatId,name}) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        body: {name},
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroup: builder.mutation({
      query: ({chatId,userId}) => ({
        url: `/chat/removeMember/`,
        method: "PUT",
        body: {chatId,userId},
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMember: builder.mutation({
      query: ({chatId,members}) => ({
        url: `/chat/addMember/`,
        method: "PUT",
        body: {chatId,members},
      }),
      invalidatesTags: ["Chat"],
    }), 
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useMyGroupQuery,
  useAvailableFriendQuery,
  useAddGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation
} = api;
