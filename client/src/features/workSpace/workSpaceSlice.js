import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workSpaceService from "./workSpaceService";
import errorHandler from "../errorHandler";

const initialState = {
  workSpaces: [],
  workSpace: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getWorkSpaces = createAsyncThunk(
  "workSpace/getWorkSpaces",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await workSpaceService.getWorkSpaces(token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWorkSpace = createAsyncThunk(
  "workSpace/getWorkSpace",
  async (workSpace, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await workSpaceService.getWorkSpace(workSpace, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createWorkSpace = createAsyncThunk(
  "workSpace/createWorkSpace",
  async (workSpace, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await workSpaceService.createWorkSpace(workSpace, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateWorkSpace = createAsyncThunk(
  "workSpace/updateWorkSpace",
  async (workSpaceData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      console.log(workSpaceData)
      const { workSpaceID, workSpaceInfo } = workSpaceData;
      return await workSpaceService.updateWorkSpace(
        workSpaceID,
        workSpaceInfo,
        token
      );
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteWorkSpace = createAsyncThunk(
  "workSpace/deleteWorkSpace",
  async (workSpaceID, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await workSpaceService.deleteWorkSpace(workSpaceID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkSpaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkSpaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = action.payload;
      })
      .addCase(getWorkSpaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = null;
      })
      .addCase(getWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpace = action.payload;
      })
      .addCase(getWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpace = null;
      })
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces.push(action.payload);
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = state.workSpaces.map((workSpace) => {
          const updatedWorkspaceID = action.payload.id
          if (workSpace._id ===  updatedWorkspaceID){
            workSpace = action.payload
          }
          return workSpace
        })
      })
      .addCase(updateWorkSpace.rejected, (state, action)=> {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = state.workSpaces.filter((workSpace) => {
          const deletedWorkSpaceID = action.payload.id;
          return workSpace._id !== deletedWorkSpaceID;
        });
      })
      .addCase(deleteWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;
