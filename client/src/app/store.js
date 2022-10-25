import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/list/listSlice";
import taskReducer from "../features/task/taskSlice";
import workSpaceReducer from "../features/workSpace/workSpaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workSpace: workSpaceReducer,
    list: listReducer,
    task: taskReducer,
  },
});
