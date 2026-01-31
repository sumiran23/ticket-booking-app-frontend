import { apiSlice } from "../features/api/apiSlice";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/reducer/authSlice";

const combinedReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};

export default rootReducer;
