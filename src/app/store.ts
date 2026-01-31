import { apiSlice } from "../features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
