import { getData, postFetch, putFetch, setToken } from "../api";
import {
  setErrors,
  setFetchStatus,
  setAuthStatus,
  setUser,
} from "../slices/user";
import { store } from "../store";
import {
  IUser,
  IUserAuthData,
  IUserRegData,
  UserEndPoints,
  IUserUpdateData,
} from "../types/user";

type TResponse = { user: IUser };
type THandler = typeof postFetch | typeof putFetch | typeof getData;

const handleResponse = async (
  handler: THandler,
  endPoint: UserEndPoints,
  data?: any
): Promise<void> => {
  try {
    store.dispatch(setFetchStatus(true));
    const response: TResponse = await handler(endPoint, data);
    store.dispatch(setUser(response.user));
    setToken(response.user.token);
    store.dispatch(setAuthStatus(true));
  } catch (error) {
    store.dispatch(setErrors(error.response.data.errors));
    console.log(error.response.data.errors);
  } finally {
    store.dispatch(setFetchStatus(false));
  }
};

export const registerUser = (data: IUserRegData): void => {
  handleResponse(postFetch, UserEndPoints.REGISTER, { user: data });
};

export const login = (data: IUserAuthData): void => {
  handleResponse(postFetch, UserEndPoints.LOGIN, { user: data });
};

export const logOut = (): void => {
  localStorage.clear();
  store.dispatch(setFetchStatus(false));
  store.dispatch(setAuthStatus(false));
};

export const updateUser = async (data: IUserUpdateData): Promise<void> => {
  handleResponse(putFetch, UserEndPoints.UPDATE, { user: data });
};

export const getCurrentUser = async (): Promise<void> => {
  handleResponse(getData, UserEndPoints.UPDATE);
};
