/** @format */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

axios.defaults.withCredentials = true;
let userFromStorage = null;
try {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo && storedUserInfo !== "undefined") {
    userFromStorage = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error("Error parsing userInfo from localStorage:", error);
  localStorage.removeItem("userInfo"); // Remove corrupted or invalid data
}

//     "email":"john@exetyf1.com",
//     "password":"12345617257"
// }
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      console.log("Login Response:", res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      localStorage.setItem("userToken", res.data.token);
      return res.data.user;
    } catch (err) {
      if (err.response) {
        console.error("Response Error:", err.response.data);
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
        return rejectWithValue({ message: "No response from server" });
      } else {
        console.error("Axios Error:", err.message);
        return rejectWithValue({ message: "Network Error: " + err.message });
      }
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      console.log("Register Response:", res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      localStorage.setItem("userToken", res.data.token);
      return res.data.user;
    } catch (err) {
      console.error("Registration Error:", err);

      if (err.response) {
        console.error(
          "Server responded with error:",
          err.response.status,
          err.response.data
        );
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        console.error("No response from server. Possible CORS issue.");
        return rejectWithValue({
          message: "No response from server. Please try again later.",
        });
      } else {
        console.error("Axios Error:", err.message);
        return rejectWithValue({ message: "Network Error: " + err.message });
      }
    }
  }
);

// Redux Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    genrateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Registration failed. Please try again.";
      });
  },
});

export const { logout, genrateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
