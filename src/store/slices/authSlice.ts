import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth";

const initialState: AuthState = { email: null, password: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCredentials: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearCredentials: (state) => {
      state.email = null;
      state.password = null;
    },
  },
});

export const { saveCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
