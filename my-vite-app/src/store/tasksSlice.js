import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Fetch all tasks for logged-in user
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get("/tasks", {
        headers: { Authorization: token },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load tasks");
    }
  }
);

// Create Task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.post("/tasks", taskData, {
        headers: { Authorization: token },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to create task");
    }
  }
);

// Update Task
export const updateTaskRemote = createAsyncThunk(
  "tasks/updateTaskRemote",
  async ({ id, changes }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      await api.put(`/tasks/${id}`, changes, {
        headers: { Authorization: token },
      });

      return { id, changes };
    } catch (err) {
      return rejectWithValue("Failed to update task");
    }
  }
);

// Delete Task
export const deleteTaskRemote = createAsyncThunk(
  "tasks/deleteTaskRemote",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: token },
      });

      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete task");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTasks: (state) => {
      state.items = [];
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTaskRemote.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        const index = state.items.findIndex((t) => t._id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...changes };
        }
      })
      .addCase(deleteTaskRemote.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export const { resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
