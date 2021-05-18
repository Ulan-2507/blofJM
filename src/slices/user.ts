import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthError, IUser, TUserState } from "../types/user";

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isFetch: false,
  errors: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFetchStatus(state, action: PayloadAction<boolean>) {
      state.isFetch = action.payload;
    },
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setErrors(state, action: PayloadAction<IAuthError | null>) {
      state.errors = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const {
  setFetchStatus,
  setAuthStatus,
  setErrors,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
