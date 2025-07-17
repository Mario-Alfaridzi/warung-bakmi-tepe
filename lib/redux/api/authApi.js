import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const loginUser = createAsyncThunk(
  "api/user/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await axios.post("/api/user/login", userData, config);

      return data.user;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "api/user/register",
  async (userData, thunkApi) => {
    try {
      const { data } = await axios.post("/api/user/register", userData, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Gagal mendaftar."
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  "/api/user/loadUser",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/user/loadUser", config);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/api/user/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.post("/api/user/logout", config);

      return data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
