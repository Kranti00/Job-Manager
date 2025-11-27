import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

// ----------------------------------------
// SAFE LOCALSTORAGE PARSING
// ----------------------------------------
let savedUser = null;
let savedToken = null;

try {
  const u = localStorage.getItem("user");
  if (u && u !== "undefined" && u !== "null") savedUser = JSON.parse(u);

  const t = localStorage.getItem("token");
  if (t && t !== "undefined" && t !== "null") savedToken = t;
} catch {
  savedUser = null;
  savedToken = null;
}

const initialState = {
  user: savedUser,
  token: savedToken,
  loading: false,
  error: null,
};

// ----------------------------------------
// REGISTER USER
// ----------------------------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ----------------------------------------
// LOGIN USER
// ----------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// ----------------------------------------
// SLICE
// ----------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        // 🟢 ALWAYS convert error to a string
        const error = action.payload;
        state.error = typeof error === "string" ? error : error?.message;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);

        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        const error = action.payload;
        state.error = typeof error === "string" ? error : error?.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
