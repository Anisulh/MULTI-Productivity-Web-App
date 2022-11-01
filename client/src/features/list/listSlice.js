import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listService from "./listService";
import errorHandler from "../errorHandler";

const initialState = {
  lists: [],
  list: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllLists = createAsyncThunk(
  "list/getAllLists",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await listService.getAllLists(token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLists = createAsyncThunk(
  "list/getLists",
  async (workSpaceID, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      return await listService.getLists(workSpaceID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getList = createAsyncThunk(
  "list/getList",
  async (listData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID } = listData;
      return await listService.getList(workSpaceID, listID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createList = createAsyncThunk(
  "list/createList",
  async (listData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, formData } = listData;
      return await listService.createList(workSpaceID, formData, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateList = createAsyncThunk(
  "list/updateList",
  async (listData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID, listInfo } = listData;
      return await listService.updateList(workSpaceID, listID, listInfo, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      const { workSpaceID, listID } = listData;
      return await listService.deleteList(workSpaceID, listID, token);
    } catch (error) {
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.lists = null;
      })
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.lists = null;
      })
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.list = null;
      })
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateList.pending, (state,) => {
        state.isLoading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.map((list) => {
          const updatedListID = action.payload._id
          if (list._id === updatedListID) {
            list = action.payload
          }
          return list
        })
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.filter((list) => {
          const deletedListId = action.payload.id;
          return list._id !== deletedListId;
        });
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;
