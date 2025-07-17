import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...updatedOrder }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: updatedOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
