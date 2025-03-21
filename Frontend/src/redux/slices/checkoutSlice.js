/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk to create a checkout session

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkouts`,
        checkoutdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue({ message: err.response.data.message });
      }
      else if (err.request) {
        console.error("No response received:", err.request);
        return rejectWithValue({ message: "No response from server" });
      } else {
        console.error("Axios Error:", err.message);
        return rejectWithValue({ message: "Network Error: " + err.message });
      }
    }
  }
);

//async thunk to fetch all checkouts
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkouts: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default checkoutSlice.reducer;
