import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/menus",
      providesTags: ["Menu"],
    }),
    createMenu: builder.mutation({
      query: (formData) => ({
        url: "/menus",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),
    updateMenu: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/menus/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
