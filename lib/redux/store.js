import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { menuApi } from "./api/menuApi";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [menuApi.reducerPath]: menuApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([menuApi.middleware, orderApi.middleware]),
});
