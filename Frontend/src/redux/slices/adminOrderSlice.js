/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk all orders fetch (admin only)

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_DO_NOT_USE_ActionTypes, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: "Server Error" });
    }
  }
);

// async thunk update order delivery status

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: "Server Error" });
    }
  }
);
// async thunk delete order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue({ message: "Server Error" });
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        //calculate total sales
        const totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        //calculate total sales
        const updateOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updateOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updateOrder;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.totalOrders = state.orders.length; // Update total orders count
      });
  },
});

export default adminOrderSlice.reducer;
