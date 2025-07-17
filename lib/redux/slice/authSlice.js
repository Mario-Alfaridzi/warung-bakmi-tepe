import { createSlice } from "@reduxjs/toolkit";
import { loginUser, loadUser, logoutUser } from "../api/authApi";

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
