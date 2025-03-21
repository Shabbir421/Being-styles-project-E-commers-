/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//helper functions to load cart from local storage

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");

    // Check for null or undefined values
    if (!cartData || cartData === "undefined") {
      return { products: [] }; // Return a default empty cart structure
    }

    return JSON.parse(cartData); // Safely parse JSON
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
    return { products: [] }; // Ensure a valid default structure
  }
};


//helper function to save cart to local storage

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to local storage", error);
  }
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: {
            userId,
            guestId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: "Failed to fetch cart" });
    }
  }
);

// add an item to the cart for user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: "Failed to add to cart" });
    }
  }
);

// update the quantity of an item in the cart

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: "Failed to update cart" });
    }
  }
);

// remove an item from the cart

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: {
            productId,
            size,
            color,
            guestId,
            userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: "Failed to remove from cart" });
    }
  }
);

// merge the cart

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {
          guestId,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: "Failed to merge carts" });
    }
  }
);

// cartSlice for cart related issues

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg || "failed to fetch cart";
      })
      //addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "failed to add to cart";
      })
      //updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "failed to update  to cart";
      })
      //removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "failed to remove cart";
      })
      //mergeCart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "failed to merge carts";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
