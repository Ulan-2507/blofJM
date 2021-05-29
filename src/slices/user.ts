import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthError, IUser, TUserState } from "../types/user";

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isFetch: false,
  errors: null,
  errorCode: null,
  userSuccess: false,
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
    setErrorCode(state, action: PayloadAction<number | null>) {
      state.errorCode = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUserSuccess(state, action: PayloadAction<boolean>) {
      state.userSuccess = action.payload;
    },
  },
});

export const {
  setFetchStatus,
  setAuthStatus,
  setErrors,
  setUser,
  setUserSuccess,
  setErrorCode,
} = userSlice.actions;

export default userSlice.reducer;
