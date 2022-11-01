import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";
import errorHandler from "../errorHandler";

const initialState = {
  tasks: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await taskService.getAllTasks(token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWorkSpaceTasks = createAsyncThunk(
  "task/getWorkSpaceTasks",
  async (workSpaceID, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await taskService.getWorkSpaceTasks(workSpaceID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (taskData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID } = taskData;
      return await taskService.getTasks(workSpaceID, listID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID, taskInfo } = taskData;
      return await taskService.createTask(workSpaceID, listID, taskInfo, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { taskID, taskInfo } = taskData;
      const workSpace = taskInfo.workSpace
      const list = taskInfo.list
      return await taskService.updateTask(
        workSpace,
        list,
        taskID,
        taskInfo,
        token
      );
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID, taskID } = taskData;
      return await taskService.deleteTask(workSpaceID, listID, taskID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkSpaceTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkSpaceTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getWorkSpaceTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tasks = null;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tasks = null;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.map((task) => {
          const updatedTaskID = action.payload._id;
          if (task._id === updatedTaskID) {
            task = action.payload;
          }
          return task;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((task) => {
          const deletedTaskId = action.payload.id;
          return task._id !== deletedTaskId;
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
