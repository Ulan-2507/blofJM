import { IAuthor } from "./article";

export interface IAuthError {
  email?: string[];
  username?: string[];
  password?: string[];
  message?: string;
}
export interface IUserAuthData {
  email: string;
  password: string;
}
export interface IUserRegData extends IUserAuthData {
  username: string;
}
export interface IUserUpdateData extends IUserRegData {
  bio?: string;
  image?: string;
}
export interface IUserFormData {
  user: IUserRegData | IUserAuthData | IUserUpdateData;
}

export interface IUser {
  id?: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  username: string;
  bio: null | string;
  image: null | string;
  token: string;
}
export interface IProfile {
  profile: IAuthor;
}
export type TUserState = {
  user: IUser | null;
  isAuth: boolean;
  isFetch: boolean;
  errors: null | IAuthError;
  errorCode: null | number;
  userSuccess: boolean;
};

export enum UserEndPoints {
  LOGIN = "/users/login",
  REGISTER = "/users",
  UPDATE = "/user",
}
