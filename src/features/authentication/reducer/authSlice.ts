import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  accessToken: string;
}

const initialState: AuthState = {
  email: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (
      state,
      action: PayloadAction<{
        email: string;
        accessToken: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("isUserLoggedIn", "true");
    },
    setLogoutData: (state) => {
      state.email = "";
      state.accessToken = "";
      localStorage.removeItem("isUserLoggedIn");
    },
  },
});

export const { setLoginData, setLogoutData } = authSlice.actions;
export default authSlice.reducer;
